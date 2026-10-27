/**
 * F109 — Unified Client Communication Inbox & Portability
 *
 * Combines authorized SMS, email, and web chat into a single shared workspace
 * with staff assignment, accurate delivery statuses, and client timeline context.
 *
 * Basis: B; WB F20
 * Key Invariants:
 * 1. Delivery Truth: A failed or unverified reply is never reported as delivered.
 * 2. Attributed Communication Firewall (Rules F025, F063, F101, DR04):
 *    Inbound text replies saved to the client timeline are permanently recorded as
 *    attributed communication, NEVER silently promoted to signed clinical chart findings.
 * 3. Privacy & Portability: Staff send messages through the studio's verified business number,
 *    protecting personal cell phone privacy with carrier number portability.
 */

export type Channel = 'sms' | 'email' | 'web_chat';
export type MessageDirection = 'inbound' | 'outbound';
export type DeliveryStatus = 'queued' | 'sent' | 'delivered' | 'opened' | 'failed';

export interface InboxMessage {
  id: string;
  threadId: string;
  direction: MessageDirection;
  channel: Channel;
  senderId: string;
  senderName: string;
  senderContact: string; // Phone number or email
  recipientContact: string;
  body: string;
  deliveryStatus: DeliveryStatus;
  failureReason?: string;
  timestamp: string;
  // Provenance & Clinical Firewall
  isSavedToTimeline: boolean;
  timelineClassification?: 'client_communication_reply' | 'administrative_inquiry' | 'general_note';
}

export interface InboxThread {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  activeViewers: string[]; // Collision detection: staff currently viewing thread
  unreadCount: number;
  lastMessageAt: string;
  messages: InboxMessage[];
  // Client Context Sidebar
  clientContext: {
    upcomingAppointment?: {
      date: string;
      service: string;
      provider: string;
    };
    lifetimeSpendUSD: number;
    completedVisitsCount: number;
    allergies: string[];
    hasMarketingConsent: boolean;
  };
}

/**
 * Creates or retrieves an existing conversation thread for a client.
 */
export function createInboxThread(data: {
  threadId?: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  clientContext?: Partial<InboxThread['clientContext']>;
}): InboxThread {
  const id = data.threadId || `TH-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  return {
    id,
    clientId: data.clientId,
    clientName: data.clientName,
    clientPhone: data.clientPhone,
    clientEmail: data.clientEmail,
    assignedStaffId: data.assignedStaffId,
    assignedStaffName: data.assignedStaffName,
    activeViewers: [],
    unreadCount: 0,
    lastMessageAt: new Date().toISOString(),
    messages: [],
    clientContext: {
      upcomingAppointment: data.clientContext?.upcomingAppointment,
      lifetimeSpendUSD: data.clientContext?.lifetimeSpendUSD ?? 0,
      completedVisitsCount: data.clientContext?.completedVisitsCount ?? 0,
      allergies: data.clientContext?.allergies || [],
      hasMarketingConsent: data.clientContext?.hasMarketingConsent ?? true,
    },
  };
}

/**
 * Dispatches an outbound message to a client through the studio's verified business number/domain.
 * Staff personal phone number is never exposed.
 */
export function sendOutboundMessage(
  thread: InboxThread,
  sender: { staffId: string; staffName: string; studioBusinessNumber: string },
  content: { body: string; channel: Channel }
): { thread: InboxThread; message: InboxMessage } {
  const messageId = `MSG-OUT-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const recipientContact = content.channel === 'sms' ? thread.clientPhone : thread.clientEmail;

  const newMessage: InboxMessage = {
    id: messageId,
    threadId: thread.id,
    direction: 'outbound',
    channel: content.channel,
    senderId: sender.staffId,
    senderName: sender.staffName,
    senderContact: sender.studioBusinessNumber, // Verified studio business line
    recipientContact,
    body: content.body,
    deliveryStatus: 'sent', // Initially sent; webhook updates to 'delivered'
    timestamp: now,
    isSavedToTimeline: false,
  };

  const updatedThread: InboxThread = {
    ...thread,
    lastMessageAt: now,
    messages: [...thread.messages, newMessage],
  };

  return { thread: updatedThread, message: newMessage };
}

/**
 * Ingests an incoming client reply (e.g. two-way SMS).
 */
export function receiveInboundMessage(
  thread: InboxThread,
  content: {
    body: string;
    channel: Channel;
    senderPhoneOrEmail: string;
  }
): { thread: InboxThread; message: InboxMessage } {
  const messageId = `MSG-IN-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const newMessage: InboxMessage = {
    id: messageId,
    threadId: thread.id,
    direction: 'inbound',
    channel: content.channel,
    senderId: thread.clientId,
    senderName: thread.clientName,
    senderContact: content.senderPhoneOrEmail,
    recipientContact: 'studio_business_line',
    body: content.body,
    deliveryStatus: 'delivered',
    timestamp: now,
    isSavedToTimeline: false,
  };

  const updatedThread: InboxThread = {
    ...thread,
    unreadCount: thread.unreadCount + 1,
    lastMessageAt: now,
    messages: [...thread.messages, newMessage],
  };

  return { thread: updatedThread, message: newMessage };
}

/**
 * Updates message delivery status from carrier webhook.
 * Invariant: Carrier delivery errors are explicitly flagged as 'failed' with failure reason.
 */
export function updateMessageDeliveryStatus(
  thread: InboxThread,
  messageId: string,
  status: DeliveryStatus,
  failureReason?: string
): InboxThread {
  const messages = thread.messages.map((m) => {
    if (m.id === messageId) {
      return {
        ...m,
        deliveryStatus: status,
        failureReason: status === 'failed' ? (failureReason || 'Carrier undelivered / network rejection') : undefined,
      };
    }
    return m;
  });

  return {
    ...thread,
    messages,
  };
}

/**
 * Saves an inbound client message to the permanent client profile timeline.
 * Strict Invariant (Rules F025, F063, F101, DR04):
 * This is saved strictly as 'client_communication_reply'. It CANNOT and DOES NOT
 * overwrite or inject itself as a signed clinical chart record without clinician sign-off.
 */
export function saveMessageToClientTimeline(
  thread: InboxThread,
  messageId: string
): { thread: InboxThread; timelineRecord: { recordId: string; clientName: string; classification: string; text: string; source: string; timestamp: string } } {
  let savedRecord: any = null;

  const messages = thread.messages.map((m) => {
    if (m.id === messageId) {
      savedRecord = {
        recordId: `REC-COMM-${Date.now()}`,
        clientName: thread.clientName,
        classification: 'client_communication_reply',
        text: m.body,
        source: `Channel: ${m.channel.toUpperCase()} (From: ${m.senderContact})`,
        timestamp: m.timestamp,
        legalNotice: 'Attributed client communication record. Does not constitute a signed clinical SOAP entry or medical diagnosis (Rule F101).',
      };
      return {
        ...m,
        isSavedToTimeline: true,
        timelineClassification: 'client_communication_reply' as const,
      };
    }
    return m;
  });

  if (!savedRecord) {
    throw new Error(`Message with ID ${messageId} not found in thread`);
  }

  return {
    thread: { ...thread, messages },
    timelineRecord: savedRecord,
  };
}
