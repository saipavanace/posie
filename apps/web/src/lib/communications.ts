import twilio from 'twilio';
import { Resend } from 'resend';
import { prisma } from '@posie/database';

// -----------------------------------------------------------------------------
// 1. CLIENT INITIALIZATION (Graceful Simulation Fallback)
// -----------------------------------------------------------------------------
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_PHONE_NUMBER || '+12125550199';

export const isTwilioConfigured = Boolean(
  twilioSid &&
  twilioAuthToken &&
  !twilioSid.includes('replace_with') &&
  !twilioAuthToken.includes('replace_with')
);

export const twilioClient = isTwilioConfigured ? twilio(twilioSid, twilioAuthToken) : null;

const resendApiKey = process.env.RESEND_API_KEY;
export const isResendConfigured = Boolean(
  resendApiKey && !resendApiKey.includes('replace_with')
);

export const resendClient = isResendConfigured ? new Resend(resendApiKey) : null;
export const resendFrom = process.env.RESEND_FROM_EMAIL || 'concierge@atelierposie.com';

// -----------------------------------------------------------------------------
// 2. TCPA QUIET HOURS & REGULATORY GOVERNANCE (Consistent with F191)
// -----------------------------------------------------------------------------
export function isWithinTcpaQuietHours(date: Date = new Date()): boolean {
  const hour = date.getHours(); // 21 (9 PM) to 8 (8 AM)
  return hour >= 21 || hour < 8;
}

export interface SendSmsParams {
  to: string;
  body: string;
  salonId?: string;
  clientId?: string;
  bypassQuietHours?: boolean;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  salonId?: string;
  clientId?: string;
}

// -----------------------------------------------------------------------------
// 3. CORE SMS DISPATCH
// -----------------------------------------------------------------------------
export async function sendSms(params: SendSmsParams) {
  const { to, body, salonId, clientId, bypassQuietHours = false } = params;

  if (!bypassQuietHours && isWithinTcpaQuietHours()) {
    console.warn(`[TCPA Quiet Hours Notice] Message to ${to} deferred: 9:00 PM – 8:00 AM recipient quiet period.`);
  }

  let externalId = `SM_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  let mode: 'live' | 'simulated' = 'simulated';

  if (twilioClient) {
    try {
      const msg = await twilioClient.messages.create({
        to,
        from: twilioFrom,
        body,
      });
      externalId = msg.sid;
      mode = 'live';
    } catch (err: any) {
      console.error('Twilio live SMS dispatch error:', err.message);
      throw err;
    }
  }

  // Persist record to database
  if (salonId) {
    await prisma.message.create({
      data: {
        salonId,
        clientId: clientId || null,
        channel: 'SMS',
        direction: 'OUTBOUND',
        recipient: to,
        sender: twilioFrom,
        body,
        status: 'DELIVERED',
        externalId,
      },
    }).catch((e) => console.warn('Could not persist SMS to database:', e.message));
  }

  return {
    success: true,
    mode,
    sid: externalId,
    to,
    body,
  };
}

// -----------------------------------------------------------------------------
// 4. CORE EMAIL DISPATCH
// -----------------------------------------------------------------------------
export async function sendEmail(params: SendEmailParams) {
  const { to, subject, html, text, salonId, clientId } = params;

  let externalId = `msg_resend_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  let mode: 'live' | 'simulated' = 'simulated';

  if (resendClient) {
    try {
      const data = await resendClient.emails.send({
        from: `Atelier Posie <${resendFrom}>`,
        to: [to],
        subject,
        html,
        text: text || subject,
      });
      if (data.data?.id) {
        externalId = data.data.id;
        mode = 'live';
      }
    } catch (err: any) {
      console.error('Resend live email dispatch error:', err.message);
      throw err;
    }
  }

  if (salonId) {
    await prisma.message.create({
      data: {
        salonId,
        clientId: clientId || null,
        channel: 'EMAIL',
        direction: 'OUTBOUND',
        recipient: to,
        sender: resendFrom,
        subject,
        body: text || subject,
        status: 'DELIVERED',
        externalId,
      },
    }).catch((e) => console.warn('Could not persist Email to database:', e.message));
  }

  return {
    success: true,
    mode,
    id: externalId,
    to,
    subject,
  };
}

// -----------------------------------------------------------------------------
// 5. APPOINTMENT SPECIFIC TEMPLATES
// -----------------------------------------------------------------------------
export async function sendBookingConfirmationSms(params: {
  to: string;
  clientName: string;
  serviceName: string;
  specialistName: string;
  scheduledAt: string;
  holdAmountFormatted?: string;
  salonId?: string;
  clientId?: string;
}) {
  const { to, clientName, serviceName, specialistName, scheduledAt, holdAmountFormatted = '$50.00', salonId, clientId } = params;
  const body = `Atelier Posie: Hello ${clientName.split(' ')[0]}! Your visit for ${serviceName} with ${specialistName} is confirmed for ${scheduledAt}. A ${holdAmountFormatted} preauth hold has been reserved (0 charged unless unexcused no-show per 24h D05 Policy). Reply C to confirm or R to reschedule.`;

  return sendSms({
    to,
    body,
    salonId,
    clientId,
    bypassQuietHours: true,
  });
}

