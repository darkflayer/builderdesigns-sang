import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, Share2, Heart, User } from "lucide-react";
import Layout from "@/components/Layout";
import { mockAttendees } from "@/data/mockAttendees";

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
    price: "Free",
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
  // Add more events as needed
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  const eventId = parseInt(id || "1");
  const event = eventDetails[eventId as keyof typeof eventDetails];
  const attendees = mockAttendees[eventId] || [];

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
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl text-lg font-bold">
                    {event.price}
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
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {event.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">per person</p>
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

        {/* Modals will be added here */}
        {showAttendeesModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            {/* Attendees Modal Component will go here */}
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Event Attendees</h2>
                    <button 
                      onClick={() => setShowAttendeesModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">Attendees modal content will be implemented next...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showRegistrationModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            {/* Registration Modal Component will go here */}
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Register for Event</h2>
                    <button 
                      onClick={() => setShowRegistrationModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">Registration modal content will be implemented next...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
