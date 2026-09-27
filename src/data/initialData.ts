import { Venue, SangathProfile, SafeMeetupHub } from '../types/navratri';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'shankus-mahotsav',
    name: 'Shankus Dandiya Mahotsav',
    slug: 'shankus-dandiya-mahotsav',
    city: 'ahmedabad',
    area: 'SG Highway, Ahmedabad',
    address: 'Shankus Lawns, Off SG Highway, Near Vaishnodevi Circle, Ahmedabad, Gujarat 382421',
    lat: 23.1365,
    lng: 72.5312,
    artistHeadliner: 'Atul Purohit & Troupe',
    artistType: 'united_way',
    artistTypeLabel: 'Atul Purohit / United Way Style',
    vibeScore: 98,
    sangathMatchPercent: 98,
    crowdDensity: 'Packed',
    description: 'Gujarat\'s most celebrated open lawn arena with 5 concentric circular tracks, authentic classical Raas rhythms, illuminated mirror installations, and family-safe designated meetup zones.',
    featuredTag: 'Traditional Raas',
    dressCode: 'Authentic Chaniya Choli / Traditional Kedia mandatory in inner circle',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    parkingZones: [
      {
        id: 'p1',
        name: 'Zone A - East Lawn Valet',
        totalSpots: 300,
        availableSpots: 42,
        status: 'filling',
        walkTimeMins: 2,
        gate: 'Gate 1 VIP',
        lat: 23.1370,
        lng: 72.5319
      },
      {
        id: 'p2',
        name: 'Zone B - North Open Ground',
        totalSpots: 600,
        availableSpots: 140,
        status: 'flowing',
        walkTimeMins: 4,
        gate: 'Gate 3 General',
        lat: 23.1358,
        lng: 72.5305
      },
      {
        id: 'p3',
        name: 'Zone C - Overflow Multi-tier',
        totalSpots: 400,
        availableSpots: 0,
        status: 'full',
        walkTimeMins: 7,
        gate: 'Gate 4 Shuttle',
        lat: 23.1380,
        lng: 72.5330
      }
    ],
    metroShuttle: {
      routeName: 'Metro Shuttle #7 (Thaltej Metro ↔ Shankus)',
      frequencyMins: 15,
      nextInMins: 4,
      pickupPoint: 'Thaltej Cross Road Concourse Gate 2'
    },
    schedule: {
      nightNumber: 4,
      date: 'Tonight (Night 4)',
      startTime: '08:00 PM',
      endTime: '02:00 AM',
      aartiTime: '11:45 PM (Maha Aarti with 501 Diyas)'
    },
    organizer: {
      name: 'Marshal Jaydeep & Shankus Events',
      phone: '+91 98250 11428',
      email: 'organizer@shankusmahotsav.com',
      verified: true,
      announcements: [
        '⚡ Gate 3 entry queue moving fast. Zone B parking has 140 open slots.',
        '🪔 Daily communal icebreaker circle starts at 8:30 PM near Food Court 2.'
      ]
    },
    ticketTiers: [
      {
        id: 'tier-early',
        name: 'Early Bird Single Pass',
        price: 499,
        perks: ['General Ground Entry', 'Zone B Free Parking', 'Food Court Coupon ₹50'],
        available: true
      },
      {
        id: 'tier-vip',
        name: 'VIP Enclosure & Stage Front',
        price: 1299,
        perks: ['Fast Track Gate 1 Entry', 'Valet Reserved Parking', 'Exclusive Lounge & Unlimited Chaas'],
        available: true
      },
      {
        id: 'tier-season',
        name: 'Full 9-Night Season Pass',
        price: 3499,
        perks: ['Valid all 9 nights', 'Souvenir Wooden Dandiya Set', 'Dedicated Marshal Support'],
        available: true
      }
    ]
  },
  {
    id: 'mirchi-rock-dandiya',
    name: 'Mirchi Rock N Dhol',
    slug: 'mirchi-rock-dandiya',
    city: 'ahmedabad',
    area: 'Amanora Grounds, S.P. Ring Rd',
    address: 'Amanora Lawns, Sardar Patel Ring Road, Bodakdev Extension, Ahmedabad, Gujarat 380054',
    lat: 23.0485,
    lng: 72.4870,
    artistHeadliner: 'Bhoomi Trivedi & Live Band',
    artistType: 'bollywood_fusion',
    artistTypeLabel: 'Bollywood Fusion & High Energy',
    vibeScore: 94,
    sangathMatchPercent: 92,
    crowdDensity: 'Packed',
    description: 'The pulsing heartbeat of youth Garba in Ahmedabad! Massive acoustic line arrays, LED synchronized dandiya sticks, food trucks from Manek Chowk, and express 3-Taali tutorial sessions.',
    featuredTag: 'High Energy Fusion',
    dressCode: 'Festive Fusion / Kedia / Indo-Western Traditional',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    parkingZones: [
      {
        id: 'p1',
        name: 'P1 - East Express Lot',
        totalSpots: 350,
        availableSpots: 24,
        status: 'filling',
        walkTimeMins: 3,
        gate: 'Gate 2 Main',
        lat: 23.0490,
        lng: 72.4880
      },
      {
        id: 'p2',
        name: 'P2 - West Sports Ground',
        totalSpots: 500,
        availableSpots: 0,
        status: 'full',
        walkTimeMins: 6,
        gate: 'Gate 4 Fountain',
        lat: 23.0475,
        lng: 72.4855
      }
    ],
    metroShuttle: {
      routeName: 'SP Ring Road Shuttle Bus #3',
      frequencyMins: 20,
      nextInMins: 8,
      pickupPoint: 'Bopal Junction Roundabout'
    },
    schedule: {
      nightNumber: 4,
      date: 'Tonight (Night 4)',
      startTime: '08:30 PM',
      endTime: '02:30 AM',
      aartiTime: '12:00 AM Midnight Aarti'
    },
    organizer: {
      name: 'Radio Mirchi Ground Ops & Kinjal Parekh',
      phone: '+91 97277 88990',
      email: 'events@mirchidandiya.in',
      verified: true,
      announcements: [
        '🚨 Notice: West Parking Lot is FULL. Please navigate directly to East Express Lot via Service Lane 2.',
        '✨ Free prop sanitization and lockbox lockers active at Gate 4 Fountain.'
      ]
    },
    ticketTiers: [
      {
        id: 'tier-mirchi-standard',
        name: 'Night Passholder Pass',
        price: 699,
        perks: ['Fast Access Gate 2', 'LED Wristband Included', 'Safe Hub Access'],
        available: true
      },
      {
        id: 'tier-mirchi-fastpass',
        name: 'Express FastPass & Stage Access',
        price: 1499,
        perks: ['Zero-Wait Express Lane', 'Elevated Viewing Deck', '2 Complimentary Mocktails'],
        available: true
      }
    ]
  },
  {
    id: 'united-way-baroda',
    name: 'United Way of Baroda Arena',
    slug: 'united-way-baroda',
    city: 'vadodara',
    area: 'Vadodara Center Grounds',
    address: 'Navlakhi Ground, Rajmahal Road, Navapura, Vadodara, Gujarat 390001',
    lat: 22.2965,
    lng: 73.1950,
    artistHeadliner: 'Atul Purohit Legend Session',
    artistType: 'united_way',
    artistTypeLabel: 'World Record Concentric Circles',
    vibeScore: 99,
    sangathMatchPercent: 95,
    crowdDensity: 'Packed',
    description: 'The world\'s largest single-circle Garba congregation with over 60,000 synchronized dancers moving in mathematical perfection to traditional acoustic folk rhythms.',
    featuredTag: 'World Largest Circle',
    dressCode: 'Strict Traditional Attire Only (No casual wear allowed)',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    parkingZones: [
      {
        id: 'p1',
        name: 'Navlakhi North Compound',
        totalSpots: 1200,
        availableSpots: 85,
        status: 'filling',
        walkTimeMins: 5,
        gate: 'North Archway',
        lat: 22.2980,
        lng: 73.1960
      },
      {
        id: 'p2',
        name: 'Palace Road Reserved',
        totalSpots: 800,
        availableSpots: 210,
        status: 'flowing',
        walkTimeMins: 8,
        gate: 'South Royal Gate',
        lat: 22.2940,
        lng: 73.1930
      }
    ],
    schedule: {
      nightNumber: 4,
      date: 'Tonight (Night 4)',
      startTime: '07:45 PM',
      endTime: '01:30 AM',
      aartiTime: '11:30 PM Traditional Stuti'
    },
    organizer: {
      name: 'United Way Trust Vadodara',
      phone: '+91 265 233 4455',
      email: 'garba@unitedwaybaroda.org',
      verified: true,
      announcements: [
        '🛡️ Entry strictly requires barcode on RFID Smart Wristband.',
        '🤝 Verified pass swap queue active for single dancers.'
      ]
    },
    ticketTiers: [
      {
        id: 'uw-standard',
        name: 'Player Verified Band',
        price: 1450,
        perks: ['Main Sanded Circle Entry', 'Official Photo ID Pass', 'Full Medical & Water Stations'],
        available: true
      },
      {
        id: 'uw-visitor',
        name: 'Spectator Seated Gallery',
        price: 850,
        perks: ['Tiered Grandstand Seating', 'Panoramic Ground View', 'Snack Bar Access'],
        available: true
      }
    ]
  },
  {
    id: 'suvarna-navratri-rajpath',
    name: 'Suvarna Navratri Mahotsav',
    slug: 'suvarna-navratri-rajpath',
    city: 'ahmedabad',
    area: 'Rajpath Club, S.G. Highway',
    address: 'Rajpath Club Grounds, Bodakdev, SG Highway, Ahmedabad, Gujarat 380059',
    lat: 23.0360,
    lng: 72.5090,
    artistHeadliner: 'Sachin-Jigar Live Folk Troupe',
    artistType: 'folk_contemporary',
    artistTypeLabel: 'Sachin-Jigar / Folk Contemporary',
    vibeScore: 91,
    sangathMatchPercent: 89,
    crowdDensity: 'Vibrant',
    description: 'Premier club atmosphere combining royal heritage decor with contemporary Gujarati beats. Plush grass carpeting, covered food pavilion, and valet parking for members and visitors.',
    featuredTag: 'VIP & Family Friendly',
    dressCode: 'Pure Kedia / Chaniya Choli / Bandhani Dupattas',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    parkingZones: [
      {
        id: 'p1',
        name: 'Club Valet Pavilion',
        totalSpots: 450,
        availableSpots: 180,
        status: 'flowing',
        walkTimeMins: 1,
        gate: 'Club Main Portico',
        lat: 23.0365,
        lng: 72.5095
      }
    ],
    schedule: {
      nightNumber: 4,
      date: 'Tonight (Night 4)',
      startTime: '08:15 PM',
      endTime: '02:00 AM',
      aartiTime: '11:45 PM'
    },
    organizer: {
      name: 'Rajpath Entertainment Board',
      phone: '+91 79 2687 2345',
      email: 'suvarna@rajpathclub.com',
      verified: true,
      announcements: [
        '✨ Valet parking available on direct presentation of Taal & Raas booking code.'
      ]
    },
    ticketTiers: [
      {
        id: 'suvarna-couple',
        name: 'Couples / Friends Entry',
        price: 850,
        perks: ['Exclusive Lawn Access', 'Complimentary Farsan Snack Box', 'Valet Parking Included'],
        available: true
      },
      {
        id: 'suvarna-vip',
        name: 'VIP Enclosure Pass',
        price: 1800,
        perks: ['Air-cooled Lounge', 'Celebrity Guest Interaction', 'Reserved Seating'],
        available: true
      }
    ]
  },
  {
    id: 'karnavati-garba',
    name: 'Karnavati Club Raas Rang',
    slug: 'karnavati-garba',
    city: 'ahmedabad',
    area: 'SG Highway, Gandhinagar Link',
    address: 'Karnavati Club, Gandhinagar-Sarkhej Highway, Ahmedabad, Gujarat 380058',
    lat: 23.0230,
    lng: 72.5030,
    artistHeadliner: 'Kinjal Dave & Vibrant Dholis',
    artistType: 'high_energy',
    artistTypeLabel: 'Kinjal Dave High-Energy',
    vibeScore: 96,
    sangathMatchPercent: 93,
    crowdDensity: 'Packed',
    description: 'Electric energy, spinning circles that hit 160 BPM, and thunderous traditional dhol beats echoing under illuminated mega-arches along SG Highway.',
    featuredTag: 'High Energy Dodhiya',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    parkingZones: [
      {
        id: 'p1',
        name: 'Underground Cellar 1 & 2',
        totalSpots: 700,
        availableSpots: 90,
        status: 'filling',
        walkTimeMins: 3,
        gate: 'Gate B South',
        lat: 23.0225,
        lng: 72.5035
      }
    ],
    schedule: {
      nightNumber: 4,
      date: 'Tonight (Night 4)',
      startTime: '08:30 PM',
      endTime: '02:00 AM',
      aartiTime: '12:15 AM'
    },
    organizer: {
      name: 'Karnavati Cultural Desk',
      phone: '+91 79 2699 9000',
      email: 'events@karnavaticlub.com',
      verified: true,
      announcements: [
        '🎵 Kinjal Dave takes stage at 9:30 PM sharp. Arrive early for smooth parking.'
      ]
    },
    ticketTiers: [
      {
        id: 'karnavati-std',
        name: 'Single Dancer Pass',
        price: 650,
        perks: ['Open Lawn Access', 'Dandiya Sticks Provided', 'Water Station Access'],
        available: true
      }
    ]
  },
  {
    id: 'surat-dome-dandiya',
    name: 'Surat Diamond Dome Raas',
    slug: 'surat-dome-dandiya',
    city: 'surat',
    area: 'Dumas Road, Surat',
    address: 'Surat International Exhibition & Convention Centre, Sarsana, Surat, Gujarat 395007',
    lat: 21.1415,
    lng: 72.7660,
    artistHeadliner: 'Kirtidan Gadhvi & Dayro Troupe',
    artistType: 'traditional',
    artistTypeLabel: 'Traditional Gujarati Dhol & Dayro',
    vibeScore: 95,
    sangathMatchPercent: 91,
    crowdDensity: 'Vibrant',
    description: 'Surat\'s grandest indoor air-conditioned arena and open lawn combination, featuring pure Kathiawadi Raas and Kirtidan Gadhvi\'s soulful nocturnal Dayro hymns.',
    featuredTag: 'Kathiawadi Raas',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80',
    parkingZones: [
      {
        id: 'p1',
        name: 'SIECC Mega Parking Ground',
        totalSpots: 1500,
        availableSpots: 420,
        status: 'flowing',
        walkTimeMins: 4,
        gate: 'Hall 3 Gate',
        lat: 21.1420,
        lng: 72.7670
      }
    ],
    schedule: {
      nightNumber: 4,
      date: 'Tonight (Night 4)',
      startTime: '08:00 PM',
      endTime: '02:00 AM',
      aartiTime: '11:30 PM'
    },
    organizer: {
      name: 'Surat Cultural Arts Forum',
      phone: '+91 261 289 1234',
      email: 'info@suratraas.org',
      verified: true,
      announcements: [
        '✨ Plenty of open parking spots in SIECC Mega Ground. Seamless entry.'
      ]
    },
    ticketTiers: [
      {
        id: 'surat-tier-1',
        name: 'Regular Night Pass',
        price: 550,
        perks: ['Dome + Outdoor Access', 'Food Court Entry', 'Free Parking'],
        available: true
      }
    ]
  }
];

