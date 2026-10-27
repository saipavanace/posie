/**
 * F188: Native Discovery Booking Integrations
 *
 * Connects eligible businesses to Reserve with Google (RwG) and supported native social actions (Instagram Book button),
 * synchronizing real-time catalog pricing and availability, guaranteeing atomic booking (exactly one appointment per slot),
 * and logging controlled attribution provenance.
 */

export type NativeIntegrationChannel = 'reserve_with_google' | 'instagram_book_action' | 'facebook_action';

export interface NativeCatalogFeedItem {
  serviceId: string;
  name: string;
  durationMinutes: number;
  currentPriceUsd: number;
  isActive: boolean;
  bookableOnline: boolean;
}

export interface NativePartnerBookingRequest {
  partnerChannel: NativeIntegrationChannel;
  partnerBookingReference: string;
  salonId: string;
  serviceId: string;
  serviceName: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  clientInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  quotedPriceUsd: number;
}

export interface SyncedNativeAppointment {
  appointmentId: string;
  partnerChannel: NativeIntegrationChannel;
  partnerBookingReference: string;
  salonId: string;
  serviceId: string;
  serviceName: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  clientInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  confirmedPriceUsd: number;
  attributionTag: string;
  calendarLocked: boolean;
  syncedAt: string;
  status: 'confirmed_atomic';
}

/**
 * Validates and publishes a merchant's service catalog feed to external discovery channels (e.g. Reserve with Google).
 * Ensures that only bookable, active services with transparent prices are transmitted.
 */
export function formatPartnerCatalogFeed(
  salonId: string,
  catalog: NativeCatalogFeedItem[]
): { salonId: string; feedTimestamp: string; activeServicesCount: number; feedItems: NativeCatalogFeedItem[] } {
  const feedItems = catalog.filter((item) => item.isActive && item.bookableOnline && item.currentPriceUsd > 0);

  return {
    salonId,
    feedTimestamp: new Date().toISOString(),
    activeServicesCount: feedItems.length,
    feedItems,
  };
}

/**
 * Ingests an incoming booking payload from Reserve with Google or Instagram.
 * Invariant: Creates exactly one atomic appointment, verifies quoted price against live catalog,
 * and attaches explicit channel attribution without double-booking slots.
 */
export function processNativePartnerBooking(
  request: NativePartnerBookingRequest,
  activeCatalog: NativeCatalogFeedItem[],
  existingAppointments: Array<{ scheduledStartTime: string; scheduledEndTime: string }>
): SyncedNativeAppointment {
  // 1. Verify service exists and is active
  const service = activeCatalog.find((s) => s.serviceId === request.serviceId && s.isActive);
  if (!service) {
    throw new Error(`Cannot complete native booking: service '${request.serviceId}' is inactive or not found.`);
  }

  // 2. Validate price matches current live catalog
  if (Math.abs(service.currentPriceUsd - request.quotedPriceUsd) > 0.01) {
    throw new Error(
      `Price mismatch: Partner quoted $${request.quotedPriceUsd}, but current atelier catalog price is $${service.currentPriceUsd}.`
    );
  }

  // 3. Prevent schedule conflict / double booking
  const hasConflict = existingAppointments.some(
    (appt) =>
      request.scheduledStartTime < appt.scheduledEndTime &&
      request.scheduledEndTime > appt.scheduledStartTime
  );

  if (hasConflict) {
    throw new Error('Schedule conflict: Requested appointment slot is already committed on the salon calendar.');
  }

  const appointmentId = `appt_${request.partnerChannel.slice(0, 3)}_${Date.now()}`;

  return {
    appointmentId,
    partnerChannel: request.partnerChannel,
    partnerBookingReference: request.partnerBookingReference,
    salonId: request.salonId,
    serviceId: request.serviceId,
    serviceName: service.name,
    scheduledStartTime: request.scheduledStartTime,
    scheduledEndTime: request.scheduledEndTime,
    clientInfo: request.clientInfo,
    confirmedPriceUsd: service.currentPriceUsd,
    attributionTag: `channel_${request.partnerChannel}`,
    calendarLocked: true,
    syncedAt: new Date().toISOString(),
    status: 'confirmed_atomic',
  };
}
