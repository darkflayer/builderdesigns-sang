import { useState, useMemo } from "react";
import { Search, MoreVertical, Edit3, Trash2, Download, MapPin, Mail, Phone, Linkedin, Twitter, Instagram, Globe, Building, User, X, Calendar, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { getAllConnections, connectionCategories, getCategoryById, type Connection } from "@/data/connectionCategories";
import { cn } from "@/lib/utils";

type CategoryFilter = 'all' | string;
type SortOption = 'name' | 'date' | 'category';

export default function Network() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState<Connection | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState<Connection | null>(null);
  const connections = getAllConnections();

  // Filter and sort connections
  const filteredAndSortedConnections = useMemo(() => {
    let filtered = connections.filter((connection) => {
      const matchesSearch =
        connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (connection.fieldsShared.company?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (connection.fieldsShared.role?.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === 'all' || connection.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sort connections
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.connectionDate).getTime() - new Date(a.connectionDate).getTime();
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [connections, searchQuery, categoryFilter, sortBy]);

  const handleCategoryChange = (connection: Connection, newCategoryId: string) => {
    // In a real app, this would update the backend
    console.log(`Changing category for ${connection.name} to ${newCategoryId}`);
    alert(`Category updated! In a real app, this would save to backend.`);
    setShowCategoryModal(null);
  };

  const handleRemoveConnection = (connection: Connection) => {
    // In a real app, this would call the backend API
    console.log(`Removing connection: ${connection.name}`);
    alert(`Connection removed! In a real app, this would delete from backend.`);
    setShowRemoveModal(null);
  };

  const handleDownloadInfo = (connection: Connection) => {
    // In a real app, this would generate and download a file with connection info
    const info = {
      name: connection.name,
      category: connection.category,
      connectionDate: connection.connectionDate,
      sharedFields: connection.fieldsShared,
      eventContext: connection.eventName ? {
        eventId: connection.eventId,
        eventName: connection.eventName
      } : null
    };

    console.log('Downloading connection info:', info);
    alert(`Downloading ${connection.name}'s information! In a real app, this would download a file.`);
  };

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'instagram': return Instagram;
      case 'website': return Globe;
      case 'company': return Building;
      case 'location': return MapPin;
      default: return User;
    }
  };

  const formatFieldValue = (fieldName: string, value: string) => {
    if (fieldName === 'email') {
      return <a href={`mailto:${value}`} className="text-purple-600 dark:text-purple-400 hover:underline">{value}</a>;
    }
    if (fieldName === 'phone') {
      return <a href={`tel:${value}`} className="text-purple-600 dark:text-purple-400 hover:underline">{value}</a>;
    }
    if (['linkedin', 'twitter', 'instagram', 'website'].includes(fieldName)) {
      return <a href={value} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">View Profile</a>;
    }
    return value;
  };

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm px-4 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">My Network</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage your connections and professional network
                </p>
              </div>

              {/* Filters and Sort */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {connectionCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>

                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{connections.length}</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Total Connections</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {connections.filter(c => c.eventName).length}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Event Connections</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {new Set(connections.map(c => c.category)).size}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Connections Grid */}
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {filteredAndSortedConnections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedConnections.map((connection) => {
                  const category = getCategoryById(connection.category);
                  return (
                    <div
                      key={connection.id}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      {/* Connection Header */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <button
                            onClick={() => setSelectedConnection(connection)}
                            className="flex-1 text-left"
                          >
                            <img
                              src={connection.avatar}
                              alt={connection.name}
                              className="w-16 h-16 rounded-full mx-auto mb-3 group-hover:scale-105 transition-transform duration-200"
                            />
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-center group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {connection.name}
                            </h3>
                          </button>

                          {/* Actions Menu */}
                          <div className="relative group">
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="h-4 w-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                            </button>

                            {/* Dropdown Menu - Only visible on hover */}
                            <div className="absolute top-8 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                              <button
                                onClick={() => setShowCategoryModal(connection)}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Edit3 className="h-4 w-4" />
                                <span className="text-sm">Change Category</span>
                              </button>
                              <button
                                onClick={() => handleDownloadInfo(connection)}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Download className="h-4 w-4" />
                                <span className="text-sm">Download Info</span>
                              </button>
                              <button
                                onClick={() => setShowRemoveModal(connection)}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="flex justify-center mb-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${category?.color}`}>
                            {category?.icon} {category?.name}
                          </span>
                        </div>

                        {/* Quick Info */}
                        {connection.fieldsShared.role && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                            {connection.fieldsShared.role}
                          </p>
                        )}
                        {connection.fieldsShared.company && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 text-center mb-3">
                            {connection.fieldsShared.company}
                          </p>
                        )}

                        {/* Event Context */}
                        {connection.eventName && (
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 mb-3">
                            <div className="flex items-center space-x-1 text-xs text-purple-700 dark:text-purple-300">
                              <MapPin className="h-3 w-3" />
                              <span>Met at: {connection.eventName}</span>
                            </div>
                          </div>
                        )}

                        {/* Scan Location */}
                        {connection.scanLocation && (
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 mb-3">
                            <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3 text-gray-500" />
                              <span>Scanned at: {connection.scanLocation}</span>
                            </div>
                          </div>
                        )}

                        {/* Connection Date */}
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>Connected {new Date(connection.connectionDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                  <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    No Connections Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchQuery || categoryFilter !== 'all'
                      ? "Try adjusting your search or filters."
                      : "Start scanning QR codes to build your network!"
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter('all');
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connection Profile Modal */}
        {selectedConnection && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Connection Profile</h2>
                    <button
                      onClick={() => setSelectedConnection(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  {/* Profile Header */}
                  <div className="text-center mb-8">
                    <img
                      src={selectedConnection.avatar}
                      alt={selectedConnection.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-100 dark:border-purple-900"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {selectedConnection.name}
                    </h3>

                    {/* Our Category for Them */}
                    <div className="flex justify-center mb-4">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white ${getCategoryById(selectedConnection.category)?.color}`}>
                        {getCategoryById(selectedConnection.category)?.icon} {getCategoryById(selectedConnection.category)?.name}
                      </span>
                    </div>

                    {/* Event Context */}
                    {selectedConnection.eventName && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-center space-x-2 text-purple-700 dark:text-purple-300">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">Met at: {selectedConnection.eventName}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shared Information */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Shared Information</h4>

                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(selectedConnection.fieldsShared).map(([field, value]) => {
                        if (!value || field === 'name') return null;

                        const IconComponent = getFieldIcon(field);

                        return (
                          <div key={field} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <IconComponent className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-1">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <div className="text-gray-900 dark:text-gray-100">
                                {formatFieldValue(field, value)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Connection Details */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Connection Details</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connected on {new Date(selectedConnection.connectionDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex space-x-3">
                  <button
                    onClick={() => setShowCategoryModal(selectedConnection)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Change Category
                  </button>
                  <button
                    onClick={() => handleDownloadInfo(selectedConnection)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-xl font-medium transition-all duration-200"
                  >
                    Download Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Change Category for {showCategoryModal.name}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {connectionCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(showCategoryModal, category.id)}
                        className={cn(
                          "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                          showCategoryModal.category === category.id
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 ${category.color}`}>
                          {category.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowCategoryModal(null)}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remove Connection Modal */}
        {showRemoveModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Remove Connection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to remove <strong>{showRemoveModal.name}</strong> from your network? This action cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowRemoveModal(null)}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRemoveConnection(showRemoveModal)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