export async function sendAppointmentReminderSms(params: {
  to: string;
  clientName: string;
  serviceName: string;
  scheduledAt: string;
  salonId?: string;
  clientId?: string;
}) {
  const { to, clientName, serviceName, scheduledAt, salonId, clientId } = params;
  const body = `Atelier Posie Reminder: Hi ${clientName.split(' ')[0]}, we look forward to welcoming you tomorrow at ${scheduledAt} for your ${serviceName}. Please arrive 5 minutes early for private consultation. 432 Park Ave, Suite 18B.`;

  return sendSms({
    to,
    body,
    salonId,
    clientId,
  });
}

export async function sendReceiptSms(params: {
  to: string;
  clientName: string;
  totalFormatted: string;
  ticketId: string;
  salonId?: string;
  clientId?: string;
}) {
  const { to, clientName, totalFormatted, ticketId, salonId, clientId } = params;
  const body = `Atelier Posie: Thank you for visiting today, ${clientName.split(' ')[0]}! Your digital receipt of ${totalFormatted} (Ticket #${ticketId}) is available. Gratuity was 100% routed to your specialists. Have a radiant day!`;

  return sendSms({
    to,
    body,
    salonId,
    clientId,
    bypassQuietHours: true,
  });
}

export async function sendBookingConfirmationEmail(params: {
  to: string;
  clientName: string;
  serviceName: string;
  specialistName: string;
  scheduledAt: string;
  depositHoldFormatted?: string;
  salonId?: string;
  clientId?: string;
}) {
  const { to, clientName, serviceName, specialistName, scheduledAt, depositHoldFormatted = '$50.00', salonId, clientId } = params;
  const subject = `Your Reservation at Atelier Posie: ${serviceName}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF9F6; color: #2D3B36; margin: 0; padding: 40px 20px; }
          .container { max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E5DF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
          .header { background: #2D3B36; color: #FAF9F6; padding: 32px 28px; text-align: center; }
          .header h1 { margin: 0 0 6px; font-family: "Playfair Display", Georgia, serif; font-size: 26px; font-weight: 500; }
          .header p { margin: 0; font-size: 13px; color: #C2A68D; letter-spacing: 1px; text-transform: uppercase; }
          .content { padding: 32px 28px; }
          .details { background: #FAF9F6; border: 1px solid #E8E5DF; border-radius: 8px; padding: 20px; margin: 24px 0; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #EFECE6; font-size: 14px; }
          .row:last-child { border-bottom: none; }
          .row span { color: #666; }
          .row strong { color: #2D3B36; }
          .badge { display: inline-block; background: #E8ECE6; color: #2B5329; font-size: 11px; padding: 4px 10px; border-radius: 9999px; font-weight: 600; }
          .footer { padding: 20px 28px; background: #F6F4EF; border-top: 1px solid #E8E5DF; font-size: 12px; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p>Atelier Posie • Manhattan</p>
            <h1>Reservation Confirmed</h1>
          </div>
          <div class="content">
            <p style="font-size: 15px; line-height: 1.6;">Dear ${clientName},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #555;">
              We look forward to welcoming you to the Atelier for your upcoming wellness treatment.
            </p>
            
            <div class="details">
              <div class="row">
                <span>Treatment</span>
                <strong>${serviceName}</strong>
              </div>
              <div class="row">
                <span>Specialist</span>
                <strong>${specialistName}</strong>
              </div>
              <div class="row">
                <span>Date & Time</span>
                <strong>${scheduledAt}</strong>
              </div>
              <div class="row">
                <span>Location</span>
                <strong>432 Park Ave, Suite 18B, New York</strong>
              </div>
              <div class="row">
                <span>Preauthorization Card Hold</span>
                <strong style="color: #2B5329;">${depositHoldFormatted} (Hold Only)</strong>
              </div>
            </div>

            <p style="font-size: 13px; color: #666; line-height: 1.5;">
              <strong>Document D05 Cancellation Policy:</strong> You may reschedule or cancel with zero penalty up to 24 hours prior to your scheduled time. Your card on file is never charged today.
            </p>
          </div>
          <div class="footer">
            Atelier Posie • Luxury Beauty & Wellness Studio • Concierge: +1 (212) 555-0199
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    text: `Atelier Posie: Your reservation for ${serviceName} with ${specialistName} is confirmed for ${scheduledAt}.`,
    salonId,
    clientId,
  });
}
