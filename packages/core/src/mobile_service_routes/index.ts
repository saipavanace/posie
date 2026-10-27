/**
 * Posie Core - F144: Mobile Service Routes
 *
 * Coordinates travel time, geographic service zones, setup/teardown buffers, route itineraries,
 * transparent travel fees, and automated late-arrival/traffic notifications for on-location
 * beauty and wellness professionals (bridal parties, in-home aesthetic visits, corporate wellness).
 *
 * Compliance: Follows Posie Rule DR04 & DR06 (Routing provider transparency, client location privacy,
 * route estimates cannot override client commitments without approval; honest traffic alerts).
 */

export interface ServiceZoneConfig {
  baseLocationName: string;
  baseLatitude: number;
  baseLongitude: number;
  baseAddress: string;
  freeTravelRadiusMiles: number; // e.g. 10 miles
  perMileRateCents: number; // e.g. $1.50/mile = 150 cents
  fixedBaseTravelFeeCents: number; // e.g. $25.00 = 2500 cents
  maxServiceRadiusMiles: number; // e.g. 45 miles max radius
  defaultSetupBufferMinutes: number; // e.g. 15 mins
  defaultTeardownBufferMinutes: number; // e.g. 15 mins
}

export interface MobileStop {
  stopId: string;
  stopSequence: number;
  clientId: string;
  clientName: string;
  clientPhone: string;
  destinationAddress: string;
  distanceFromPriorStopMiles: number;
  estimatedTravelMinutes: number;
  serviceDurationMinutes: number;
  setupMinutes: number;
  teardownMinutes: number;
  scheduledArrivalWindowStart: string; // e.g. '09:00'
  scheduledArrivalWindowEnd: string; // e.g. '09:15'
  serviceFeeCents: number;
  travelFeeCents: number;
}

export interface LateArrivalNotification {
  alertId: string;
  stopId: string;
  clientName: string;
  clientPhone: string;
  delayMinutes: number;
  revisedEta: string;
  notificationMessage: string;
  dispatchedAt: string;
}

export interface MobileRouteItinerary {
  itineraryId: string;
  providerId: string;
  providerName: string;
  date: string;
  originBaseAddress: string;
  stops: MobileStop[];
  totalTravelMiles: number;
  totalTravelMinutes: number;
  totalServiceMinutes: number;
  totalSetupTeardownMinutes: number;
  totalEarningsCents: {
    serviceRevenueCents: number;
    travelFeeCents: number;
    combinedTotalCents: number;
  };
  lateArrivalAlerts: LateArrivalNotification[];
}

/**
 * Calculates itemized travel fee based on mileage and studio zone policies
 */
export function calculateMobileTravelFee(
  distanceMiles: number,
  zoneConfig: ServiceZoneConfig
): {
  travelFeeCents: number;
  billableMiles: number;
  isWithinServiceArea: boolean;
  explanation: string;
} {
  if (distanceMiles > zoneConfig.maxServiceRadiusMiles) {
    return {
      travelFeeCents: 0,
      billableMiles: 0,
      isWithinServiceArea: false,
      explanation: `Location is ${distanceMiles} miles away, exceeding studio maximum service radius of ${zoneConfig.maxServiceRadiusMiles} miles.`,
    };
  }

  if (distanceMiles <= zoneConfig.freeTravelRadiusMiles) {
    return {
      travelFeeCents: zoneConfig.fixedBaseTravelFeeCents,
      billableMiles: 0,
      isWithinServiceArea: true,
      explanation: `Within complimentary ${zoneConfig.freeTravelRadiusMiles}-mile radius. Standard dispatch flat fee applied.`,
    };
  }

  const billableMiles = distanceMiles - zoneConfig.freeTravelRadiusMiles;
  const mileageSurcharge = Math.round(billableMiles * zoneConfig.perMileRateCents);
  const totalTravelFee = zoneConfig.fixedBaseTravelFeeCents + mileageSurcharge;

  return {
    travelFeeCents: totalTravelFee,
    billableMiles,
    isWithinServiceArea: true,
    explanation: `Fixed fee ($${(zoneConfig.fixedBaseTravelFeeCents / 100).toFixed(2)}) + ${billableMiles.toFixed(1)} billable miles at $${(zoneConfig.perMileRateCents / 100).toFixed(2)}/mi.`,
  };
}

/**
 * Builds a coordinated multi-stop mobile route itinerary
 */
