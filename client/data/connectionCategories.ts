export interface ConnectionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  fieldsToShare: {
    name: boolean;
    email: boolean;
    phone: boolean;
    company: boolean;
    role: boolean;
    linkedin: boolean;
    twitter: boolean;
    instagram: boolean;
    website: boolean;
    bio: boolean;
    location: boolean;
  };
}

export interface Connection {
  id: string;
  name: string;
  category: string;
  avatar: string;
  connectionDate: string;
  eventId?: number;
  eventName?: string;
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

// Mock connection categories - in real app this would come from backend
export const connectionCategories: ConnectionCategory[] = [
  {
    id: "friend",
    name: "Friend",
    description: "Close personal connection",
    icon: "👥",
    color: "bg-blue-500",
    fieldsToShare: {
      name: true,
      email: true,
      phone: true,
      company: false,
      role: false,
      linkedin: false,
      twitter: true,
      instagram: true,
      website: false,
      bio: true,
      location: true,
    }
  },
  {
    id: "professional",
    name: "Professional",
    description: "Business or work connection",
    icon: "💼",
    color: "bg-gray-600",
    fieldsToShare: {
      name: true,
      email: true,
      phone: false,
      company: true,
      role: true,
      linkedin: true,
      twitter: false,
      instagram: false,
      website: true,
      bio: true,
      location: false,
    }
  },
  {
    id: "investor",
    name: "Investor",
    description: "Investment or funding contact",
    icon: "💰",
    color: "bg-green-600",
    fieldsToShare: {
      name: true,
      email: true,
      phone: true,
      company: true,
      role: true,
      linkedin: true,
      twitter: false,
      instagram: false,
      website: true,
      bio: true,
      location: false,
    }
  },
  {
    id: "mentor",
    name: "Mentor",
    description: "Guidance and mentorship",
    icon: "🎓",
    color: "bg-purple-600",
    fieldsToShare: {
      name: true,
      email: true,
      phone: false,
      company: true,
      role: true,
      linkedin: true,
      twitter: true,
      instagram: false,
      website: true,
      bio: true,
      location: false,
    }
  },
  {
    id: "stranger",
    name: "Stranger",
    description: "New acquaintance",
    icon: "🤝",
    color: "bg-orange-500",
    fieldsToShare: {
      name: true,
      email: false,
      phone: false,
      company: false,
      role: false,
      linkedin: false,
      twitter: false,
      instagram: false,
      website: false,
      bio: false,
      location: false,
    }
  },
  {
    id: "relative",
    name: "Relative",
    description: "Family member",
    icon: "👨‍👩‍👧‍👦",
    color: "bg-pink-500",
    fieldsToShare: {
      name: true,
      email: true,
      phone: true,
      company: false,
      role: false,
      linkedin: false,
      twitter: true,
      instagram: true,
      website: false,
      bio: false,
      location: true,
    }
  },
  {
    id: "random",
    name: "Random",
    description: "Casual connection",
    icon: "🎲",
    color: "bg-indigo-500",
    fieldsToShare: {
      name: true,
      email: false,
      phone: false,
      company: false,
      role: false,
      linkedin: false,
      twitter: true,
      instagram: true,
      website: false,
      bio: false,
      location: false,
    }
  },
  {
    id: "client",
    name: "Client",
    description: "Business client or customer",
    icon: "🏢",
    color: "bg-teal-600",
    fieldsToShare: {
      name: true,
      email: true,
      phone: true,
      company: true,
      role: true,
      linkedin: true,
      twitter: false,
      instagram: false,
      website: true,
      bio: false,
      location: false,
    }
  }
];

// Mock connections data
export const mockConnections: Connection[] = [
  {
    id: "conn_1",
    name: "Sarah Johnson",
    category: "professional",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    connectionDate: "2024-12-14",
    eventId: 1,
    eventName: "Tech Innovation Summit 2024",
    fieldsShared: {
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      company: "TechCorp",
      role: "Senior Developer",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      website: "https://sarahj.dev",
      bio: "Full-stack developer passionate about AI"
    }
  },
  {
    id: "conn_2", 
    name: "Marcus Chen",
    category: "investor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    connectionDate: "2024-12-13",
    eventId: 4,
    eventName: "Startup Networking Mixer",
    fieldsShared: {
      name: "Marcus Chen",
      email: "marcus@venturecap.com",
      phone: "+1 (555) 123-4567",
      company: "Venture Capital Partners",
      role: "Investment Partner",
      linkedin: "https://linkedin.com/in/marcuschen",
      website: "https://venturecap.com",
      bio: "Early-stage investor focused on B2B SaaS"
    }
  },
  {
    id: "conn_3",
    name: "Emily Rodriguez",
    category: "friend",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    connectionDate: "2024-12-12",
    fieldsShared: {
      name: "Emily Rodriguez",
      email: "emily.r@gmail.com",
      phone: "+1 (555) 987-6543",
      twitter: "https://twitter.com/emilyrod",
      instagram: "https://instagram.com/emilyrodriguez",
      bio: "Photographer and travel enthusiast",
      location: "San Francisco, CA"
    }
  }
];

export function getCategoryById(categoryId: string): ConnectionCategory | undefined {
  return connectionCategories.find(cat => cat.id === categoryId);
}

export function getConnectionsByCategory(categoryId: string): Connection[] {
  return mockConnections.filter(conn => conn.category === categoryId);
}

export function getAllConnections(): Connection[] {
  return mockConnections;
}
