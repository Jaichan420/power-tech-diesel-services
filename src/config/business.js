export const business = {
  name: 'Power Tech Diesel Services',
  city: 'Chennai, Tamil Nadu, India',
  serviceArea: 'Chennai',
  address: '',
  phone: '',
  whatsapp: '',
  email: '',
  foundedYear: 2014,
}

export const serviceOptions = [
  'Generator Oil Servicing',
  'General Service',
  'Annual Maintenance Contract (AMC)',
  'Generator Inspection',
  'Other',
]

export const businessTypes = [
  'Petrol Bunk',
  'Industry/Factory',
  'Marriage Hall',
  'Other',
]

export const serviceCards = [
  {
    title: 'Generator Oil Servicing',
    description: 'Routine oil servicing with maintenance checks planned around your generator requirements.',
    items: ['Oil servicing', 'Filter maintenance where applicable', 'General maintenance checks'],
    icon: 'Droplets',
    service: 'Generator Oil Servicing',
  },
  {
    title: 'General Service',
    description: 'Inspection and maintenance support for generators at business facilities.',
    items: ['Generator inspection', 'Preventive maintenance checks', 'Facility service support'],
    icon: 'Wrench',
    service: 'General Service',
  },
  {
    title: 'Annual Maintenance Contract (AMC)',
    description: 'A structured approach to planning recurring generator maintenance for your facility.',
    items: ['Planned maintenance schedules', 'Maintenance follow-ups', 'Service requirement assessment'],
    icon: 'CalendarClock',
    service: 'Annual Maintenance Contract (AMC)',
  },
]

export const detailedServices = [
  {
    title: 'Generator Oil Servicing',
    service: 'Generator Oil Servicing',
    description: 'Oil servicing and routine checks to support the maintenance needs of your generator.',
    items: [
      'Engine oil servicing and replacement as required.',
      'Oil filter inspection and replacement where applicable.',
      'Routine checks during servicing.',
    ],
    icon: 'Droplets',
  },
  {
    title: 'General Service',
    service: 'General Service',
    description: 'Routine inspection and maintenance support to help identify generator service needs.',
    items: [
      'Routine inspection of generator components.',
      'Checks for visible leaks, unusual noise, and operating condition.',
      'Recommendations for maintenance requirements.',
    ],
    icon: 'Wrench',
  },
  {
    title: 'Annual Maintenance Contract (AMC)',
    service: 'Annual Maintenance Contract (AMC)',
    description: 'A planned maintenance arrangement shaped around your facility and agreed service plan.',
    items: [
      'Scheduled generator maintenance.',
      'Preventive maintenance visits according to the agreed plan.',
      'Maintenance records and service follow-ups.',
    ],
    icon: 'CalendarClock',
  },
  {
    title: 'Generator Inspection',
    service: 'Generator Inspection',
    description: 'A general condition assessment to identify concerns that may need further attention.',
    items: [
      'General condition assessment.',
      'Identification of potential maintenance concerns.',
      'Suggestions for further inspection or servicing.',
    ],
    icon: 'Search',
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
]

export const serviceMaterials = [
  {
    name: 'Engine oil',
    description: 'Engine oil is selected according to the generator model, operating conditions, and the maintenance plan. Engine oil brands are not yet confirmed.',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=82',
    alt: 'Generator engine oil container',
  },
  {
    name: 'Oil filters',
    description: 'Oil filters are replaced when required during servicing. Where the installed product matches, Kirloskar oil filters may be used as part of the service plan.',
    image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=82',
    alt: 'Oil filter and generator service components',
  },
  {
    name: 'Fuel filters',
    description: 'Fuel filter checks and replacement depend on the generator condition and service schedule. Where the installed product matches, Kirloskar fuel filters may be used.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=82',
    alt: 'Fuel filter and generator maintenance equipment',
  },
  {
    name: 'Air filters',
    description: 'Air filters are inspected and replaced as needed to support airflow and generator performance. Where the installed product matches, Kirloskar air filters may be used.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=82',
    alt: 'Air filters and generator maintenance work',
  },
  {
    name: 'Coolant, when applicable',
    description: 'Coolant is used only where required by the generator model and service scope. Coolant brands are not yet confirmed.',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca3a6b2f7?auto=format&fit=crop&w=900&q=82',
    alt: 'Coolant and generator system maintenance fluids',
  },
  {
    name: 'Cleaning materials',
    description: 'Cleaning materials are selected according to the specific service task and maintenance procedure used on site.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=82',
    alt: 'Cleaning materials used during service work',
  },
  {
    name: 'Service tools and safety equipment',
    description: 'Tools and safety equipment are chosen to suit the generator service task and site conditions.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=82',
    alt: 'Service tools and safety equipment used for generator maintenance',
  },
]

