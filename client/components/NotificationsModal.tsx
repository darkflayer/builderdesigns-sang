import { useState } from "react";
import {
  X,
  Calendar,
  Users,
  Building,
  UserCheck,
  Settings,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  type Notification,
} from "@/data/mockNotifications";
import { cn } from "@/lib/utils";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({
  isOpen,
  onClose,
}: NotificationsModalProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(getNotifications());

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "event":
        return Calendar;
      case "connection":
        return Users;
      case "organization":
        return Building;
      case "role_request":
        return UserCheck;
      case "system":
        return Settings;
      default:
        return Calendar;
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-orange-600 dark:text-orange-400";
      case "low":
        return "text-[#1976d2] dark:text-[#7DA3D8]";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
    setNotifications(getNotifications());
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setNotifications(getNotifications());
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-start justify-center min-h-screen p-4 pt-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Notifications
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Mark all read
                </button>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  No notifications
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-slate-700">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer",
                        !notification.read &&
                          "bg-purple-50 dark:bg-purple-900/20",
                      )}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={cn(
                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                            notification.read
                              ? "bg-gray-100 dark:bg-slate-700"
                              : "bg-purple-100 dark:bg-purple-900/30",
                          )}
                        >
                          <IconComponent
                            className={cn(
                              "h-4 w-4",
                              notification.read
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-purple-600 dark:text-purple-400",
                            )}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h3
                              className={cn(
                                "font-semibold text-sm",
                                notification.read
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-900 dark:text-white",
                              )}
                            >
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              )}
                              <Clock
                                className={cn(
                                  "h-3 w-3",
                                  getPriorityColor(notification.priority),
                                )}
                              />
                            </div>
                          </div>

                          <p
                            className={cn(
                              "text-sm mt-1",
                              notification.read
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-gray-700 dark:text-gray-300",
                            )}
                          >
                            {notification.message}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
