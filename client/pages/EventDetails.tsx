import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, Share2, Heart, User, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import AttendeesModal from "@/components/AttendeesModal";
import RegistrationModal from "@/components/RegistrationModal";
import { mockAttendees } from "@/data/mockAttendees";
import { getRegistrationStatus } from "@/data/mockRegistrations";

// Extended event data for details page
const eventDetails = {
  1: {
    id: 1,
    title: "Tech Innovation Summit 2024",
    location: "San Francisco, CA",
    venue: "Moscone Center, Hall A",
    date: "Dec 15, 2024",
    time: "9:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    attendees: 250,
    rating: 4.8,
    registrationType: "open" as const,
    category: "Technology",
    featured: true,
    description: "Join us for the most anticipated technology event of the year! Connect with industry leaders, discover cutting-edge innovations, and explore the future of technology. This summit brings together entrepreneurs, developers, investors, and visionaries from around the globe.",
    highlights: [
      "Keynote speakers from top tech companies",
      "Interactive workshops and demos",
      "Networking sessions with industry leaders",
      "Startup pitch competition",
      "Latest AI and ML showcases"
    ],
    schedule: [
      { time: "9:00 AM", activity: "Registration & Welcome Coffee" },
      { time: "10:00 AM", activity: "Opening Keynote: The Future of AI" },
      { time: "11:30 AM", activity: "Panel: Scaling Tech Startups" },
      { time: "1:00 PM", activity: "Lunch & Networking" },
      { time: "2:30 PM", activity: "Workshop: Building ML Models" },
      { time: "4:00 PM", activity: "Startup Pitch Competition" },
      { time: "5:30 PM", activity: "Closing Remarks & After Party" }
    ],
    organizer: {
      name: "Tech Events Inc.",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop",
      email: "contact@techevents.com",
      verified: true
    },
    tags: ["AI", "Machine Learning", "Startups", "Innovation", "Networking"]
  },
  2: {
    id: 2,
    title: "Digital Marketing Workshop",
    location: "New York, NY",
    venue: "Creative Hub, Conference Room B",
    date: "Dec 18, 2024",
    time: "2:00 PM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    attendees: 85,
    rating: 4.6,
    registrationType: "approval_required" as const,
    category: "Business",
    featured: false,
    description: "Master the latest digital marketing strategies and tactics in this intensive workshop. Learn from industry experts and get hands-on experience with the latest tools and platforms.",
    highlights: [
      "Advanced social media strategies",
      "SEO and content marketing",
      "PPC campaign optimization",
      "Analytics and reporting",
      "Hands-on tool demonstrations"
    ],
    schedule: [
      { time: "2:00 PM", activity: "Registration & Welcome" },
      { time: "2:30 PM", activity: "Social Media Marketing Trends" },
      { time: "3:30 PM", activity: "SEO Best Practices" },
      { time: "4:30 PM", activity: "Break & Networking" },
      { time: "5:00 PM", activity: "PPC Campaign Workshop" },
      { time: "5:45 PM", activity: "Q&A and Wrap-up" }
    ],
    organizer: {
      name: "Digital Marketing Pro",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      email: "info@digitalmarketingpro.com",
      verified: true
    },
    tags: ["Digital Marketing", "SEO", "Social Media", "PPC", "Analytics"]
  },
  3: {
    id: 3,
    title: "Jazz Night at Blue Note",
    location: "Chicago, IL",
    venue: "Blue Note Jazz Club",
    date: "Dec 20, 2024",
    time: "8:00 PM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    attendees: 120,
    rating: 4.9,
    registrationType: "open" as const,
    category: "Music",
    featured: false,
    description: "Experience an unforgettable evening of jazz music featuring renowned artists and emerging talents. Enjoy classic cocktails and sophisticated atmosphere.",
    highlights: [
      "Live jazz performances",
      "Featured guest artists",
      "Premium cocktail menu",
      "Intimate venue setting",
      "Meet the artists session"
    ],
    schedule: [
      { time: "8:00 PM", activity: "Doors Open & Welcome Drinks" },
      { time: "8:30 PM", activity: "Opening Act" },
      { time: "9:15 PM", activity: "Main Performance Set 1" },
      { time: "10:00 PM", activity: "Intermission" },
      { time: "10:15 PM", activity: "Main Performance Set 2" },
      { time: "11:00 PM", activity: "Meet & Greet with Artists" }
    ],
    organizer: {
      name: "Blue Note Entertainment",
      avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
      email: "events@bluenote.com",
      verified: true
    },
    tags: ["Jazz", "Live Music", "Cocktails", "Entertainment", "Nightlife"]
  },
  4: {
    id: 4,
    title: "Startup Networking Mixer",
    location: "Austin, TX",
    venue: "Innovation District, Main Hall",
    date: "Dec 22, 2024",
    time: "6:00 PM - 9:00 PM",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    attendees: 180,
    rating: 4.7,
    registrationType: "approval_required" as const,
    category: "Business",
    featured: true,
    description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts in Austin's thriving tech scene. This exclusive networking event brings together the most promising startups and influential investors.",
    highlights: [
      "Exclusive networking opportunities",
      "Investor pitch sessions",
      "Startup showcases",
      "Expert panel discussions",
      "Premium catering and drinks"
    ],
    schedule: [
      { time: "6:00 PM", activity: "Registration & Welcome Reception" },
      { time: "6:30 PM", activity: "Startup Showcase Presentations" },
      { time: "7:30 PM", activity: "Investor Panel Discussion" },
      { time: "8:00 PM", activity: "Open Networking Session" },
      { time: "8:30 PM", activity: "Closing Remarks & After Party" }
    ],
    organizer: {
      name: "Austin Startup Alliance",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop",
      email: "network@austinstartups.org",
      verified: true
    },
    tags: ["Startups", "Networking", "Investors", "Entrepreneurship", "Tech"]
  },
  5: {
    id: 5,
    title: "AI & Machine Learning Conference",
    location: "Seattle, WA",
    venue: "Seattle Convention Center",
    date: "Dec 25, 2024",
    time: "10:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    attendees: 320,
    rating: 4.9,
    registrationType: "approval_required" as const,
    category: "Technology",
    featured: false,
    description: "Dive deep into the latest advances in artificial intelligence and machine learning. This conference features cutting-edge research, practical applications, and networking opportunities with AI experts.",
    highlights: [
      "Cutting-edge AI research presentations",
      "Hands-on ML workshops",
      "Industry expert keynotes",
      "AI startup exhibitions",
      "Technical deep-dive sessions"
    ],
    schedule: [
      { time: "10:00 AM", activity: "Registration & Coffee" },
      { time: "10:30 AM", activity: "Keynote: Future of AI" },
      { time: "11:30 AM", activity: "Technical Sessions Track A & B" },
      { time: "1:00 PM", activity: "Lunch & Networking" },
      { time: "2:00 PM", activity: "Workshop: Building AI Models" },
      { time: "4:00 PM", activity: "Panel: AI Ethics & Society" },
      { time: "5:00 PM", activity: "Closing & Happy Hour" }
    ],
    organizer: {
      name: "AI Research Institute",
      avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop",
      email: "events@airesearch.org",
      verified: true
    },
    tags: ["AI", "Machine Learning", "Research", "Deep Learning", "Neural Networks"]
  },
  6: {
    id: 6,
    title: "Photography Masterclass",
    location: "Los Angeles, CA",
    venue: "Creative Arts Studio",
    date: "Dec 28, 2024",
    time: "1:00 PM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=400&fit=crop",
    attendees: 45,
    rating: 4.7,
    registrationType: "open" as const,
    category: "Art",
    featured: false,
    description: "Learn advanced photography techniques from award-winning photographers. This hands-on masterclass covers portrait, landscape, and street photography with practical shooting sessions.",
    highlights: [
      "Professional photography techniques",
      "Hands-on shooting sessions",
      "Photo editing workshops",
      "Equipment demonstrations",
      "Portfolio review sessions"
    ],
    schedule: [
      { time: "1:00 PM", activity: "Welcome & Introduction" },
      { time: "1:30 PM", activity: "Portrait Photography Techniques" },
      { time: "2:30 PM", activity: "Practical Shooting Session" },
      { time: "3:30 PM", activity: "Break & Equipment Demo" },
      { time: "4:00 PM", activity: "Photo Editing Workshop" },
      { time: "4:45 PM", activity: "Portfolio Review & Feedback" }
    ],
    organizer: {
      name: "Creative Photography Academy",
      avatar: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop",
      email: "workshops@creativephoto.com",
      verified: true
    },
    tags: ["Photography", "Portrait", "Landscape", "Art", "Creative"]
  },
  7: {
    id: 7,
    title: "Basketball Championship Finals",
    location: "Miami, FL",
    venue: "American Airlines Arena",
    date: "Dec 30, 2024",
    time: "7:00 PM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    attendees: 15000,
    rating: 4.8,
    registrationType: "approval_required" as const,
    category: "Sports",
    featured: false,
    description: "Experience the excitement of championship basketball at its finest. Watch the season's best teams compete for the ultimate prize in this thrilling finale.",
    highlights: [
      "Championship game experience",
      "Premium seating options",
      "Pre-game entertainment",
      "Concession and merchandise",
      "Post-game celebration"
    ],
    schedule: [
      { time: "7:00 PM", activity: "Arena Opens & Pre-game Activities" },
      { time: "7:30 PM", activity: "Team Warm-ups" },
      { time: "8:00 PM", activity: "Opening Ceremony" },
      { time: "8:15 PM", activity: "Game Start" },
      { time: "10:00 PM", activity: "Post-game Celebration" }
    ],
    organizer: {
      name: "Professional Basketball League",
      avatar: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=100&h=100&fit=crop",
      email: "tickets@probasketball.com",
      verified: true
    },
    tags: ["Basketball", "Sports", "Championship", "Entertainment", "Live Event"]
  },
  8: {
    id: 8,
    title: "Food & Wine Festival",
    location: "Portland, OR",
    venue: "Waterfront Park",
    date: "Jan 2, 2025",
    time: "12:00 PM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
    attendees: 500,
    rating: 4.6,
    registrationType: "open" as const,
    category: "Business",
    featured: false,
    description: "Celebrate the finest in food and wine with local chefs, wineries, and culinary experts. Taste exceptional dishes, discover new wines, and enjoy live cooking demonstrations.",
    highlights: [
      "Local chef demonstrations",
      "Wine tasting sessions",
      "Artisan food vendors",
      "Live cooking competitions",
      "Culinary workshops"
    ],
    schedule: [
      { time: "12:00 PM", activity: "Festival Opening & Welcome" },
      { time: "12:30 PM", activity: "Chef Demonstrations Begin" },
      { time: "2:00 PM", activity: "Wine Tasting Sessions" },
      { time: "4:00 PM", activity: "Cooking Competition" },
      { time: "6:00 PM", activity: "Live Music & Dining" },
      { time: "8:00 PM", activity: "Festival Closing" }
    ],
    organizer: {
      name: "Portland Culinary Society",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
      email: "events@portlandculinary.org",
      verified: true
    },
    tags: ["Food", "Wine", "Culinary", "Local Chefs", "Gastronomy"]
  },
  9: {
    id: 9,
    title: "Classical Music Concert",
    location: "Boston, MA",
    venue: "Symphony Hall",
    date: "Jan 5, 2025",
    time: "8:00 PM - 10:30 PM",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop",
    attendees: 800,
    rating: 4.9,
    registrationType: "open" as const,
    category: "Music",
    featured: false,
    description: "Experience the beauty of classical music performed by world-renowned musicians in the historic Symphony Hall. An evening of timeless compositions and exceptional artistry.",
    highlights: [
      "World-class symphony orchestra",
      "Historic venue acoustics",
      "Classical masterpieces",
      "Professional musicians",
      "Elegant evening atmosphere"
    ],
    schedule: [
      { time: "8:00 PM", activity: "Doors Open & Pre-concert Reception" },
      { time: "8:30 PM", activity: "Opening Performance" },
      { time: "9:15 PM", activity: "Intermission" },
      { time: "9:30 PM", activity: "Main Symphony Performance" },
      { time: "10:30 PM", activity: "Closing & Reception" }
    ],
    organizer: {
      name: "Boston Symphony Orchestra",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      email: "tickets@bostonsymphony.org",
      verified: true
    },
    tags: ["Classical Music", "Symphony", "Orchestra", "Culture", "Arts"]
  },
  10: {
    id: 10,
    title: "Modern Art Exhibition",
    location: "New York, NY",
    venue: "Metropolitan Art Gallery",
    date: "Jan 8, 2025",
    time: "10:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=400&fit=crop",
    attendees: 200,
    rating: 4.5,
    registrationType: "approval_required" as const,
    category: "Art",
    featured: false,
    description: "Explore cutting-edge contemporary art from emerging and established artists. This curated exhibition showcases innovative works across various mediums and artistic expressions.",
    highlights: [
      "Contemporary art showcase",
      "Artist meet and greets",
      "Guided exhibition tours",
      "Art acquisition opportunities",
      "Cultural networking events"
    ],
    schedule: [
      { time: "10:00 AM", activity: "Exhibition Opening" },
      { time: "11:00 AM", activity: "Guided Tour Session 1" },
      { time: "1:00 PM", activity: "Artist Talk & Q&A" },
      { time: "3:00 PM", activity: "Guided Tour Session 2" },
      { time: "5:00 PM", activity: "Closing Reception" },
      { time: "6:00 PM", activity: "Exhibition Closes" }
    ],
    organizer: {
      name: "Metropolitan Art Society",
      avatar: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop",
      email: "exhibitions@metartsociety.org",
      verified: true
    },
    tags: ["Modern Art", "Contemporary", "Exhibition", "Culture", "Gallery"]
  }
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  const eventId = parseInt(id || "1");
  const event = eventDetails[eventId as keyof typeof eventDetails];
  const attendees = mockAttendees[eventId] || [];
  const userRegistration = getRegistrationStatus(eventId);

  if (!event) {
    return (
      <Layout searchQuery="" onSearchChange={() => {}}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Event Not Found</h1>
            <Link to="/" className="text-purple-600 hover:text-purple-700">
              Return to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout searchQuery="" onSearchChange={() => {}}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-4 left-4 lg:top-8 lg:left-8 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl hover:bg-white dark:hover:bg-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-900 dark:text-gray-100" />
          </Link>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {event.featured && (
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      ✨ Featured Event
                    </span>
                  )}
                  <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">{event.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm lg:text-base">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`backdrop-blur-sm px-4 py-2 rounded-xl text-lg font-bold ${
                    event.registrationType === 'open'
                      ? 'bg-green-100/90 text-green-800'
                      : 'bg-orange-100/90 text-orange-800'
                  }`}>
                    {event.registrationType === 'open' ? 'Open Registration' : 'Approval Required'}
                  </span>
                  <div className="flex items-center space-x-2 text-white/90">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{event.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Event */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About This Event</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {event.description}
                </p>
                
                {/* Event Highlights */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">What to Expect</h3>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Event Schedule</h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 min-w-[80px]">
                        {item.time}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Event Actions & Info */}
            <div className="space-y-6">
              {/* Registration Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-8">
                <div className="text-center mb-6">
                  <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-xl ${
                    event.registrationType === 'open'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                  }`}>
                    {event.registrationType === 'open' ? 'Open Registration' : 'Approval Required'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.registrationType === 'open'
                      ? 'Register instantly'
                      : 'Application review required'}
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowRegistrationModal(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 mb-4"
                >
                  Register for Event
                </button>
                
                <div className="flex space-x-3 mb-6">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>

                {/* Attendees */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Attendees</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{event.attendees} going</span>
                  </div>
                  
                  {/* Attendee Avatars */}
                  <div className="flex -space-x-2 mb-4">
                    {attendees.slice(0, 5).map((attendee) => (
                      <img
                        key={attendee.id}
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                      />
                    ))}
                    {attendees.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          +{attendees.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setShowAttendeesModal(true)}
                    className="w-full text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium py-2 border border-purple-200 dark:border-purple-800 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    View All Attendees
                  </button>
                </div>
              </div>

              {/* Organizer Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Organizer</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{event.organizer.name}</h4>
                      {event.organizer.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.organizer.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AttendeesModal
          isOpen={showAttendeesModal}
          onClose={() => setShowAttendeesModal(false)}
          attendees={attendees}
          eventTitle={event.title}
        />

        <RegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          eventTitle={event.title}
          registrationType={event.registrationType}
        />
      </div>
    </Layout>
  );
}
