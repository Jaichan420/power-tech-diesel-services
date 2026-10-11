export const business = {
  name: 'Power Tech Diesel Services',
  city: 'Chennai, Tamil Nadu, India',
  serviceArea: 'Chennai',
  address: 'No. 22-A, Reddy Street, Chinna Koladi, Thiruverkadu, Chennai - 600 077',
  phone: '9940543661',
  whatsapp: '9940543661',
  email: 'powertechdieselservice@gmail.com',
  foundedYear: 2014,
}

export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000').replace(/\/+$/, '')

export const serviceOptions = [
  'Diesel Generator Servicing',
  'Engine Overhauling',
  'Generator Repairs',
  'Annual Maintenance Contracts (AMC)',
  'DG Set Installation & Erection Work',
  'Soundproofing Solutions',
  'AMF Panel Services',
  'DG Set Hiring',
  'Genuine & Imported Spare Parts',
]

export const generatorBrands = ['Cummins', 'Ashok Leyland', 'Kirloskar', 'Ruston', 'MWM', 'Other', 'Not Sure']
export const engineBrands = ['Cummins', 'Ashok Leyland', 'Kirloskar', 'Ruston', 'MWM']

export const businessTypes = [
  'Petrol Bunk',
  'Industry/Factory',
  'Marriage Hall',
  'School',
  'Hospital',
  'Other',
]

export const serviceCards = [
  {
    title: 'Diesel Generator Servicing',
    description: 'Routine care to support the maintenance needs of heavy-duty diesel generator sets.',
    items: ['Routine inspection', 'Oil changes and filter replacement', 'General maintenance'],
    icon: 'Droplets',
    service: 'Diesel Generator Servicing',
  },
  {
    title: 'Engine Overhauling',
    description: 'Major engine inspection, servicing, and overhauling.',
    items: ['Major engine inspection', 'Engine servicing and overhauling'],
    icon: 'Wrench',
    service: 'Engine Overhauling',
  },
  {
    title: 'Generator Repairs',
    description: 'Diagnosis and repair support for generator and engine problems.',
    items: ['Problem diagnosis', 'Generator and engine repair support'],
    icon: 'Search',
    service: 'Generator Repairs',
  },
  {
    title: 'Annual Maintenance Contracts (AMC)',
    description: 'Planned maintenance services for businesses and industries.',
    items: ['Planned maintenance', 'Service planning for business facilities'],
    icon: 'CalendarClock',
    service: 'Annual Maintenance Contracts (AMC)',
  },
  {
    title: 'DG Set Installation & Erection Work',
    description: 'Installation and setup support for diesel generator sets.',
    items: ['DG set installation support', 'Erection work and setup requirements'],
    icon: 'Factory',
    service: 'DG Set Installation & Erection Work',
  },
  {
    title: 'Soundproofing Solutions',
    description: 'Generator soundproofing and acoustic enclosure-related work.',
    items: ['Soundproofing solutions', 'Acoustic enclosure-related work'],
    icon: 'Volume2',
    service: 'Soundproofing Solutions',
  },
  {
    title: 'AMF Panel Services',
    description: 'Automatic Mains Failure panel installation and maintenance support.',
    items: ['AMF panel installation support', 'Panel-related maintenance'],
    icon: 'PanelTop',
    service: 'AMF Panel Services',
  },
  {
    title: 'DG Set Hiring',
    description: 'Diesel generator hiring services, subject to availability.',
    items: ['Ask about DG set hiring', 'Availability confirmed on enquiry'],
    icon: 'CalendarClock',
    service: 'DG Set Hiring',
  },
  {
    title: 'Genuine & Imported Spare Parts',
    description: 'Spare parts support for applicable diesel generator engines.',
    items: ['Cummins, Leyland, Kirloskar, Ruston, and MWM engines', 'Model-dependent compatibility'],
    icon: 'Package',
    service: 'Genuine & Imported Spare Parts',
  },
]

export const detailedServices = [
  {
    title: 'Diesel Generator Servicing',
    service: 'Diesel Generator Servicing',
    description: 'Routine inspection and general maintenance for heavy-duty diesel generator sets.',
    items: ['Routine inspection.', 'Oil changes and filter replacement.', 'General maintenance.'],
    icon: 'Droplets',
  },
  {
    title: 'Engine Overhauling',
    service: 'Engine Overhauling',
    description: 'Major engine inspection, servicing, and overhauling.',
    items: ['Major engine inspection.', 'Engine servicing and overhauling.'],
    icon: 'Wrench',
  },
  {
    title: 'Generator Repairs',
    service: 'Generator Repairs',
    description: 'Diagnosis and repair support for generator and engine problems.',
    items: ['Diagnosis of generator problems.', 'Repair support for generator and engine issues.'],
    icon: 'Search',
  },
  {
    title: 'Annual Maintenance Contracts (AMC)',
    service: 'Annual Maintenance Contracts (AMC)',
    description: 'Planned maintenance services for businesses and industries.',
    items: ['Planned generator maintenance.', 'Service planning for businesses and industries.'],
    icon: 'CalendarClock',
  },
  {
    title: 'DG Set Installation & Erection Work',
    service: 'DG Set Installation & Erection Work',
    description: 'Installation and setup support for diesel generator sets.',
    items: ['DG set installation support.', 'Erection work and setup requirements.'],
    icon: 'Factory',
  },
  {
    title: 'Soundproofing Solutions',
    service: 'Soundproofing Solutions',
    description: 'Generator soundproofing and acoustic enclosure-related work.',
    items: ['Soundproofing solutions.', 'Acoustic enclosure-related work.'],
    icon: 'Volume2',
  },
  {
    title: 'AMF Panel Services',
    service: 'AMF Panel Services',
    description: 'Automatic Mains Failure panel installation and maintenance support.',
    items: ['AMF panel installation support.', 'Panel-related maintenance.'],
    icon: 'PanelTop',
  },
  {
    title: 'DG Set Hiring',
    service: 'DG Set Hiring',
    description: 'Diesel generator hiring services, subject to availability.',
    items: ['Ask about DG set hiring.', 'Availability is confirmed on enquiry.'],
    icon: 'CalendarClock',
  },
  {
    title: 'Genuine & Imported Spare Parts',
    service: 'Genuine & Imported Spare Parts',
    description: 'Spare parts support for applicable Cummins, Leyland, Kirloskar, Ruston, and MWM engines.',
    items: ['Applicable generator engine spare parts.', 'Availability and compatibility depend on generator model.'],
    icon: 'Package',
  },
]

