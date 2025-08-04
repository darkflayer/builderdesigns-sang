import { Home, Calendar, Scan, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                    isActive
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-600 hover:text-gray-900"
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
