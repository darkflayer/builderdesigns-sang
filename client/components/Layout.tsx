import { Home, Calendar, Scan, Users, Search, MapPin, Bell, User, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  isAuthenticated?: boolean;
}

export default function Layout({ children, searchQuery = "", onSearchChange, isAuthenticated = false }: LayoutProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "My Events",
      href: "/my-events",
      icon: Calendar,
    },
    {
      name: "Scan",
      href: "/scan",
      icon: Scan,
    },
    {
      name: "Network",
      href: "/network",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      {/* Premium Desktop Navigation - Hidden on mobile */}
      <nav className="hidden lg:block bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  EventHub
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex space-x-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium",
                        isActive
                          ? "text-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isActive ? "text-purple-600" : "")} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Center Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search events by name, location, category..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Right Side - Theme Toggle, Location & Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <MapPin className="h-4 w-4 text-purple-600" />
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400 block text-xs">Location</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">San Francisco, CA</span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>

              <button className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              </button>

              {isAuthenticated ? (
                <Link to="/profile" className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <User className="h-5 w-5 text-white" />
                </Link>
              ) : (
                <Link to="/auth" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:pb-0 pb-20">
        {children}
      </main>

      {/* Footer - Hidden on mobile */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-2 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-purple-600" : "")} />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
