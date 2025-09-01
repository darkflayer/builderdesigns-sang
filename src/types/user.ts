export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  company?: string;
  role?: string;
  bio?: string;
  location?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showSocial: boolean;
  };
  interests: string[];
}

export interface UserStats {
  eventsAttended: number;
  connectionsCount: number;
  averageRating: number;
  achievementsCount: number;
}

export interface Connection {
  id: string;
  name: string;
  category: string;
  avatar: string;
  connectionDate: string;
  eventId?: number;
  eventName?: string;
  scanLocation?: string;
  fieldsShared: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    role?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
    bio?: string;
    location?: string;
  };
}