import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Star, CheckCircle, XCircle, AlertCircle, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { getUserRegisteredEvents } from "@/data/mockRegistrations";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

// Import events data to match with registrations
const events = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    location: "San Francisco, CA",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    attendees: 250,
    rating: 4.8,
    registrationType: "open" as const,
    category: "Technology",
    featured: true,
  },
  {
    id: 2,
    title: "Digital Marketing Workshop",
    location: "New York, NY",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
    attendees: 85,
    rating: 4.6,
    registrationType: "approval_required" as const,
    category: "Business",
    featured: false,
  },
  {
    id: 4,
    title: "Startup Networking Mixer",
    location: "Austin, TX",
    date: "Dec 22, 2024",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
    attendees: 180,
    rating: 4.7,
    registrationType: "approval_required" as const,
    category: "Business",
    featured: true,
  },
  {
    id: 5,
    title: "AI & Machine Learning Conference",
    location: "Seattle, WA",
    date: "Dec 25, 2024",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    attendees: 320,
    rating: 4.9,
    registrationType: "approval_required" as const,
    category: "Technology",
    featured: false,
  },
  {
    id: 6,
    title: "Photography Masterclass",
    location: "Los Angeles, CA",
    date: "Dec 28, 2024",
    time: "1:00 PM",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=200&fit=crop",
    attendees: 45,
    rating: 4.7,
    registrationType: "open" as const,
    category: "Art",
    featured: false,
  },
];

type StatusFilter = 'all' | 'registered' | 'pending' | 'approved' | 'rejected';

export default function MyEvents() {
  const { isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const userRegistrations = getUserRegisteredEvents();

  // Get events with registration status
  const myEventsWithStatus = useMemo(() => {
    return userRegistrations.map(registration => {
      const event = events.find(e => e.id === registration.eventId);
      return event ? { ...event, registration } : null;
    }).filter(Boolean);
  }, [userRegistrations]);

  // Filter by status
  const filteredEvents = useMemo(() => {
    if (statusFilter === 'all') return myEventsWithStatus;
    return myEventsWithStatus.filter(event => event?.registration.status === statusFilter);
  }, [myEventsWithStatus, statusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'registered':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered':
        return 'Registered';
      case 'pending':
        return 'Pending Approval';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Not Approved';
      default:
        return status;
    }
  };

  return (
    <Layout searchQuery="" onSearchChange={() => {}}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm px-4 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">My Events</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage your event registrations and track approval status
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="registered">Registered</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event!.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <Link to={`/event/${event!.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <img
                          src={event!.image}
                          alt={event!.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {/* Registration Status Badge */}
                        <div className="absolute top-3 left-3">
                          <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${getStatusColor(event!.registration.status)}`}>
                            {getStatusIcon(event!.registration.status)}
                            <span>{getStatusText(event!.registration.status)}</span>
                          </div>
                        </div>

                        {/* Registration Type */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg ${
                            event!.registrationType === 'open'
                              ? 'text-green-700 bg-green-100/95'
                              : 'text-orange-700 bg-orange-100/95'
                          }`}>
                            {event!.registrationType === 'open' ? 'Open' : 'Approval Required'}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-6">
                      <Link to={`/event/${event!.id}`}>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg group-hover:text-blue-600 transition-colors">
                          {event!.title}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-900 dark:text-gray-200">{event!.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-900 dark:text-gray-200">{event!.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-gray-200">{event!.location}</span>
                      </div>

                      {/* Registration Details */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <p className="mb-1">
                            <span className="font-medium">Registered:</span> {new Date(event!.registration.registrationDate).toLocaleDateString()}
                          </p>
                          {event!.registration.approvalDate && (
                            <p className="mb-1">
                              <span className="font-medium">
                                {event!.registration.status === 'approved' ? 'Approved:' : 'Confirmed:'}
                              </span> {new Date(event!.registration.approvalDate).toLocaleDateString()}
                            </p>
                          )}
                          {event!.registration.notes && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {event!.registration.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event!.attendees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event!.rating}</span>
                          </div>
                        </div>

                        <Link
                          to={`/event/${event!.id}`}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {statusFilter === 'all' ? 'No Registered Events' : `No ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Events`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {statusFilter === 'all'
                      ? "You haven't registered for any events yet. Discover amazing events to join!"
                      : `You don't have any ${statusFilter} events. Try changing the filter or explore new events.`
                    }
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Discover Events
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
