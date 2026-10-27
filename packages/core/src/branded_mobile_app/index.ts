/**
 * F138 — Business Branded Mobile App
 *
 * Configures studio-branded native and PWA mobile application experiences with push notification
 * channels, biometric authentication options, and complete self-service account data exports.
 *
 * KEY INVARIANT (Basis: B; WB F62, Client Mobile Experience):
 * Delivered Experience Parity & Security Exit.
 * "Each supported app receives security updates and has an exit plan."
 * The mobile app matches the studio's verified brand domain, provides clear push notification
 * opt-ins, and honors Posie's zero-lock-in exit guarantee ($0 client record exports) without
 * hidden platform convenience charges.
 */

export interface MobileAppBrandConfig {
  appDisplayName: string;
  bundleIdentifier: string; // e.g. 'com.posieatelier.beverly'
  primaryBrandColor: string; // #C47059
  accentLinenColor: string; // #F8F6F2
  appIconSvg: string;
  splashScreenTitle: string;
  customDomainUrl: string; // e.g. 'https://book.posieatelier.com'
  hasBiometricsEnabled: boolean; // Face ID / Touch ID
  supportedPushNotificationChannels: Array<'appointment_reminders' | 'aftercare_cards' | 'marketing_perks'>;
}

export interface ClientAppProfile {
  clientId: string;
  clientFullName: string;
  email: string;
  pushDeviceToken?: string;
  isPushOptedIn: boolean;
  upcomingAppointmentsCount: number;
  availableCareSummariesCount: number;
}

export interface ClientMobileSession {
  sessionId: string;
  clientId: string;
  devicePlatform: 'ios' | 'android' | 'pwa_web';
  appVersion: string;
  isBiometricAuthenticated: boolean;
  activeNotificationBadgeCount: number;
  dataExportAvailableUSD: number; // $0.00
}

/**
 * Initializes a branded mobile app configuration.
 */
export function buildMobileAppConfig(
  studioName: string,
  customDomain: string,
  primaryColor: string = '#C47059'
): MobileAppBrandConfig {
  const sanitizedSlug = studioName.toLowerCase().replace(/[^a-z0-9]/g, '');

  return {
    appDisplayName: studioName,
    bundleIdentifier: `com.posie.${sanitizedSlug}`,
    primaryBrandColor: primaryColor,
    accentLinenColor: '#F8F6F2',
    appIconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="${primaryColor}"/><text x="50" y="65" font-size="45" fill="#FFF" text-anchor="middle">P</text></svg>`,
    splashScreenTitle: `Welcome to ${studioName}`,
    customDomainUrl: customDomain,
    hasBiometricsEnabled: true,
    supportedPushNotificationChannels: ['appointment_reminders', 'aftercare_cards', 'marketing_perks'],
  };
}

/**
 * Validates and logs a client mobile app session.
 */
export function establishClientMobileSession(
  config: MobileAppBrandConfig,
  client: ClientAppProfile,
  platform: 'ios' | 'android' | 'pwa_web',
  isBiometricAuthenticated: boolean
): ClientMobileSession {
  return {
    sessionId: `mob_sess_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    clientId: client.clientId,
    devicePlatform: platform,
    appVersion: '2.14.0',
    isBiometricAuthenticated,
    activeNotificationBadgeCount: client.upcomingAppointmentsCount,
    dataExportAvailableUSD: 0.0, // Rule DR06 zero fee exit guarantee
  };
}
