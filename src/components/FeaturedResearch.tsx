import { Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const researchItems = [
  {
    id: "plant-growth",
    title: "Effects of Microgravity on Plant Growth",
    description:
      "Comprehensive study on Arabidopsis thaliana growth patterns in ISS environment",
    author: "Dr. Sarah Chen",
    date: "2024-03-15",
    category: "Botany",
  },
  {
    id: "radiation-shielding",
    title: "Radiation Shielding for Mars Missions",
    description:
      "Advanced materials testing for cosmic radiation protection during long-duration missions",
    author: "Dr. Michael Rodriguez",
    date: "2024-03-10",
    category: "Biophysics",
  },
  {
    id: "human-microbiome",
    title: "Human Microbiome in Space",
    description:
      "Longitudinal study of astronaut microbiome changes during 12-month ISS mission",
    author: "Dr. Emily Watson",
    date: "2024-03-05",
    category: "Microbiology",
  },
];

export default function FeaturedResearch() {
  const navigate = useNavigate();

  const handleViewAllResearch = () => {
    navigate("/research"); // Changed from "/all-research" to "/research"
  };

  const handleResearchCardClick = (researchId: string) => {
    navigate(`/research/${researchId}`);
  };

  return (
    <div id="research" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Featured NASA Research
          </h2>
          <button
            onClick={handleViewAllResearch}
            className="flex items-center text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition-colors hover:scale-105 bg-white px-4 py-2 rounded-lg border border-slate-200"
          >
            View All Research
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-blue-300 hover:scale-105"
              onClick={() => handleResearchCardClick(item.id)}
            >
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {item.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 bg-green-50 p-4 rounded-lg border border-green-200">
            🎓 <strong>Student Built:</strong> Click any research card to see
            detailed analysis pages!
          </p>
        </div>
      </div>
    </div>
  );
}
