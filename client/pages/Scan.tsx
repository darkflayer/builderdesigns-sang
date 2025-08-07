import { useState, useRef } from "react";
import { Camera, Upload, Flashlight, QrCode, ToggleLeft, ToggleRight, X, User, MapPin, Calendar, Share2 } from "lucide-react";
import Layout from "@/components/Layout";
import { connectionCategories, mockConnections, getCategoryById } from "@/data/connectionCategories";
import { cn } from "@/lib/utils";

export default function Scan() {
  const [eventMode, setEventMode] = useState(false);
  const [showMyQR, setShowMyQR] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would process the uploaded image for QR scanning
      console.log("Processing uploaded image:", file.name);
      alert("QR scan from uploaded image - feature would be implemented with QR scanner library");
    }
  };

  const requestLocationPermission = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // In a real app, you would reverse geocode the coordinates to get a readable address
        const mockLocation = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        setCurrentLocation(mockLocation);
        setLocationPermission('granted');
        return true;
      } catch (error) {
        setLocationPermission('denied');
        alert('Location access denied. QR scanning will work without location data.');
        return false;
      }
    } else {
      alert('Geolocation is not supported by this browser.');
      return false;
    }
  };

  const startScanning = async () => {
    // Request location if not already granted
    if (locationPermission === 'prompt') {
      await requestLocationPermission();
    }

    setScanning(true);
    // In a real app, you would start the camera and QR scanning
    setTimeout(() => {
      setScanning(false);
      const locationText = currentLocation ? ` at ${currentLocation}` : '';
      alert(`QR Code scanned successfully${locationText}! In a real app, this would process the scanned data and save the connection with location info.`);
    }, 2000);
  };

  const generateQRCode = () => {
    if (!selectedCategory) {
      alert("Please select a connection category first");
      return;
    }

    const category = getCategoryById(selectedCategory);
    if (category) {
      // In a real app, you would generate QR code with the selected fields
      console.log("Generating QR with category:", category.name);
      console.log("Fields to share:", category.fieldsToShare);
      alert(`QR Code generated for ${category.name} category with specified fields. In a real app, this would show the actual QR code.`);
    }
  };

  return (
    <Layout searchQuery="" onSearchChange={() => {}} isAuthenticated={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm px-4 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">QR Scanner</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Scan QR codes or share your information
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Show My QR Button */}
                <button
                  onClick={() => setShowMyQR(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200"
                >
                  <QrCode className="h-4 w-4" />
                  <span>Show My QR</span>
                </button>

                {/* Event Mode Toggle */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Mode</span>
                  <button
                    onClick={() => setEventMode(!eventMode)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                      eventMode ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-600"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        eventMode ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Mode Indicator */}
            {eventMode && (
              <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Event Mode Active - Connections will show "Met at Event" context
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* QR Scanner Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Scan QR Code</h2>

                {/* Scanner Box */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="relative">
                    {/* Scanner Viewport */}
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative">
                      {scanning ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Scanning...</p>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Position QR code within frame</p>
                          </div>
                        </div>
                      )}

                      {/* Scanner Frame Overlay */}
                      <div className="absolute inset-4 border-2 border-purple-500 rounded-lg">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-500"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500"></div>
                      </div>
                    </div>

                    {/* Scanner Controls */}
                    <div className="flex justify-center space-x-4 mt-6">
                      <button
                        onClick={() => setFlashEnabled(!flashEnabled)}
                        className={cn(
                          "flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-200",
                          flashEnabled
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        <Flashlight className="h-5 w-5" />
                        <span className="text-xs font-medium">Flash</span>
                      </button>

                      <button
                        onClick={startScanning}
                        disabled={scanning}
                        className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-200 disabled:opacity-50"
                      >
                        <Camera className="h-5 w-5" />
                        <span className="text-xs font-medium">Scan</span>
                      </button>

                      <button
                        onClick={handleFileUpload}
                        className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                      >
                        <Upload className="h-5 w-5" />
                        <span className="text-xs font-medium">Upload</span>
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Connections & Recent Activity */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Connections</h2>
                  <button
                    onClick={() => setShowConnections(!showConnections)}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium"
                  >
                    {showConnections ? 'Hide All' : 'View All'}
                  </button>
                </div>

                {/* Connections List */}
                <div className="space-y-4">
                  {mockConnections.slice(0, showConnections ? undefined : 3).map((connection) => {
                    const category = getCategoryById(connection.category);
                    return (
                      <div key={connection.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                        <div className="flex items-center space-x-4">
                          <img
                            src={connection.avatar}
                            alt={connection.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {connection.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${category?.color}`}>
                                {category?.icon} {category?.name}
                              </span>
                            </div>
                            {eventMode && connection.eventName && (
                              <div className="flex items-center space-x-1 mt-2 text-xs text-gray-600 dark:text-gray-400">
                                <MapPin className="h-3 w-3" />
                                <span>Met at: {connection.eventName}</span>
                              </div>
                            )}
                            {connection.scanLocation && (
                              <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500 dark:text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span>Scanned at: {connection.scanLocation}</span>
                              </div>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              Connected on {new Date(connection.connectionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Share2 className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {mockConnections.length === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No Connections Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start scanning QR codes to build your network!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Show My QR Modal */}
        {showMyQR && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Share My QR Code</h2>
                    <button
                      onClick={() => setShowMyQR(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Select Connection Category
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Choose how you want to connect. Different categories share different information.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {connectionCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200",
                          selectedCategory === category.id
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${category.color}`}>
                          {category.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          {category.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                          {category.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Selected Category Details */}
                  {selectedCategory && (
                    <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Information that will be shared:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(getCategoryById(selectedCategory)?.fieldsToShare || {}).map(([field, shared]) => (
                          shared && (
                            <div key={field} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300 capitalize">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate QR Button */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={generateQRCode}
                    disabled={!selectedCategory}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    Generate QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
