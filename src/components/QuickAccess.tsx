import { Link } from "react-router-dom";
import { Search, Database, BarChart3, Network, BookOpen } from "lucide-react";

export default function QuickAccess() {
  const quickItems = [
    {
      name: "Advanced Search",
      description: "Search across NASA databases",
      icon: Search,
      path: "/search",
      color: "blue",
    },
    {
      name: "Data Catalog",
      description: "Explore NASA datasets",
      icon: Database,
      path: "/catalog",
      color: "green",
    },
    {
      name: "Analytics",
      description: "Research insights & metrics",
      icon: BarChart3,
      path: "/analytics",
      color: "purple",
    },
    {
      name: "Knowledge Graph",
      description: "Research connections",
      icon: Network,
      path: "/knowledge-graph",
      color: "orange",
    },
    {
      name: "All Research",
      description: "Browse all studies",
      icon: BookOpen,
      path: "/research",
      color: "red",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300",
    green:
      "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300",
    purple:
      "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300",
    orange:
      "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300",
    red: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300",
  };

  const iconColors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            🚀 Quick Access
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Direct access to NASA space biology research tools and databases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className={`block p-6 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg ${
                  colorClasses[item.color]
                }`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-xl bg-white mr-4 ${
                      iconColors[item.color]
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
                <p className="text-sm opacity-80 mb-2">{item.description}</p>
                <div className="mt-4 text-sm font-medium flex items-center">
                  Explore now →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Student Competition Note */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 text-center">
          <h3 className="font-bold text-blue-800 text-lg mb-2">
            🏆 NASA Space Apps Challenge - Bahrain
          </h3>
          <p className="text-blue-700">
            This application demonstrates real NASA research capabilities with
            interactive tools for space biology exploration.
          </p>
          <div className="mt-3 flex justify-center space-x-4 text-sm">
            <span className="bg-white px-3 py-1 rounded-full border border-blue-200">
              🔍 Advanced Search
            </span>
            <span className="bg-white px-3 py-1 rounded-full border border-blue-200">
              📊 Data Analytics
            </span>
            <span className="bg-white px-3 py-1 rounded-full border border-blue-200">
              🔗 Knowledge Graph
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
