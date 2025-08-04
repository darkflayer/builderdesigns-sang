import { useState, useMemo } from "react";
import { Search, X, Linkedin, Twitter, Mail, Phone, Building, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Attendee } from "@/data/mockAttendees";
import { cn } from "@/lib/utils";

interface AttendeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: Attendee[];
  eventTitle: string;
}

const ATTENDEES_PER_PAGE = 8;

export default function AttendeesModal({ isOpen, onClose, attendees, eventTitle }: AttendeesModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  // Filter attendees based on search
  const filteredAttendees = useMemo(() => {
    return attendees.filter(attendee => 
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [attendees, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredAttendees.length / ATTENDEES_PER_PAGE);
  const paginatedAttendees = filteredAttendees.slice(
    (currentPage - 1) * ATTENDEES_PER_PAGE,
    currentPage * ATTENDEES_PER_PAGE
  );

  // Reset page when search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedAttendee ? selectedAttendee.name : 'Event Attendees'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedAttendee ? 'Attendee Profile' : `${filteredAttendees.length} people attending ${eventTitle}`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {selectedAttendee && (
                  <button
                    onClick={() => setSelectedAttendee(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {selectedAttendee ? (
              /* Attendee Profile View */
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
                <div className="max-w-2xl mx-auto">
                  {/* Profile Header */}
                  <div className="text-center mb-8">
                    <img
                      src={selectedAttendee.avatar}
                      alt={selectedAttendee.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-100 dark:border-purple-900"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {selectedAttendee.name}
                    </h3>
                    {selectedAttendee.sharedDetails.role && selectedAttendee.role && (
                      <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">
                        {selectedAttendee.role}
                      </p>
                    )}
                    {selectedAttendee.sharedDetails.company && selectedAttendee.company && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedAttendee.company}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  {selectedAttendee.bio && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">About</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedAttendee.bio}
                      </p>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Information</h4>
                    <div className="space-y-4">
                      {/* Email */}
                      {selectedAttendee.sharedDetails.email && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <Mail className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                            <a 
                              href={`mailto:${selectedAttendee.email}`}
                              className="text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              {selectedAttendee.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Phone */}
                      {selectedAttendee.sharedDetails.phone && selectedAttendee.phone && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <Phone className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                            <a 
                              href={`tel:${selectedAttendee.phone}`}
                              className="text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              {selectedAttendee.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* LinkedIn */}
                      {selectedAttendee.sharedDetails.linkedin && selectedAttendee.linkedin && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <Linkedin className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</p>
                            <a 
                              href={selectedAttendee.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Twitter */}
                      {selectedAttendee.sharedDetails.twitter && selectedAttendee.twitter && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <Twitter className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Twitter</p>
                            <a 
                              href={selectedAttendee.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              Follow on Twitter
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300">
                      <Building className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Joined {new Date(selectedAttendee.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Attendees List View */
              <div className="flex flex-col h-full">
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search attendees by name, company, or role..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Attendees Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  {paginatedAttendees.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedAttendees.map((attendee) => (
                        <button
                          key={attendee.id}
                          onClick={() => setSelectedAttendee(attendee)}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 text-left group"
                        >
                          <img
                            src={attendee.avatar}
                            alt={attendee.name}
                            className="w-12 h-12 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {attendee.name}
                            </h3>
                            {attendee.sharedDetails.role && attendee.role && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {attendee.role}
                              </p>
                            )}
                            {attendee.sharedDetails.company && attendee.company && (
                              <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                                {attendee.company}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        No attendees found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your search to find attendees.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {((currentPage - 1) * ATTENDEES_PER_PAGE) + 1} to {Math.min(currentPage * ATTENDEES_PER_PAGE, filteredAttendees.length)} of {filteredAttendees.length} attendees
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            currentPage === 1
                              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          )}
                        >
                          Previous
                        </button>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const page = i + 1;
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                  "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                                  currentPage === page
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            currentPage === totalPages
                              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          )}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
