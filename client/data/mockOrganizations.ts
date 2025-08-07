export interface Organization {
  _id: string;
  name: string;
  officialEmail: string;
  description: string;
  contact: string;
  createdBy: string; // sang_id of the first admin
  members: OrganizationMember[];
  createdAt: string;
}

export interface OrganizationMember {
  sang_id: string;
  role: 'admin' | 'manager' | 'coordinator';
  joinedAt: string;
  name?: string; // For display purposes
  email?: string;
}

export interface RoleRequest {
  _id: string;
  sang_id: string;
  organizationId: string;
  requestedRole: 'admin' | 'manager' | 'coordinator';
  status: 'pending' | 'approved' | 'rejected';
  invitedByAdmin?: string | null;
  requestedByUser?: string | null;
  approvedByAdmin?: string | null;
  approvedAt?: string | null;
  createdAt: string;
  // Additional fields for display
  userName?: string;
  organizationName?: string;
  inviterName?: string;
}

export interface EventManagement {
  _id: string;
  name: string;
  organizationId: string;
  createdBy: string;
  approvedByAdmin: boolean;
  status: 'pending' | 'approved' | 'rejected';
  team: EventTeamMember[];
  description?: string;
  date?: string;
  location?: string;
  createdAt: string;
}

export interface EventTeamMember {
  sang_id: string;
  role: 'admin' | 'manager' | 'coordinator';
  assignedBy: string;
  name?: string;
}

export interface SubEvent {
  _id: string;
  parentEventId: string;
  organizationId: string;
  createdBy: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedByAdmin: boolean;
  coordinators: string[];
  timestamp: string;
  createdAt: string;
}

// Mock data
export const mockOrganizations: Organization[] = [
  {
    _id: 'org_1',
    name: 'TechCorp Events',
    officialEmail: 'events@techcorp.com',
    description: 'Premier technology events organization',
    contact: '+1 (555) 123-4567',
    createdBy: 'user_current',
    members: [
      {
        sang_id: 'user_current',
        role: 'admin',
        joinedAt: '2024-01-15T10:00:00Z',
        name: 'John Doe',
        email: 'john.doe@email.com'
      },
      {
        sang_id: 'user_123',
        role: 'manager',
        joinedAt: '2024-02-01T14:30:00Z',
        name: 'Sarah Johnson',
        email: 'sarah.j@techcorp.com'
      },
      {
        sang_id: 'user_456',
        role: 'coordinator',
        joinedAt: '2024-02-15T09:15:00Z',
        name: 'Mike Chen',
        email: 'mike.c@techcorp.com'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z'
  }
];

export const mockRoleRequests: RoleRequest[] = [
  {
    _id: 'req_1',
    sang_id: 'user_789',
    organizationId: 'org_1',
    requestedRole: 'manager',
    status: 'pending',
    requestedByUser: 'user_789',
    createdAt: '2024-12-15T08:20:00Z',
    userName: 'Emily Rodriguez',
    organizationName: 'TechCorp Events'
  },
  {
    _id: 'req_2',
    sang_id: 'user_101',
    organizationId: 'org_1',
    requestedRole: 'coordinator',
    status: 'pending',
    invitedByAdmin: 'user_current',
    createdAt: '2024-12-14T16:45:00Z',
    userName: 'Alex Kim',
    organizationName: 'TechCorp Events',
    inviterName: 'John Doe'
  }
];

export const mockEvents: EventManagement[] = [
  {
    _id: 'event_1',
    name: 'Tech Innovation Summit 2024',
    organizationId: 'org_1',
    createdBy: 'user_123',
    approvedByAdmin: true,
    status: 'approved',
    description: 'Annual technology innovation summit',
    date: '2024-12-15',
    location: 'San Francisco, CA',
    team: [
      {
        sang_id: 'user_123',
        role: 'manager',
        assignedBy: 'user_current',
        name: 'Sarah Johnson'
      },
      {
        sang_id: 'user_456',
        role: 'coordinator',
        assignedBy: 'user_123',
        name: 'Mike Chen'
      }
    ],
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    _id: 'event_2',
    name: 'Digital Marketing Workshop',
    organizationId: 'org_1',
    createdBy: 'user_123',
    approvedByAdmin: false,
    status: 'pending',
    description: 'Comprehensive digital marketing training',
    date: '2024-12-18',
    location: 'New York, NY',
    team: [
      {
        sang_id: 'user_123',
        role: 'manager',
        assignedBy: 'user_current',
        name: 'Sarah Johnson'
      }
    ],
    createdAt: '2024-12-10T14:30:00Z'
  }
];

// Helper functions
export function getUserOrganizations(userId: string): Organization[] {
  return mockOrganizations.filter(org => 
    org.members.some(member => member.sang_id === userId)
  );
}

export function getUserRole(userId: string, organizationId: string): string | null {
  const org = mockOrganizations.find(o => o._id === organizationId);
  const member = org?.members.find(m => m.sang_id === userId);
  return member?.role || null;
}

export function getPendingRoleRequests(organizationId: string): RoleRequest[] {
  return mockRoleRequests.filter(req => 
    req.organizationId === organizationId && req.status === 'pending'
  );
}

export function getOrganizationEvents(organizationId: string): EventManagement[] {
  return mockEvents.filter(event => event.organizationId === organizationId);
}

export function getUserInvitations(userId: string): RoleRequest[] {
  return mockRoleRequests.filter(req => 
    req.sang_id === userId && req.invitedByAdmin && req.status === 'pending'
  );
}

export function isAdmin(userId: string, organizationId: string): boolean {
  return getUserRole(userId, organizationId) === 'admin';
}

export function isManager(userId: string, organizationId: string): boolean {
  const role = getUserRole(userId, organizationId);
  return role === 'admin' || role === 'manager';
}
