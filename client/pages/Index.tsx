import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Bell, User, Calendar, Clock, Users, Star, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FilterSort, { SortOption, SortDirection, FilterState } from "@/components/FilterSort";
import Pagination from "@/components/Pagination";
import RegistrationModal from "@/components/RegistrationModal";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const categories = [
  { name: "All", active: true },
  { name: "Business", active: false },
  { name: "Technology", active: false },
  { name: "Music", active: false },
  { name: "Sports", active: false },
  { name: "Art", active: false },
];

interface SubEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  maxAttendees: number;
  registrationType: "open" | "approval_required";
  eventManager?: string;
  eventCoordinator?: string;
}

const megaEvents = [
  {
    id: 1, // Use actual event ID
    title: "Tech Innovation Summit 2024",
    location: "San Francisco, CA",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
    attendees: 250,
    rating: 4.8,
    registrationType: "open" as const,
    category: "Technology",
    isMega: true,
    price: "$299",
    description: "The premier technology conference featuring industry leaders, cutting-edge innovations, and networking opportunities.",
    hasSubEvents: true,
    subEvents: [
      {
        id: "sub_1_1",
        title: "AI & Machine Learning Workshop",
        description: "Deep dive into AI and ML technologies",
        time: "10:00 AM - 12:00 PM",
        date: "Dec 15, 2024",
        maxAttendees: 50,
        registrationType: "open" as const,
        eventManager: "Dr. Sarah Chen",
        eventCoordinator: "Alex Rodriguez"
      },
      {
        id: "sub_1_2",
        title: "Blockchain Innovation Panel",
        description: "Expert panel on blockchain technology trends",
        time: "2:00 PM - 4:00 PM",
        date: "Dec 15, 2024",
        maxAttendees: 100,
        registrationType: "approval_required" as const,
        eventManager: "Michael Zhang",
        eventCoordinator: "Lisa Park"
      }
    ] as SubEvent[]
  },
  {
    id: 4, // Use actual event ID
    title: "Startup Networking Mixer",
    location: "Austin, TX",
    date: "Dec 22, 2024",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
    attendees: 180,
    rating: 4.7,
    registrationType: "approval_required" as const,
    category: "Business",
    isMega: true,
    price: "$149",
    description: "Premier networking event bringing together entrepreneurs, investors, and innovators.",
    hasSubEvents: true,
    subEvents: [
      {
        id: "sub_4_1",
        title: "Investor Pitch Session",
        description: "Present your startup to potential investors",
        time: "7:00 PM - 8:30 PM",
        date: "Dec 22, 2024",
        maxAttendees: 30,
        registrationType: "approval_required" as const,
        eventManager: "Jennifer Walsh",
        eventCoordinator: "David Kim"
      },
      {
        id: "sub_4_2",
        title: "Networking Happy Hour",
        description: "Casual networking with drinks and appetizers",
        time: "8:30 PM - 10:00 PM",
        date: "Dec 22, 2024",
        maxAttendees: 150,
        registrationType: "open" as const,
        eventManager: "Tom Wilson",
        eventCoordinator: "Maria Garcia"
      }
    ] as SubEvent[]
  },
  {
    id: 3, // Use actual event ID
    title: "Jazz Night at Blue Note",
    location: "Chicago, IL",
    date: "Dec 20, 2024",
    time: "8:00 PM",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    attendees: 120,
    rating: 4.9,
    registrationType: "open" as const,
    category: "Music",
    isMega: true,
    price: "$89",
    description: "An intimate evening of world-class jazz performances featuring renowned artists.",
    hasSubEvents: false
  }
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
    registrationType: "open" as const,
    category: "Technology",
    featured: true,
    hasSubEvents: true,
    subEvents: [
      {
        id: "sub_1_1",
        title: "AI & Machine Learning Workshop",
        description: "Deep dive into AI and ML technologies",
        time: "10:00 AM - 12:00 PM",
        date: "Dec 15, 2024",
        maxAttendees: 50,
        registrationType: "open" as const,
        eventManager: "Dr. Sarah Chen",
        eventCoordinator: "Alex Rodriguez"
      },
      {
        id: "sub_1_2",
        title: "Blockchain Innovation Panel",
        description: "Expert panel on blockchain technology trends",
        time: "2:00 PM - 4:00 PM",
        date: "Dec 15, 2024",
        maxAttendees: 100,
        registrationType: "approval_required" as const,
        eventManager: "Michael Zhang",
        eventCoordinator: "Lisa Park"
      }
    ] as SubEvent[]
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
    hasSubEvents: false,
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
    registrationType: "open" as const,
    category: "Music",
    featured: false,
    hasSubEvents: false,
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
    hasSubEvents: true,
    subEvents: [
      {
        id: "sub_4_1",
        title: "Investor Pitch Session",
        description: "Present your startup to potential investors",
        time: "7:00 PM - 8:30 PM",
        date: "Dec 22, 2024",
        maxAttendees: 30,
        registrationType: "approval_required" as const,
        eventManager: "Jennifer Walsh",
        eventCoordinator: "David Kim"
      },
      {
        id: "sub_4_2",
        title: "Networking Happy Hour",
        description: "Casual networking with drinks and appetizers",
        time: "8:30 PM - 10:00 PM",
        date: "Dec 22, 2024",
        maxAttendees: 150,
        registrationType: "open" as const,
        eventManager: "Tom Wilson",
        eventCoordinator: "Maria Garcia"
      }
    ] as SubEvent[]
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
    hasSubEvents: false,
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
    hasSubEvents: false,
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
    registrationType: "approval_required" as const,
    category: "Sports",
    featured: false,
    hasSubEvents: false,
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
    registrationType: "open" as const,
    category: "Business",
    featured: false,
    hasSubEvents: false,
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
    registrationType: "open" as const,
    category: "Music",
    featured: false,
    hasSubEvents: false,
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
    registrationType: "approval_required" as const,
    category: "Art",
    featured: false,
    hasSubEvents: false,
  },
];

