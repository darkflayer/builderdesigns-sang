export interface Notification {
  id: string;
  type: 'event' | 'connection' | 'organization' | 'role_request' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  metadata?: {
    eventId?: string;
    organizationId?: string;
    userId?: string;
    requestId?: string;
  };
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'event',
    title: 'Event Registration Confirmed',
    message: 'Your registration for "Tech Innovation Summit 2024" has been confirmed.',
    timestamp: '2024-12-15T10:30:00Z',
    read: false,
    actionUrl: '/event/1',
    priority: 'high',
    metadata: { eventId: '1' }
  },
  {
    id: 'notif_2',
    type: 'connection',
    title: 'New Connection Request',
    message: 'Sarah Johnson wants to connect with you.',
    timestamp: '2024-12-15T09:15:00Z',
    read: false,
    actionUrl: '/network',
    priority: 'medium',
    metadata: { userId: 'user_123' }
  },
  {
    id: 'notif_3',
    type: 'organization',
    title: 'Organization Invitation',
    message: 'You have been invited to join "TechCorp Events" as a Manager.',
    timestamp: '2024-12-15T08:45:00Z',
    read: false,
    actionUrl: '/profile?tab=organizations',
    priority: 'high',
    metadata: { organizationId: 'org_456', requestId: 'req_789' }
  },
  {
    id: 'notif_4',
    type: 'role_request',
    title: 'Role Upgrade Request',
    message: 'John Doe has requested to become an Event Coordinator.',
    timestamp: '2024-12-15T08:20:00Z',
    read: true,
    actionUrl: '/admin/requests',
    priority: 'medium',
    metadata: { userId: 'user_456', requestId: 'req_123' }
  },
  {
    id: 'notif_5',
    type: 'event',
    title: 'Event Approval Required',
    message: 'Your event "Digital Marketing Workshop" requires admin approval.',
    timestamp: '2024-12-15T07:30:00Z',
    read: true,
    actionUrl: '/events/manage',
    priority: 'medium',
    metadata: { eventId: '2' }
  },
  {
    id: 'notif_6',
    type: 'system',
    title: 'Welcome to Sang!',
    message: 'Complete your profile to get personalized event recommendations.',
    timestamp: '2024-12-14T15:00:00Z',
    read: true,
    actionUrl: '/profile',
    priority: 'low'
  },
  {
    id: 'notif_7',
    type: 'event',
    title: 'Sub-event Assignment',
    message: 'You have been assigned as coordinator for "AI Workshop" sub-event.',
    timestamp: '2024-12-14T14:20:00Z',
    read: false,
    actionUrl: '/events/subevent/sub_1_1',
    priority: 'high',
    metadata: { eventId: 'sub_1_1' }
  }
];

export function getNotifications(): Notification[] {
  return mockNotifications.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getUnreadCount(): number {
  return mockNotifications.filter(n => !n.read).length;
}

export function markAsRead(notificationId: string): void {
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
}

export function markAllAsRead(): void {
  mockNotifications.forEach(n => n.read = true);
}