export const INITIAL_SANGATH_PROFILES: SangathProfile[] = [
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    age: 26,
    cityOrigin: 'Mumbai',
    destinationNote: 'Visiting SG Highway',
    residentType: 'out-state',
    residentTypeLabel: 'Non-Resident / First-Time Garba',
    residentTypeBadgeClass: 'bg-[#0f131c]/90 text-white border border-[#334155]',
    dancingSkill: 'beginner',
    dancingSkillLabel: 'Fast Learner',
    tonightVenueId: 'shankus-mahotsav',
    tonightVenueName: 'Shankus Mahotsav',
    spokenLanguages: ['Hindi', 'English'],
    bio: 'Software engineer from Mumbai in Gujarat for Navratri! Looking for a group or partner to learn 3-Taali rhythm, pace through the night, and enjoy late-night Manek Chowk street food after.',
    passDetail: 'Pass: Night 3 & 4',
    syncPercent: 88,
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    type: 'single',
    activeMinutesAgo: 14,
    tags: ['#LateNightFoodCrawl', '#TraditionalKedia', '#FirstTimeGarba']
  },
  {
    id: 'pooja-circle',
    name: 'Pooja & Friends Circle',
    age: 25,
    cityOrigin: 'Vadodara Roots',
    destinationNote: '4 Members • Vadodara Roots',
    residentType: 'gujarat',
    residentTypeLabel: 'Circle Seeking 2 More',
    residentTypeBadgeClass: 'bg-[#dc2626] text-white',
    dancingSkill: 'pro',
    dancingSkillLabel: 'United Way Style',
    tonightVenueId: 'mirchi-rock-dandiya',
    tonightVenueName: 'Mirchi Rock Grounds',
    venueZoneNote: 'Spot 2 of 6 open',
    spokenLanguages: ['Gujarati', 'Hindi', 'English'],
    bio: 'We dance at high-momentum United Way style traditional concentric circles! Welcoming solo visitors and first-timers who love energetic synchrony and traditional steps.',
    passDetail: 'Group Verified',
    syncPercent: 94,
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    type: 'circle',
    membersCount: 4,
    circleName: 'United Way Con-centrics',
    activeMinutesAgo: 8,
    tags: ['#SanedoSpeedRounds', '#TraditionalAttireReady', '#UnitedWayStyle']
  },
  {
    id: 'kabir-shah',
    name: 'Dr. Kabir Shah',
    age: 29,
    cityOrigin: 'Ahmedabad Local',
    destinationNote: 'Orthopedic Resident • Ahmedabad Local',
    residentType: 'gujarat',
    residentTypeLabel: 'Singles Match • Local Pro',
    residentTypeBadgeClass: 'bg-[#facc15] text-[#0f131c]',
    dancingSkill: 'pro',
    dancingSkillLabel: '12-Step Dodhiya Pro',
    tonightVenueId: 'shankus-mahotsav',
    tonightVenueName: 'Shankus VIP Enclosure',
    venueZoneNote: 'Arriving 9:15 PM',
    spokenLanguages: ['Gujarati', 'Hindi', 'English'],
    bio: 'Born and raised in Navrangpura. Never missed a single Navratri night in 14 years. Looking for a high-stamina dancing partner for Shankus Mahotsav arena tonight. Can guide complex 12-step sequences.',
    passDetail: 'VIP Pass Holder',
    syncPercent: 96,
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    type: 'single',
    activeMinutesAgo: 22,
    tags: ['#DodhiyaMaster', '#SanedoSpeedRounds', '#AhmedabadLocal']
  },
  {
    id: 'sneha-rao',
    name: 'Sneha Rao',
    age: 24,
    cityOrigin: 'Bengaluru',
    destinationNote: 'Bengaluru → Solo Traveler',
    residentType: 'out-state',
    residentTypeLabel: 'Solo Explorer',
    residentTypeBadgeClass: 'bg-[#222938] text-[#dfe2ee] border border-[#334155]',
    dancingSkill: 'beginner',
    dancingSkillLabel: 'Beginner / Step Learner',
    tonightVenueId: 'shankus-mahotsav',
    tonightVenueName: 'Shankus or Mirchi',
    venueZoneNote: 'Active 5m ago',
    spokenLanguages: ['English', 'Hindi', 'Kannada'],
    bio: 'First time experiencing Gujarat Navratri! Flew in from Bangalore solo. Looking for female companions or a friendly safe circle to teach me the basic steps without judgment!',
    passDetail: 'ID Verified • Hotel Shuttle Pickup',
    syncPercent: 91,
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    type: 'single',
    activeMinutesAgo: 5,
    tags: ['#SoloFemaleSafe', '#FirstTimeGarba', '#WomenCirclePref']
  },
  {
    id: 'dev-patel',
    name: 'Dev & Meera (Step Mentors)',
    age: 27,
    cityOrigin: 'Surat / Ahmedabad',
    destinationNote: 'Dodhiya Coaches & Folk Instructors',
    residentType: 'gujarat',
    residentTypeLabel: 'Teach Me Dodhiya • Mentor',
    residentTypeBadgeClass: 'bg-[#2563eb] text-white',
    dancingSkill: 'pro',
    dancingSkillLabel: 'Master Instructors',
    tonightVenueId: 'shankus-mahotsav',
    tonightVenueName: 'Shankus Booth A',
    venueZoneNote: 'Holding circle at 8:45 PM',
    spokenLanguages: ['Gujarati', 'Hindi', 'English'],
    bio: 'We hold free 30-min beginner workshops before the main singer starts! Zero pressure, smiling vibes, and learning the footwork of 2-Taali, 3-Taali, and Popat steps.',
    passDetail: 'Official Venue Step Guides',
    syncPercent: 95,
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    type: 'guide',
    activeMinutesAgo: 3,
    tags: ['#TeachMeDodhiya', '#SafeIcebreaker', '#FreeWorkshops']
  }
];

export const INITIAL_SAFE_HUBS: SafeMeetupHub[] = [
  {
    id: 'booth-a',
    boothName: 'Booth A: Shankus Mahotsav',
    venueName: 'Shankus Dandiya Mahotsav',
    locationDetails: 'Near Food Court 2 & Illuminated Mirror Kiosk',
    description: 'Daily 8:30 PM communal icebreaker circle, illuminated mirror kiosk, and solo matching assistance by female marshals.',
    nextCircleInMins: 22,
    hostName: 'Marshal Jaydeep & She-Team Volunteer',
    waitingCount: 14,
    accentColor: '#facc15'
  },
  {
    id: 'booth-b',
    boothName: 'Booth B: Mirchi Rock Dandiya',
    venueName: 'Mirchi Rock N Dhol',
    locationDetails: 'Gate 4 Fountain Court',
    description: 'Express Dodhiya 3-Taali tutorial sessions every 45 minutes for newcomers. Free prop sanitization & phone lockers available.',
    nextCircleInMins: 35,
    hostName: 'Marshal Kinjal • Radio Mirchi Ground Team',
    waitingCount: 9,
    accentColor: '#dc2626'
  }
];
