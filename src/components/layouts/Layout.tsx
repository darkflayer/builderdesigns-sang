"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Home,
  Calendar,
  Scan,
  Users,
  Search,
  MapPin,
  Bell,
  User,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Footer from "./Footer";
import NotificationsModal from "@/components/shared/NotificationsModal";
import { getUnreadCount } from "@/data/mockNotifications";

interface LayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Layout({
  children,
  searchQuery = "",
  onSearchChange,
}: LayoutProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const unreadCount = getUnreadCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
  };

  const toggleProfileDropdown = () => {
    if (!showProfileDropdown && profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5EF] to-[#F2EDE6] dark:from-black dark:to-gray-900 pt-20 flex flex-col transition-colors duration-300">
      {/* Premium Desktop Navigation - Hidden on mobile */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-white/30 dark:border-white/10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.8)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-gradient-to-r before:from-[#7DA3D8]/5 before:via-transparent before:to-[#4F6789]/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] bg-clip-text text-transparent">
                  Sang
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="flex space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium",
                        isActive
                          ? "text-[#1976d2] bg-[#E8F1FC] dark:bg-[#4F6789]/20 shadow-sm ring-1 ring-[#7DA3D8]/30 dark:ring-[#7DA3D8]/20"
                          : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-[rgba(125,163,216,0.08)] dark:hover:bg-[rgba(79,103,137,0.18)]",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-[#1976d2]" : "",
                        )}
                      />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Center Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search events by name, location, category..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1976d2] focus:border-transparent transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Right Side - Theme Toggle, Location & Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/60 dark:bg-white/5 rounded-xl ring-1 ring-white/20 dark:ring-white/10">
                <MapPin className="h-4 w-4 text-[#1976d2]" />
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-300 block text-xs">
                    Location
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    San Francisco, CA
                  </span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 ring-1 ring-white/20 dark:ring-white/10 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                )}
              </button>

              <button
                onClick={() => setShowNotifications(true)}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  </div>
                )}
              </button>

              {isAuthenticated ? (
                <>
                  <button
                    ref={profileButtonRef}
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 p-2.5 rounded-xl bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <User className="h-5 w-5 text-white" />
                    <ChevronDown className="h-3 w-3 text-white" />
                  </button>

                  {showProfileDropdown &&
                    createPortal(
                      <div
                        ref={dropdownRef}
                        className="fixed w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2"
                        style={{
                          top: dropdownPosition.top,
                          right: dropdownPosition.right,
                          zIndex: 99999,
                        }}
                      >
                        {/* Profile Header */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Hi, {user?.name || "User"}!
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user?.email || "user@example.com"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={handleProfileClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <User className="h-4 w-4 mr-3" />
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Log out
                          </button>
                        </div>
                      </div>,
                      document.body,
                    )}
                </>
              ) : (
                <Link
                  href="/auth"
                  className="bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] hover:opacity-90 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:pb-0 pb-20">{children}</main>

      {/* Footer - Hidden on mobile */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0.6)] dark:from-[rgba(16,23,40,0.9)] dark:to-[rgba(16,23,40,0.6)] backdrop-blur-xl border-t border-transparent px-4 py-2 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-[#1976d2] bg-[#E8F1FC] dark:bg-[#4F6789]/20 shadow-sm ring-1 ring-[#7DA3D8]/30 dark:ring-[#7DA3D8]/20"
                      : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 mb-1",
                      isActive ? "text-[#1976d2]" : "",
                    )}
                  />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}