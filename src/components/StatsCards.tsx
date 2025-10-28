import { Database, Users, FileText, Satellite, Microscope } from "lucide-react";

const stats = [
  {
    icon: Database,
    value: "2.4M+",
    label: "Space Biology Datasets",
    change: "+12%",
    trend: "up",
    description: "From ISS experiments and lunar studies",
  },
  {
    icon: FileText,
    value: "45K+",
    label: "Research Publications",
    change: "+8%",
    trend: "up",
    description: "Peer-reviewed space biology papers",
  },
  {
    icon: Users,
    value: "3.2K+",
    label: "NASA Researchers",
    change: "+15%",
    trend: "up",
    description: "Scientists studying space effects",
  },
  {
    icon: Satellite,
    value: "120+",
    label: "Active Missions",
    change: "+5%",
    trend: "up",
    description: "ISS, Artemis, and Mars preparation",
  },
];

export default function StatsCards() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          📈 Space Biology Research Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-slate-600 font-medium mb-2">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Educational Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 italic">
            💡 <strong>Student Insight:</strong> This data helps us understand
            how living organisms adapt to space environments
          </p>
        </div>
      </div>
    </div>
  );
}
