// components/ResearchCategories.tsx
import { useNavigate } from "react-router-dom";

export default function ResearchCategories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Plant Growth",
      icon: "🌱",
      description: "Space agriculture and plant adaptation",
      studies: "1,234 studies",
      query: "plant growth",
    },
    {
      name: "Microbiome",
      icon: "🦠",
      description: "Astronaut and environmental microbes",
      studies: "876 studies",
      query: "microbiome",
    },
    {
      name: "Radiation",
      icon: "☢️",
      description: "Cosmic radiation effects and protection",
      studies: "1,045 studies",
      query: "radiation",
    },
    {
      name: "Gravity Effects",
      icon: "🌌",
      description: "Microgravity impact on biology",
      studies: "2,145 studies",
      query: "microgravity",
    },
  ];

  const handleCategoryClick = (query: string) => {
    navigate("/research", {
      state: { searchQuery: query },
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            🔬 Research Categories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            NASA Research Areas - Click any category to explore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.query)}
              className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600">
                {category.name}
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                {category.description}
              </p>
              <p className="text-blue-600 font-semibold text-sm">
                {category.studies}
              </p>
              <div className="mt-3 text-blue-500 text-sm font-medium">
                Explore research →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
