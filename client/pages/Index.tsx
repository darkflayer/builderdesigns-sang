import { useState } from "react";
import { Search, MapPin, Bell, User, Calendar, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All", active: true },
  { name: "Business", active: false },
  { name: "Technology", active: false },
  { name: "Music", active: false },
  { name: "Sports", active: false },
  { name: "Art", active: false },
];

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
    price: "Free",
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
    price: "$29",
    category: "Business",
    featured: false,
  },
  {
    id: 3,
    title: "Jazz Night at Blue Note",
    location: "Chicago, IL",
    date: "Dec 20, 2024",
    time: "8:00 PM",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
    attendees: 120,
    rating: 4.9,
    price: "$45",
    category: "Music",
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
    price: "$15",
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
    price: "$89",
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
    price: "$75",
    category: "Art",
    featured: false,
  },
  {
    id: 7,
    title: "Basketball Championship Finals",
    location: "Miami, FL",
    date: "Dec 30, 2024",
    time: "7:00 PM",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop",
    attendees: 15000,
    rating: 4.8,
    price: "$150",
    category: "Sports",
    featured: false,
  },
  {
    id: 8,
    title: "Food & Wine Festival",
    location: "Portland, OR",
    date: "Jan 2, 2025",
    time: "12:00 PM",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
    attendees: 500,
    rating: 4.6,
    price: "$95",
    category: "Business",
    featured: false,
  },
  {
    id: 9,
    title: "Classical Music Concert",
    location: "Boston, MA",
    date: "Jan 5, 2025",
    time: "8:00 PM",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=200&fit=crop",
    attendees: 800,
    rating: 4.9,
    price: "$120",
    category: "Music",
    featured: false,
  },
  {
    id: 10,
    title: "Modern Art Exhibition",
    location: "New York, NY",
    date: "Jan 8, 2025",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=200&fit=crop",
    attendees: 200,
    rating: 4.5,
    price: "$25",
    category: "Art",
    featured: false,
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Location and Profile */}
        <div className="bg-white shadow-sm px-4 lg:px-8 py-4">
          <div className="max-w-md lg:max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Your location</p>
                  <p className="font-semibold text-gray-900">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full bg-gray-100 relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
                </button>
                <Link to="/profile" className="p-2 rounded-full bg-purple-100">
                  <User className="h-5 w-5 text-purple-600" />
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name, location, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 lg:px-8 py-4">
          <div className="max-w-md lg:max-w-7xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Categories</h2>
            <div className="flex space-x-2 overflow-x-auto lg:overflow-x-visible pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === category.name
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="px-4 py-2">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Events</h2>
            <div className="space-y-4">
              {filteredEvents
                .filter((event) => event.featured)
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-white text-gray-900 px-2 py-1 rounded-full text-sm font-semibold">
                          {event.price}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.attendees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{event.rating}</span>
                          </div>
                        </div>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          Join Event
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* All Events Section */}
        <div className="px-4 py-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">All Events</h2>
            <div className="space-y-4">
              {filteredEvents
                .filter((event) => !event.featured)
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-white text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                          {event.price}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{event.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{event.attendees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{event.rating}</span>
                          </div>
                        </div>
                        <button className="bg-purple-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-purple-700 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="px-4 py-8">
            <div className="max-w-md mx-auto text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter to find more events.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
