import { ArrowLeft, Edit3, MapPin, Mail, Phone, Calendar, Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Profile() {
  const userStats = [
    { label: "Events Attended", value: "24", icon: Calendar },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Connections", value: "156", icon: Users },
    { label: "Achievements", value: "12", icon: Award },
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "Dec 15, 2024",
      status: "Attended",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      date: "Dec 18, 2024",
      status: "Registered",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      title: "Startup Networking Mixer",
      date: "Dec 22, 2024",
      status: "Registered",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=100&h=100&fit=crop",
    },
  ];

  return (
    <Layout searchQuery="" onSearchChange={() => {}} isAuthenticated={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Edit3 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">JD</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">Event Enthusiast</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">john.doe@email.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 py-2">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="px-4 py-4">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === "Attended"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4">
          <div className="max-w-md mx-auto space-y-3">
            <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
              Edit Profile
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Privacy Settings
            </button>
            <button className="w-full bg-gray-100 text-red-600 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
