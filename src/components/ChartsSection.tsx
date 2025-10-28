import { useState } from "react";

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState("missions");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Mission Success Chart Data
  const MissionSuccessChart = () => {
    const missionData = [
      { name: "ISS", success: 95, missions: 45 },
      { name: "Artemis", success: 92, missions: 12 },
      { name: "Mars Prep", success: 88, missions: 8 },
      { name: "Lunar", success: 90, missions: 15 },
      { name: "Tech Demo", success: 85, missions: 25 },
    ];

    return (
      <div className="h-80 flex flex-col">
        <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">
          NASA Mission Success Rates
        </h4>
        <div className="flex items-end justify-center gap-4 px-4 flex-1 border-b-2 border-l-2 border-slate-300 pb-6 ml-6">
          {missionData.map((mission, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-14 rounded-t-xl bg-gradient-to-t from-blue-500 to-blue-700 transition-all hover:opacity-90 cursor-pointer shadow-lg"
                style={{ height: `${mission.success * 2}px` }}
                title={`${mission.name}: ${mission.success}% success`}
              >
                <div className="text-white text-center text-xs font-bold pt-2">
                  {mission.success}%
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 mt-3">
                {mission.name}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                {mission.missions} missions
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Research Growth Chart Data
  const ResearchGrowthChart = () => {
    const researchData = [45, 60, 75, 85, 92];
    const years = ["2020", "2021", "2022", "2023", "2024"];

    return (
      <div className="h-80 flex flex-col">
        <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">
          Research Publications Growth
        </h4>
        <div className="flex items-end justify-center gap-4 px-4 flex-1 border-b-2 border-l-2 border-slate-300 pb-6 ml-6">
          {researchData.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-14 rounded-t-xl bg-gradient-to-t from-green-500 to-green-700 transition-all hover:opacity-90 cursor-pointer shadow-lg"
                style={{ height: `${value * 2}px` }}
                title={`${years[index]}: ${value}% growth`}
              >
                <div className="text-white text-center text-xs font-bold pt-2">
                  {value}%
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 mt-3">
                {years[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      alert(
        `🔍 Exploring NASA ${category} Research\n\nThis would show detailed studies and datasets about ${category}.`
      );
    }, 100);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          📊 NASA Mission Analytics
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 rounded-xl p-2">
            <button
              onClick={() => setActiveTab("missions")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "missions"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🚀 Mission Success
            </button>
            <button
              onClick={() => setActiveTab("research")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "research"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📈 Research Growth
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Section */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                {activeTab === "missions"
                  ? "Mission Success Rates"
                  : "Research Growth"}
              </h3>
            </div>

            <div className="h-80 bg-white rounded-xl border border-slate-200 p-6">
              {activeTab === "missions" ? (
                <MissionSuccessChart />
              ) : (
                <ResearchGrowthChart />
              )}
            </div>
          </div>

          {/* Research Categories */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Research Categories
            </h3>

            <div className="h-80 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-slate-800 mb-2">
                  NASA Research Areas
                </h4>
                <p className="text-slate-600">Click any category to explore</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Plant Growth",
                  "Microbiome",
                  "Radiation",
                  "Gravity Effects",
                ].map((category, index) => (
                  <button
                    key={index}
                    className="p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Selected: <strong>{selectedCategory}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
