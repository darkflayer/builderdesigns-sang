export interface Event {
  id: number;
  title: string;
  description?: string;
  location: string;
  venue?: string;
  date: string;
  time: string;
  image: string;
  attendees: number;
  rating: number;
  registrationType: 'open' | 'approval_required';
  category: string;
  featured?: boolean;
  hasSubEvents?: boolean;
  subEvents?: SubEvent[];
  tags?: string[];
  organizer?: EventOrganizer;
  highlights?: string[];
  schedule?: ScheduleItem[];
}

export interface SubEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  maxAttendees: number;
  currentAttendees?: number;
  registrationType: 'open' | 'approval_required';
  eventManager?: string;
  eventCoordinator?: string;
}

export interface EventOrganizer {
  name: string;
  avatar: string;
  email: string;
  verified: boolean;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface EventRegistration {
  id: string;
  eventId: number;
  status: 'registered' | 'pending' | 'approved' | 'rejected';
  registrationDate: string;
  approvalDate?: string;
  notes?: string;
}