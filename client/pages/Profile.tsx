import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Star,
  Users,
  Award,
  MapPin,
  Clock,
  ArrowLeft,
  Edit3,
  Mail,
  Phone,
  Building,
  UserPlus,
  Settings,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Plus,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import {
  getUserOrganizations,
  getUserInvitations,
  getPendingRoleRequests,
  getOrganizationEvents,
  isAdmin,
  getUserRole,
  type Organization,
  type RoleRequest,
  type EventManagement,
} from "@/data/mockOrganizations";

export default function Profile() {
  const { isAuthenticated, logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "organizations" | "events" | "requests"
  >("profile");
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showJoinOrg, setShowJoinOrg] = useState(false);

  const currentUserId = "user_current"; // In real app, get from auth
  const userOrganizations = getUserOrganizations(currentUserId);
  const userInvitations = getUserInvitations(currentUserId);
  const pendingRequests = userOrganizations.flatMap((org) =>
    isAdmin(currentUserId, org._id) ? getPendingRoleRequests(org._id) : [],
  );
  const userEvents = userOrganizations.flatMap((org) =>
    getOrganizationEvents(org._id),
  );

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout searchQuery="" onSearchChange={() => {}}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Please log in to view your profile
            </h1>
            <Link
              to="/auth"
              className="bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      date: "Dec 18, 2024",
      status: "Registered",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      title: "Startup Networking Mixer",
      date: "Dec 22, 2024",
      status: "Registered",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=100&h=100&fit=crop",
    },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">JD</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              John Doe
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Event Enthusiast</p>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              john.doe@email.com
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              +1 (555) 123-4567
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {userStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 text-center"
          >
            <div className="flex justify-center mb-2">
              <stat.icon className="h-6 w-6 text-[#1976d2]" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Events
        </h3>
        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-center space-x-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.date}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.status === "Attended"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-[#E8F1FC] text-[#125AA0] dark:bg-[#4F6789]/30 dark:text-[#7DA3D8]"
                }`}
              >
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrganizationsTab = () => (
    <div className="space-y-6">
      {/* Organizations Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Organizations
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCreateOrg(true)}
            className="bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Create Org
          </button>
          <button
            onClick={() => setShowJoinOrg(true)}
            className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
          >
            <UserPlus className="h-4 w-4 inline mr-2" />
            Join Org
          </button>
        </div>
      </div>

      {/* User Invitations */}
      {userInvitations.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-3">
            Pending Invitations
          </h3>
          <div className="space-y-3">
            {userInvitations.map((invitation) => (
              <div
                key={invitation._id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-300">
                    {invitation.organizationName}
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-500">
                    Role: {invitation.requestedRole} • From:{" "}
                    {invitation.inviterName}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700">
                    Accept
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Organizations */}
      <div className="grid gap-6">
        {userOrganizations.map((org) => (
          <div
            key={org._id}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {org.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {org.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Your role:{" "}
                  <span className="font-medium capitalize">
                    {getUserRole(currentUserId, org._id)}
                  </span>
                </p>
              </div>
              <Building className="h-6 w-6 text-[#1976d2]" />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Members
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {org.members.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Events
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {getOrganizationEvents(org._id).length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Requests
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {isAdmin(currentUserId, org._id)
                    ? getPendingRoleRequests(org._id).length
                    : 0}
                </p>
              </div>
            </div>

            {isAdmin(currentUserId, org._id) && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Admin Actions:
                </p>
                <div className="flex space-x-2">
                  <button className="bg-[#1976d2] text-white px-3 py-1 rounded text-sm font-medium hover:bg-[#125AA0]">
                    Manage Members
                  </button>
                  <button className="bg-[#1976d2] text-white px-3 py-1 rounded text-sm font-medium hover:bg-[#125AA0]">
                    View Requests
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {userOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Organizations
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first organization or join an existing one to start
            managing events.
          </p>
        </div>
      )}
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Event Management
        </h2>
        <button className="bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all">
          <Plus className="h-4 w-4 inline mr-2" />
          Create Event
        </button>
      </div>

      {userEvents.map((event) => (
        <div
          key={event._id}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {event.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {event.description}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
                <span>{event.date}</span>
                <span>{event.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.status === "approved"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : event.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Team Members:
            </p>
            <div className="flex flex-wrap gap-2">
              {event.team.map((member, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded text-xs"
                >
                  {member.name} ({member.role})
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {userEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Events
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first event to start managing attendees and team
            members.
          </p>
        </div>
      )}
    </div>
  );

  const renderRequestsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Role Requests
      </h2>

      {pendingRequests.length > 0 ? (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {request.userName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Requests {request.requestedRole} role in{" "}
                    {request.organizationName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                    <XCircle className="h-4 w-4 inline mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ClockIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Pending Requests
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Role requests will appear here when users apply to join your
            organizations.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <Layout searchQuery="" onSearchChange={() => {}}>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F5EF] to-[#F2EDE6] dark:bg-black">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 shadow-sm px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Link>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile & Management
              </h1>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex space-x-8">
              {[
                { id: "profile", label: "Profile", icon: Users },
                { id: "organizations", label: "Organizations", icon: Building },
                { id: "events", label: "Events", icon: Calendar },
                {
                  id: "requests",
                  label: "Requests",
                  icon: ClockIcon,
                  badge: pendingRequests.length,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors relative ${
                    activeTab === tab.id
                      ? "border-[#1976d2] text-[#1976d2] dark:text-[#7DA3D8]"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "organizations" && renderOrganizationsTab()}
          {activeTab === "events" && renderEventsTab()}
          {activeTab === "requests" && renderRequestsTab()}
        </div>

        {/* Action Buttons */}
        {activeTab === "profile" && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <button className="bg-[#1976d2] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#125AA0] transition-colors">
                Edit Profile
              </button>
              <button className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                Privacy Settings
              </button>
              <button
                onClick={logout}
                className="bg-gray-100 dark:bg-slate-700 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
