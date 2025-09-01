export const APP_CONFIG = {
  name: 'Sang',
  description: 'Discover amazing events and connect with like-minded people',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
    timeout: 10000,
  },
  features: {
    qrScanning: true,
    networking: true,
    subEvents: true,
    notifications: true,
  },
  pagination: {
    eventsPerPage: 6,
    attendeesPerPage: 8,
    connectionsPerPage: 12,
  },
  theme: {
    defaultTheme: 'system' as const,
  },
};

export const ROUTES = {
  home: '/',
  auth: '/auth',
  events: {
    list: '/events',
    details: (id: string) => `/events/${id}`,
    myEvents: '/my-events',
  },
  scan: '/scan',
  network: '/network',
  profile: '/profile',
} as const;

export const EVENT_CATEGORIES = [
  'All',
  'Business',
  'Technology', 
  'Music',
  'Sports',
  'Art',
] as const;

export const REGISTRATION_TYPES = {
  OPEN: 'open',
  APPROVAL_REQUIRED: 'approval_required',
} as const;