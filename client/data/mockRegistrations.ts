export interface UserRegistration {
  id: string;
  eventId: number;
  status: 'registered' | 'pending' | 'approved' | 'rejected';
  registrationDate: string;
  approvalDate?: string;
  notes?: string;
}

// Mock user registrations - in a real app this would come from your backend
export const mockUserRegistrations: UserRegistration[] = [
  {
    id: "reg_1",
    eventId: 1,
    status: "registered",
    registrationDate: "2024-12-10",
    approvalDate: "2024-12-10", // Instant for open events
  },
  {
    id: "reg_2", 
    eventId: 2,
    status: "pending",
    registrationDate: "2024-12-12",
    notes: "Application under review by organizers"
  },
  {
    id: "reg_3",
    eventId: 4,
    status: "approved",
    registrationDate: "2024-12-08",
    approvalDate: "2024-12-09",
    notes: "Approved for startup networking mixer"
  },
  {
    id: "reg_4",
    eventId: 6,
    status: "registered",
    registrationDate: "2024-12-13",
    approvalDate: "2024-12-13", // Instant for open events
  },
  {
    id: "reg_5",
    eventId: 5,
    status: "pending",
    registrationDate: "2024-12-14",
    notes: "AI conference application pending review"
  }
];

export function getRegistrationStatus(eventId: number): UserRegistration | null {
  return mockUserRegistrations.find(reg => reg.eventId === eventId) || null;
}

export function getUserRegisteredEvents(): UserRegistration[] {
  return mockUserRegistrations;
}