export const industries = [
  {
    title: 'Petrol Bunks',
    description: 'Plan generator care to support backup power needs at fuel stations.',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=850&q=82',
    alt: 'Fuel station forecourt',
    type: 'Petrol Bunk',
  },
  {
    title: 'Industries & Factories',
    description: 'Coordinate generator maintenance planning around the needs of your facility.',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=850&q=82',
    alt: 'Industrial facility interior',
    type: 'Industry/Factory',
  },
  {
    title: 'Marriage Halls',
    description: 'Plan maintenance ahead of functions and events at your venue.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=850&q=82',
    alt: 'Event hall prepared for a function',
    type: 'Marriage Hall',
  },
  {
    title: 'Schools & Colleges',
    description: 'Support consistent backup power planning for educational facilities and campus operations.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=850&q=82',
    alt: 'School campus building',
    type: 'School',
  },
  {
    title: 'Hospitals & Healthcare',
    description: 'Schedule generator maintenance with the reliability needs of healthcare facilities in mind.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=850&q=82',
    alt: 'Modern hospital building',
    type: 'Hospital',
  },
]

export const serviceIndustries = [
  {
    title: 'Petrol Bunks',
    description: 'Plan generator maintenance to support backup power needs at fuel stations.',
    image: industries[0].image,
    alt: industries[0].alt,
  },
  {
    title: 'Industries and Factories',
    description: 'Coordinate generator servicing and maintenance planning around facility needs.',
    image: industries[1].image,
    alt: industries[1].alt,
  },
  {
    title: 'Marriage Halls and Event Venues',
    description: 'Discuss generator maintenance planning ahead of functions and events.',
    image: industries[2].image,
    alt: industries[2].alt,
  },
  {
    title: 'Schools and Educational Institutions',
    description: 'Prepare generator care around the operational needs of schools and campuses.',
    image: industries[3].image,
    alt: industries[3].alt,
  },
  {
    title: 'Hospitals and Healthcare Facilities',
    description: 'Coordinate generator service plans suited to critical healthcare environments.',
    image: industries[4].image,
    alt: industries[4].alt,
  },
]

export const customerGroups = [
  {
    category: 'Petrol Bunks',
    customers: [
      {
        name: 'Customer name placeholder',
        logo: '',
        sitePhoto: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=900&q=82',
        alt: 'Placeholder site image for petrol bunk customer',
        showNameOnly: true,
        permissionNote: 'Published only with permission.',
      },
    ],
  },
  {
    category: 'Industries and Factories',
    customers: [
      {
        name: 'Customer name placeholder',
        logo: '',
        sitePhoto: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=82',
        alt: 'Placeholder site image for industrial customer',
        showNameOnly: true,
        permissionNote: 'Published only with permission.',
      },
    ],
  },
  {
    category: 'Marriage Halls',
    customers: [
      {
        name: 'Customer name placeholder',
        logo: '',
        sitePhoto: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=82',
        alt: 'Placeholder site image for wedding venue customer',
        showNameOnly: true,
        permissionNote: 'Published only with permission.',
      },
    ],
  },
  {
    category: 'Schools and Educational Institutions',
    customers: [
      {
        name: 'Customer name placeholder',
        logo: '',
        sitePhoto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=82',
        alt: 'Placeholder site image for school customer',
        showNameOnly: true,
        permissionNote: 'Published only with permission.',
      },
    ],
  },
  {
    category: 'Hospitals and Healthcare Facilities',
    customers: [
      {
        name: 'Customer name placeholder',
        logo: '',
        sitePhoto: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=82',
        alt: 'Placeholder site image for hospital customer',
        showNameOnly: true,
        permissionNote: 'Published only with permission.',
      },
    ],
  },
]

export const serviceMaterials = [
  {
    name: 'Engine oil',
    description: 'Oil selection depends on the generator engine model and service requirements.',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=82',
    alt: 'Generator engine oil container',
  },
  {
    name: 'Oil filters',
    description: 'Oil filter support for applicable generator engine models.',
    image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=82',
    alt: 'Oil filter and generator service components',
  },
  {
    name: 'Fuel filters',
    description: 'Fuel filter inspection and replacement as needed for the generator model.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=82',
    alt: 'Fuel filter and generator maintenance equipment',
  },
  {
    name: 'Air filters',
    description: 'Air filter support based on generator model and maintenance needs.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=82',
    alt: 'Air filters and generator maintenance work',
  },
  {
    name: 'Coolant',
    description: 'Coolant support where applicable to the generator model and service scope.',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca3a6b2f7?auto=format&fit=crop&w=900&q=82',
    alt: 'Coolant and generator system maintenance fluids',
  },
  {
    name: 'Applicable engine spare parts',
    description: 'Spare parts support for applicable generator engines. Availability and compatibility depend on the generator model.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=82',
    alt: 'Generator engine spare parts and maintenance materials',
  },
]
