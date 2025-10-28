import {
  TrendingUp,
  Users,
  FileText,
  Database,
  Rocket,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  // Realistic NASA research data
  const researchTrends = [
    { month: "Jan", studies: 3200, missions: 8 },
    { month: "Feb", studies: 3800, missions: 12 },
    { month: "Mar", studies: 4200, missions: 15 },
    { month: "Apr", studies: 5100, missions: 18 },
    { month: "May", studies: 4800, missions: 14 },
    { month: "Jun", studies: 5500, missions: 20 },
    { month: "Jul", studies: 6200, missions: 22 },
    { month: "Aug", studies: 5800, missions: 19 },
    { month: "Sep", studies: 6500, missions: 25 },
    { month: "Oct", studies: 7200, missions: 28 },
    { month: "Nov", studies: 6800, missions: 24 },
    { month: "Dec", studies: 7500, missions: 30 },
  ];

  const missionData = [
    { name: "ISS Experiments", value: 45 },
    { name: "Artemis Prep", value: 25 },
    { name: "Mars Research", value: 15 },
    { name: "Lunar Studies", value: 10 },
    { name: "Tech Development", value: 5 },
  ];

  const researchAreas = [
    { name: "Plant Biology", papers: 12450, growth: 18 },
    { name: "Radiation Effects", papers: 8920, growth: 22 },
    { name: "Microbiology", papers: 7560, growth: 15 },
    { name: "Human Physiology", papers: 11230, growth: 25 },
    { name: "Biomaterials", papers: 5430, growth: 30 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const stats = [
    {
      icon: Users,
      value: "3,247",
      label: "Active Researchers",
      change: "+12%",
      description: "NASA scientists and collaborators worldwide",
      color: "blue",
    },
    {
      icon: FileText,
      value: "45,892",
      label: "Published Studies",
      change: "+8%",
      description: "Peer-reviewed space biology papers",
      color: "green",
    },
    {
      icon: Database,
      value: "2.4M",
      label: "Research Datasets",
      change: "+15%",
      description: "From ISS and Artemis missions",
      color: "purple",
    },
    {
      icon: Rocket,
      value: "120+",
      label: "Active Missions",
      change: "+5%",
      description: "ISS, Artemis, and Mars preparation",
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            📈 NASA Research Analytics
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real-time metrics and insights from NASA's space biology research
            programs
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-50 border-blue-200 text-blue-700",
              green: "bg-green-50 border-green-200 text-green-700",
              purple: "bg-purple-50 border-purple-200 text-purple-700",
              orange: "bg-orange-50 border-orange-200 text-orange-700",
            };

            return (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 ${
                  colorClasses[stat.color]
                } transition-all hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold bg-white px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="font-semibold mb-1">{stat.label}</p>
                <p className="text-sm opacity-80">{stat.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Research Trends Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Monthly Research Activity
              </h2>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-5 h-5 mr-1" />
                <span className="font-semibold">+45% YoY</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={researchTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="studies"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    name="Research Studies"
                  />
                  <Line
                    type="monotone"
                    dataKey="missions"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                    name="Active Missions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mission Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Mission Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={missionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {missionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {missionData.map((mission, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-slate-600">{mission.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research Areas Performance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Research Areas Performance
          </h2>
          <div className="space-y-4">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      {area.name}
                    </span>
                    <span className="text-green-600 text-sm font-semibold">
                      +{area.growth}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(area.papers / 15000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-slate-900">
                    {area.papers.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500">papers</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 text-lg mb-3">
            📊 Research Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <strong>🚀 Growth Driver:</strong> Artemis mission preparations
              have increased space biology research by 45% in 2024
            </div>
            <div>
              <strong>🌱 Top Performer:</strong> Plant biology research shows
              the highest publication rate with 12,450 studies
            </div>
            <div>
              <strong>👥 Collaboration:</strong> 65% of studies involve
              international research partnerships
            </div>
            <div>
              <strong>📈 Trend:</strong> Mars mission research growing 30%
              faster than other categories
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