const ITEMS_PER_PAGE = 6;

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ option: SortOption; direction: SortDirection }>({
    option: 'date',
    direction: 'asc'
  });
  const [filters, setFilters] = useState<FilterState>({
    priceRange: 'all',
    dateRange: 'all',
    cities: []
  });
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState<any>(null);
  const [currentMegaEvent, setCurrentMegaEvent] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication state
  const { theme, toggleTheme } = useTheme();

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMegaEvent((prev) => (prev + 1) % megaEvents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      // Search filter
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      
      // Registration type filter
      let matchesRegistrationType = true;
      if (filters.priceRange === 'open') {
        matchesRegistrationType = event.registrationType === 'open';
      } else if (filters.priceRange === 'approval_required') {
        matchesRegistrationType = event.registrationType === 'approval_required';
      }
      
      // City filter
      const matchesCity = filters.cities.length === 0 || filters.cities.includes(event.location);
      
      return matchesSearch && matchesCategory && matchesRegistrationType && matchesCity;
    });

    // Sort events
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.option) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = a.date.localeCompare(b.date);
          break;
        case 'price':
          // Sort by registration type (open first, then approval required)
          const typeOrderA = a.registrationType === 'open' ? 0 : 1;
          const typeOrderB = b.registrationType === 'open' ? 0 : 1;
          comparison = typeOrderA - typeOrderB;
          break;
        case 'location':
          comparison = a.location.localeCompare(b.location);
          break;
        case 'attendees':
          comparison = a.attendees - b.attendees;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [events, searchQuery, selectedCategory, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredAndSortedEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const featuredEvents = paginatedEvents.filter(event => event.featured);
  const regularEvents = paginatedEvents.filter(event => !event.featured);

  // Event handlers
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (option: SortOption, direction: SortDirection) => {
    setSortConfig({ option, direction });
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleRegisterForEvent = (event: any) => {
    setSelectedEventForRegistration(event);
    setShowRegistrationModal(true);
  };

  return (
    <Layout searchQuery={searchQuery} onSearchChange={handleSearchChange} isAuthenticated={isAuthenticated}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Mobile Header - Only shown on mobile */}
        <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your location</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
                <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 relative">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
                </button>
                {isAuthenticated ? (
                  <Link to="/profile" className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600">
                    <User className="h-5 w-5 text-white" />
                  </Link>
                ) : (
                  <Link to="/auth" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-xl text-sm font-semibold">
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl border-0 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-700 transition-all text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Premium Mega Events Carousel */}
        <div className="px-4 lg:px-8 py-6">
          <div className="max-w-md lg:max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">🌟 Mega Events</h2>
              <div className="flex space-x-2">
                {megaEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMegaEvent(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      currentMegaEvent === index
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 scale-125"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentMegaEvent * 100}%)` }}
              >
                {megaEvents.map((event, index) => (
                  <div key={event.id} className="min-w-full relative">
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                      <div className="absolute inset-0 flex items-center">
                        <div className="px-8 lg:px-16 max-w-2xl">
                          <div className="mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              ⚡ MEGA EVENT
                            </span>
                          </div>
                          <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            {event.title}
                          </h3>
                          <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                              <Calendar className="h-5 w-5 text-white" />
                              <span className="text-white font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                              <MapPin className="h-5 w-5 text-white" />
                              <span className="text-white font-medium">{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                              <Users className="h-5 w-5 text-white" />
                              <span className="text-white font-medium">{event.attendees.toLocaleString()} attendees</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleRegisterForEvent(event)}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                              Register Now - {event.price}
                            </button>
                            <Link
                              to={`/event/${event.id}`}
                              className="text-white hover:text-gray-200 font-semibold underline transition-colors"
                            >
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentMegaEvent((prev) => (prev - 1 + megaEvents.length) % megaEvents.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentMegaEvent((prev) => (prev + 1) % megaEvents.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories and Filters */}
        <div className="px-4 lg:px-8 py-6 lg:py-8">
          <div className="max-w-md lg:max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">Discover Events</h2>
              <div className="flex items-center justify-between lg:justify-end space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredAndSortedEvents.length} events found
                </div>
                <FilterSort
                  onSortChange={handleSortChange}
                  onFilterChange={handleFiltersChange}
                  currentSort={sortConfig}
                  currentFilters={filters}
                />
              </div>
            </div>
            <div className="flex space-x-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-sm",
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <div className="px-4 lg:px-8 py-4">
            <div className="max-w-md lg:max-w-7xl mx-auto">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">⭐ Featured Events</h2>
              <div className="space-y-6 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:space-y-0 lg:gap-8">
                {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-400 hover:-translate-y-1"
                  >
                    <Link to={`/event/${event.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                            ✨ Featured
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className={`bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${
                            event.registrationType === 'open'
                              ? 'text-green-700 bg-green-100/95'
                              : 'text-orange-700 bg-orange-100/95'
                          }`}>
                            {event.registrationType === 'open' ? 'Open' : 'Approval Required'}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link to={`/event/${event.id}`}>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg group-hover:text-purple-600 transition-colors">{event.title}</h3>
                      </Link>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-gray-900 dark:text-gray-200">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-gray-900 dark:text-gray-200">{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-gray-200">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.attendees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.rating}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRegisterForEvent(event);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                          Join Event
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Events Section */}
        <div className="px-4 lg:px-8 py-6">
          <div className="max-w-md lg:max-w-7xl mx-auto">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">🎯 All Events</h2>
            <div className="space-y-4 lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:space-y-0 lg:gap-6">
              {regularEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-400 hover:-translate-y-1"
                >
                  <Link to={`/event/${event.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-32 lg:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <span className={`bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold shadow-lg ${
                          event.registrationType === 'open'
                            ? 'text-green-700 bg-green-100/95'
                            : 'text-orange-700 bg-orange-100/95'
                        }`}>
                          {event.registrationType === 'open' ? 'Open' : 'Approval Required'}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/event/${event.id}`}>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-sm group-hover:text-purple-600 transition-colors line-clamp-2">{event.title}</h3>
                    </Link>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1">
                        <Calendar className="h-3 w-3 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-gray-200">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1">
                        <Clock className="h-3 w-3 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-gray-200">{event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 mb-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1">
                      <MapPin className="h-3 w-3 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-gray-200 truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-gray-500" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{event.attendees}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{event.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterForEvent(event);
                        }}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedEvents.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />

        {/* Empty State */}
        {filteredAndSortedEvents.length === 0 && (
          <div className="px-4 lg:px-8 py-12">
            <div className="max-w-md lg:max-w-7xl mx-auto text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-12 border border-purple-200 dark:border-purple-800">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">No events found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                  Try adjusting your search or category filter to discover amazing events in your area.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setFilters({
                      priceRange: 'all',
                      dateRange: 'all',
                      cities: []
                    });
                  }}
                  className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {selectedEventForRegistration && (
          <RegistrationModal
            isOpen={showRegistrationModal}
            onClose={() => {
              setShowRegistrationModal(false);
              setSelectedEventForRegistration(null);
            }}
            eventTitle={selectedEventForRegistration.title}
            registrationType={selectedEventForRegistration.registrationType}
          />
        )}
      </div>
    </Layout>
  );
}
