// components/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import {
  Rocket,
  Search,
  Database,
  BarChart3,
  Network,
  BookOpen,
} from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Rocket, label: "Home" },
    { path: "/research", icon: BookOpen, label: "Research" },
    { path: "/catalog", icon: Database, label: "Data Catalog" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/knowledge-graph", icon: Network, label: "Knowledge Graph" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Rocket className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-xl font-bold text-slate-900">
              NASA Space Biology
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
