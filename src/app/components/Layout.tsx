import { Outlet, Link, useLocation } from "react-router";
import { Map, Target, Filter, User } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Map, label: "地图探索" },
    { path: "/levels", icon: Target, label: "闯关答题" },
    { path: "/filter", icon: Filter, label: "筛选" },
    { path: "/profile", icon: User, label: "个人中心" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA]">
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom TabBar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-20 max-w-screen-xl mx-auto px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 py-2 transition-all ${
                  isActive ? "text-[#4A90E2]" : "text-gray-500"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "scale-110" : ""}`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
