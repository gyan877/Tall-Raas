export interface ParkingZone {
  id: string;
  name: string;
  totalSpots: number;
  availableSpots: number;
  status: 'flowing' | 'filling' | 'full';
  walkTimeMins: number;
  gate: string;
  lat: number;
  lng: number;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  perks: string[];
  available: boolean;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  city: 'ahmedabad' | 'vadodara' | 'surat' | 'rajkot' | 'mumbai';
  area: string;
  address: string;
  lat: number;
  lng: number;
  artistHeadliner: string;
  artistType: 'traditional' | 'united_way' | 'bollywood_fusion' | 'high_energy' | 'folk_contemporary';
  artistTypeLabel: string;
  vibeScore: number;
  sangathMatchPercent: number;
  crowdDensity: 'Relaxed' | 'Vibrant' | 'Packed';
  description: string;
  featuredTag: string;
  dressCode?: string;
  image: string;
  parkingZones: ParkingZone[];
  metroShuttle?: {
    routeName: string;
    frequencyMins: number;
    nextInMins: number;
    pickupPoint: string;
  };
  schedule: {
    nightNumber: number;
    date: string;
    startTime: string;
    endTime: string;
    aartiTime: string;
  };
  organizer: {
    name: string;
    phone: string;
    email: string;
    verified: boolean;
    announcements: string[];
  };
  ticketTiers: TicketTier[];
  isOrganizerCustom?: boolean;
}

export interface SangathProfile {
  id: string;
  name: string;
  age: number;
  cityOrigin: string;
  destinationNote: string;
  residentType: 'gujarat' | 'out-state' | 'nri';
  residentTypeLabel: string;
  residentTypeBadgeClass: string;
  dancingSkill: 'pro' | 'intermediate' | 'beginner';
  dancingSkillLabel: string;
  tonightVenueId: string;
  tonightVenueName: string;
  venueZoneNote?: string;
  spokenLanguages: string[];
  bio: string;
  passDetail: string;
  syncPercent: number;
  verified: boolean;
  avatarUrl: string;
  type: 'single' | 'circle' | 'guide';
  membersCount?: number;
  circleName?: string;
  activeMinutesAgo: number;
  tags: string[];
  matched?: boolean;
}

export interface BookedPass {
  id: string;
  bookingCode: string;
  venueId: string;
  venueName: string;
  venueArea: string;
  nightNumber: number;
  dateStr: string;
  tierName: string;
  ticketCount: number;
  unitPrice: number;
  totalPrice: number;
  buyerName: string;
  buyerPhone: string;
  attendeeNames: string[];
  bookedAt: string;
  gateEntry: string;
  parkingPassIncluded: boolean;
  status: 'valid' | 'checked-in' | 'cancelled';
}

export interface SafeMeetupHub {
  id: string;
  boothName: string;
  venueName: string;
  locationDetails: string;
  description: string;
  nextCircleInMins: number;
  hostName: string;
  waitingCount: number;
  accentColor: string;
}
