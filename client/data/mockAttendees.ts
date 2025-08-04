export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  company?: string;
  role?: string;
  bio?: string;
  avatar: string;
  joinedDate: string;
  sharedDetails: {
    email: boolean;
    phone: boolean;
    linkedin: boolean;
    twitter: boolean;
    company: boolean;
    role: boolean;
  };
}

export const mockAttendees: Record<number, Attendee[]> = {
  1: [ // Tech Innovation Summit
    {
      id: "att_1",
      name: "Sarah Chen",
      email: "sarah.chen@techcorp.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/sarahchen",
      company: "TechCorp",
      role: "Senior Developer",
      bio: "Full-stack developer passionate about AI and machine learning.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-10",
      sharedDetails: {
        email: true,
        phone: true,
        linkedin: true,
        twitter: false,
        company: true,
        role: true,
      }
    },
    {
      id: "att_2",
      name: "Marcus Johnson",
      email: "marcus@startupxyz.com",
      phone: "+1 (555) 987-6543",
      linkedin: "https://linkedin.com/in/marcusjohnson",
      twitter: "https://twitter.com/marcusj",
      company: "StartupXYZ",
      role: "CTO",
      bio: "Tech entrepreneur building the future of fintech.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-08",
      sharedDetails: {
        email: true,
        phone: false,
        linkedin: true,
        twitter: true,
        company: true,
        role: true,
      }
    },
    {
      id: "att_3",
      name: "Elena Rodriguez",
      email: "elena.r@innovate.com",
      linkedin: "https://linkedin.com/in/elenarodriguez",
      company: "Innovate Labs",
      role: "Product Manager",
      bio: "Product strategist focused on user experience and growth.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-12",
      sharedDetails: {
        email: true,
        phone: false,
        linkedin: true,
        twitter: false,
        company: true,
        role: true,
      }
    },
    {
      id: "att_4",
      name: "David Kim",
      email: "d.kim@venture.capital",
      phone: "+1 (555) 555-1234",
      linkedin: "https://linkedin.com/in/davidkim",
      company: "Venture Capital Partners",
      role: "Investment Partner",
      bio: "Early-stage investor focused on B2B SaaS and AI startups.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-05",
      sharedDetails: {
        email: true,
        phone: true,
        linkedin: true,
        twitter: false,
        company: true,
        role: true,
      }
    },
    {
      id: "att_5",
      name: "Priya Patel",
      email: "priya@designstudio.com",
      linkedin: "https://linkedin.com/in/priyapatel",
      twitter: "https://twitter.com/priyauxd",
      company: "Design Studio",
      role: "UX Designer",
      bio: "Design leader creating inclusive digital experiences.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-11",
      sharedDetails: {
        email: true,
        phone: false,
        linkedin: true,
        twitter: true,
        company: true,
        role: true,
      }
    },
    // Add more attendees for pagination testing
    {
      id: "att_6",
      name: "Alex Thompson",
      email: "alex@techflow.io",
      company: "TechFlow",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-13",
      sharedDetails: {
        email: true,
        phone: false,
        linkedin: false,
        twitter: false,
        company: true,
        role: true,
      }
    },
    {
      id: "att_7",
      name: "Lisa Wang",
      email: "lisa@datascience.com",
      phone: "+1 (555) 777-8888",
      linkedin: "https://linkedin.com/in/lisawang",
      company: "DataScience Corp",
      role: "Data Scientist",
      bio: "ML engineer specializing in computer vision and NLP.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-09",
      sharedDetails: {
        email: true,
        phone: true,
        linkedin: true,
        twitter: false,
        company: true,
        role: true,
      }
    }
  ],
  2: [ // Digital Marketing Workshop attendees
    {
      id: "att_8",
      name: "Jennifer Adams",
      email: "jen@marketing.pro",
      linkedin: "https://linkedin.com/in/jenniferadams",
      company: "Marketing Pro",
      role: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-14",
      sharedDetails: {
        email: true,
        phone: false,
        linkedin: true,
        twitter: false,
        company: true,
        role: true,
      }
    },
    {
      id: "att_9",
      name: "Robert Taylor",
      email: "rob@agency.com",
      phone: "+1 (555) 333-2222",
      company: "Creative Agency",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2024-12-15",
      sharedDetails: {
        email: true,
        phone: true,
        linkedin: false,
        twitter: false,
        company: true,
        role: true,
      }
    }
  ]
  // Add more events as needed
};