export function buildMobileRouteItinerary(
  providerId: string,
  providerName: string,
  date: string,
  zoneConfig: ServiceZoneConfig,
  candidateStops: Array<{
    stopId: string;
    clientId: string;
    clientName: string;
    clientPhone: string;
    destinationAddress: string;
    distanceFromPriorStopMiles: number;
    estimatedTravelMinutes: number;
    serviceDurationMinutes: number;
    scheduledArrivalWindowStart: string;
    scheduledArrivalWindowEnd: string;
    serviceFeeCents: number;
    customSetupMinutes?: number;
    customTeardownMinutes?: number;
  }>
): MobileRouteItinerary {
  let accumulatedMiles = 0;
  let accumulatedTravelMins = 0;
  let accumulatedServiceMins = 0;
  let accumulatedBufferMins = 0;
  let totalServiceCents = 0;
  let totalTravelCents = 0;

  const stops: MobileStop[] = candidateStops.map((candidate, idx) => {
    const travelFeeCalc = calculateMobileTravelFee(candidate.distanceFromPriorStopMiles, zoneConfig);
    const setupMins = candidate.customSetupMinutes ?? zoneConfig.defaultSetupBufferMinutes;
    const teardownMins = candidate.customTeardownMinutes ?? zoneConfig.defaultTeardownBufferMinutes;

    accumulatedMiles += candidate.distanceFromPriorStopMiles;
    accumulatedTravelMins += candidate.estimatedTravelMinutes;
    accumulatedServiceMins += candidate.serviceDurationMinutes;
    accumulatedBufferMins += (setupMins + teardownMins);
    totalServiceCents += candidate.serviceFeeCents;
    totalTravelCents += travelFeeCalc.travelFeeCents;

    return {
      stopId: candidate.stopId,
      stopSequence: idx + 1,
      clientId: candidate.clientId,
      clientName: candidate.clientName,
      clientPhone: candidate.clientPhone,
      destinationAddress: candidate.destinationAddress,
      distanceFromPriorStopMiles: candidate.distanceFromPriorStopMiles,
      estimatedTravelMinutes: candidate.estimatedTravelMinutes,
      serviceDurationMinutes: candidate.serviceDurationMinutes,
      setupMinutes: setupMins,
      teardownMinutes: teardownMins,
      scheduledArrivalWindowStart: candidate.scheduledArrivalWindowStart,
      scheduledArrivalWindowEnd: candidate.scheduledArrivalWindowEnd,
      serviceFeeCents: candidate.serviceFeeCents,
      travelFeeCents: travelFeeCalc.travelFeeCents,
    };
  });

  return {
    itineraryId: `itin-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    providerId,
    providerName,
    date,
    originBaseAddress: zoneConfig.baseAddress,
    stops,
    totalTravelMiles: accumulatedMiles,
    totalTravelMinutes: accumulatedTravelMins,
    totalServiceMinutes: accumulatedServiceMins,
    totalSetupTeardownMinutes: accumulatedBufferMins,
    totalEarningsCents: {
      serviceRevenueCents: totalServiceCents,
      travelFeeCents: totalTravelCents,
      combinedTotalCents: totalServiceCents + totalTravelCents,
    },
    lateArrivalAlerts: [],
  };
}

/**
 * Evaluates real-time traffic delays and produces proactive, respectful client notifications
 */
export function evaluateTrafficDelayAlert(
  itinerary: MobileRouteItinerary,
  stopIndex: number,
  trafficDelayMinutes: number
): {
  updatedItinerary: MobileRouteItinerary;
  alertGenerated: boolean;
  notification?: LateArrivalNotification;
} {
  if (stopIndex < 0 || stopIndex >= itinerary.stops.length) {
    throw new Error(`Stop index ${stopIndex} is out of bounds for itinerary ${itinerary.itineraryId}`);
  }

  const stop = itinerary.stops[stopIndex];

  // Minor variations under 5 minutes do not require SMS disruption
  if (trafficDelayMinutes <= 5) {
    return {
      updatedItinerary: itinerary,
      alertGenerated: false,
    };
  }

  // Calculate revised ETA
  const [h, m] = stop.scheduledArrivalWindowStart.split(':').map(Number);
  const totalMins = h * 60 + m + trafficDelayMinutes;
  const revisedH = Math.floor(totalMins / 60);
  const revisedM = totalMins % 60;
  const revisedEta = `${revisedH.toString().padStart(2, '0')}:${revisedM.toString().padStart(2, '0')}`;

  const message = `Hi ${stop.clientName}, your Posie beauty practitioner ${itinerary.providerName} is en route. Due to unexpected traffic delay (+${trafficDelayMinutes}m), your updated arrival window is now approximately ${revisedEta}. Thank you for your patience!`;

  const alert: LateArrivalNotification = {
    alertId: `alert-${Date.now()}`,
    stopId: stop.stopId,
    clientName: stop.clientName,
    clientPhone: stop.clientPhone,
    delayMinutes: trafficDelayMinutes,
    revisedEta,
    notificationMessage: message,
    dispatchedAt: new Date().toISOString(),
  };

  return {
    updatedItinerary: {
      ...itinerary,
      lateArrivalAlerts: [...itinerary.lateArrivalAlerts, alert],
    },
    alertGenerated: true,
    notification: alert,
  };
}
