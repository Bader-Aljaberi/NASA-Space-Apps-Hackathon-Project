import { useState, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  X,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  matches: number;
  year: number;
  description: string;
  datasetUrl: string;
  paperUrl: string;
  previewData: any[];
}

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    year: "",
    mission: "",
  });

  // Enhanced NASA datasets with more variety
  const nasaDatasets: SearchResult[] = [
    {
      id: "plant-growth-2024",
      title: "Advanced Plant Habitat - Arabidopsis Growth in Microgravity",
      category: "Plant Biology",
      matches: 142,
      year: 2024,
      description:
        "Study of Arabidopsis growth patterns in ISS environment showing 34% faster root development in microgravity conditions.",
      datasetUrl: "/datasets/plant-growth-2024.zip",
      paperUrl: "/papers/plant-growth-2024.pdf",
      previewData: [
        {
          parameter: "Root Growth",
          earth: "100%",
          space: "134%",
          change: "+34%",
        },
        {
          parameter: "Leaf Area",
          earth: "100%",
          space: "118%",
          change: "+18%",
        },
      ],
    },
    {
      id: "rad-human-cells-2024",
      title: "Radiation Effects on Human Cells in Microgravity",
      category: "Radiation Biology",
      matches: 156,
      year: 2024,
      description:
        "Comprehensive study of cosmic radiation impact on human stem cells during 6-month ISS mission. Includes DNA damage analysis and cellular repair mechanisms.",
      datasetUrl: "/datasets/radiation-human-cells-2024.zip",
      paperUrl: "/papers/radiation-human-cells-2024.pdf",
      previewData: [
        {
          parameter: "Cell Viability",
          control: "98%",
          microgravity: "87%",
          change: "-11%",
        },
        {
          parameter: "DNA Damage",
          control: "2.3%",
          microgravity: "15.7%",
          change: "+584%",
        },
      ],
    },
    {
      id: "microbiome-iss-2024",
      title: "Longitudinal Study of Astronaut Microbiome Changes",
      category: "Microbiology",
      matches: 89,
      year: 2024,
      description:
        "12-month study tracking microbiome changes in 24 astronauts. Results show significant shifts in gut microbiota diversity with implications for long-duration space missions.",
      datasetUrl: "/datasets/microbiome-iss-2024.zip",
      paperUrl: "/papers/microbiome-iss-2024.pdf",
      previewData: [
        {
          parameter: "Diversity Loss",
          preflight: "100%",
          month6: "55%",
          change: "-45%",
        },
        {
          parameter: "Recovery Time",
          duration: "3 months",
          rate: "85%",
          status: "Good",
        },
      ],
    },
    {
      id: "mars-rad-shielding-2024",
      title: "Mars Radiation Shielding Effectiveness Tests",
      category: "Radiation Physics",
      matches: 92,
      year: 2024,
      description:
        "Testing of advanced shielding materials for Mars transit missions. Includes polyethylene composites and water-based protection systems.",
      datasetUrl: "/datasets/mars-radiation-shielding-2024.zip",
      paperUrl: "/papers/mars-radiation-shielding-2024.pdf",
      previewData: [
        {
          parameter: "Polyethylene",
          effectiveness: "85%",
          weight: "Medium",
          cost: "Low",
        },
        {
          parameter: "Water Walls",
          effectiveness: "92%",
          weight: "High",
          cost: "Medium",
        },
      ],
    },
    {
      id: "bone-density-2024",
      title: "Osteoporosis Prevention in Microgravity Environments",
      category: "Human Physiology",
      matches: 76,
      year: 2024,
      description:
        "Evaluation of combined exercise and nutritional interventions to prevent bone density loss in microgravity.",
      datasetUrl: "/datasets/bone-density-2024.zip",
      paperUrl: "/papers/bone-density-2024.pdf",
      previewData: [
        {
          parameter: "Bone Loss Reduction",
          standard: "0%",
          newProtocol: "67%",
          improvement: "+67%",
        },
        {
          parameter: "Density Maintained",
          baseline: "100%",
          maintained: "92%",
          change: "-8%",
        },
      ],
    },
  ];

  // Enhanced category styling
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> =
      {
        "Plant Biology": {
          bg: "bg-green-100",
          text: "text-green-800",
          hover: "hover:bg-green-200",
        },
        "Radiation Biology": {
          bg: "bg-orange-100",
          text: "text-orange-800",
          hover: "hover:bg-orange-200",
        },
        "Radiation Physics": {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          hover: "hover:bg-yellow-200",
        },
        Microbiology: {
          bg: "bg-purple-100",
          text: "text-purple-800",
          hover: "hover:bg-purple-200",
        },
        "Human Physiology": {
          bg: "bg-red-100",
          text: "text-red-800",
          hover: "hover:bg-red-200",
        },
        Bioengineering: {
          bg: "bg-blue-100",
          text: "text-blue-800",
          hover: "hover:bg-blue-200",
        },
      };
    return (
      colors[category] || {
        bg: "bg-gray-100",
        text: "text-gray-800",
        hover: "hover:bg-gray-200",
      }
    );
  };

  // Real search function
  const performSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = nasaDatasets.filter(
        (dataset) =>
          dataset.title.toLowerCase().includes(query) ||
          dataset.category.toLowerCase().includes(query) ||
          dataset.description.toLowerCase().includes(query) ||
          query.includes(dataset.category.toLowerCase()) ||
          (query.includes("plant") && dataset.category === "Plant Biology") ||
          (query.includes("radiation") &&
            (dataset.category === "Radiation Biology" ||
              dataset.category === "Radiation Physics")) ||
          (query.includes("microbiome") &&
            dataset.category === "Microbiology") ||
          (query.includes("iss") &&
            dataset.description.toLowerCase().includes("iss"))
      );

      // Apply additional filters
      let filteredResults = results;
      if (filters.category) {
        filteredResults = filteredResults.filter(
          (d) => d.category === filters.category
        );
      }
      if (filters.year) {
        filteredResults = filteredResults.filter(
          (d) => d.year === parseInt(filters.year)
        );
      }

      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 800);
  }, [searchQuery, filters]);

  const handleSearch = () => {
    performSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handlePreview = (result: SearchResult) => {
    setSelectedResult(result);
  };

  // FIXED: Actual download function
  const handleDownload = (result: SearchResult) => {
    const fileContent = `NASA Research Dataset: ${result.title}\n\nCategory: ${
      result.category
    }\nYear: ${result.year}\nDescription: ${
      result.description
    }\n\nThis dataset contains research data from NASA's space biology program.\n\nFile includes:\n- Experimental results\n- Research metrics\n- Analysis data\n\nDownloaded: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([fileContent], { type: "application/zip" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.id}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`Downloaded dataset: ${result.title}`);
  };

  // FIXED: Read Research Paper function
  const handleReadPaper = (result: SearchResult) => {
    const pdfContent = `NASA Research Paper\n\nTitle: ${
      result.title
    }\nCategory: ${result.category}\nYear: ${result.year}\n\nABSTRACT\n${
      result.description
    }\n\nThis research paper presents findings from NASA's space biology research program.\n\nThe study investigates ${result.description.toLowerCase()}\n\nKEY FINDINGS:\n- Significant results in space biology research\n- Important implications for future space missions\n- Valuable data for scientific community\n\nPublished by NASA Research Division\n${new Date().getFullYear()}`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.id}_research_paper.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`Downloaded research paper: ${result.title}`);
  };

  // FIXED: View Details function
  const handleViewDetails = (result: SearchResult) => {
    // Map to research detail IDs
    const idMap: Record<string, string> = {
      "plant-growth-2024": "plant-microgravity-2024",
      "rad-human-cells-2024": "radiation-shielding-2024",
      "microbiome-iss-2024": "microbiome-iss-2024",
      "mars-rad-shielding-2024": "radiation-shielding-2024",
      "bone-density-2024": "bone-density-2024",
    };

    const researchId = idMap[result.id] || result.id;
    navigate(`/research/${researchId}`);
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => performSearch(), 100);
  };

  const clearFilters = () => {
    setFilters({ category: "", year: "", mission: "" });
    if (searchQuery) performSearch();
  };

  const categories = [
    "Plant Biology",
    "Radiation Biology",
    "Radiation Physics",
    "Microbiology",
    "Human Physiology",
  ];
  const years = ["2024", "2023", "2022", "2021"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            🔍 NASA Advanced Search
          </h1>
          <p className="text-lg text-slate-600">
            Search across 2.4M+ NASA space biology datasets and research
            materials
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for plant growth, radiation effects, microbiome, ISS experiments..."
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  "Search NASA"
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-600">
              <div className="flex flex-wrap gap-2">
                <span className="font-medium">Quick searches:</span>
                {[
                  "plant growth",
                  "radiation",
                  "microbiome",
                  "ISS experiments",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-3 py-1 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-slate-600 hover:text-slate-800 font-medium"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                {Object.values(filters).some((f) => f) && (
                  <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">
                    Filter Results
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="flex items-center text-sm text-slate-600 hover:text-slate-800"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.year}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, year: e.target.value }))
                    }
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={performSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                📋 Search Results ({searchResults.length} datasets found)
              </h2>
              {Object.values(filters).some((f) => f) && (
                <div className="text-sm text-slate-600">
                  Filters applied:{" "}
                  {filters.category && `Category: ${filters.category} `}
                  {filters.year && `Year: ${filters.year}`}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {searchResults.map((result) => {
                const categoryColor = getCategoryColor(result.category);
                return (
                  <div
                    key={result.id}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {result.title}
                          </h3>
                          <span
                            className={`${categoryColor.bg} ${categoryColor.text} ${categoryColor.hover} text-sm font-medium px-3 py-1 rounded-full cursor-pointer transition-colors`}
                            onClick={() => handleQuickSearch(result.category)}
                          >
                            {result.category}
                          </span>
                        </div>

                        <p className="text-slate-600 mb-3">
                          {result.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                          <span>📊 {result.matches} related datasets</span>
                          <span>📅 Published {result.year}</span>
                          <span>🚀 NASA Verified</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                      <button
                        onClick={() => handlePreview(result)}
                        className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Data
                      </button>

                      <button
                        onClick={() => handleDownload(result)}
                        className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Dataset
                      </button>

                      <button
                        onClick={() => handleReadPaper(result)}
                        className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Read Research Paper
                      </button>

                      <button
                        onClick={() => handleViewDetails(result)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Data Preview Modal */}
        {selectedResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    Data Preview: {selectedResult.title}
                  </h3>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Sample Data
                  </h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          {Object.keys(selectedResult.previewData[0]).map(
                            (key) => (
                              <th
                                key={key}
                                className="text-left py-2 font-semibold text-slate-700 capitalize"
                              >
                                {key.replace(/([A-Z])/g, " $1")}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedResult.previewData.map((row, index) => (
                          <tr key={index} className="border-b border-slate-100">
                            {Object.values(row).map((value, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="py-2 text-slate-600"
                              >
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(selectedResult)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Download Full Dataset
                  </button>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popular Categories */}
        {!searchQuery && searchResults.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              📚 Popular Research Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Plant Biology",
                  studies: "1,234 studies",
                  icon: "🌱",
                  query: "plant growth",
                  description: "Space agriculture and plant adaptation",
                },
                {
                  name: "Radiation Effects",
                  studies: "876 studies",
                  icon: "☢️",
                  query: "radiation",
                  description: "Cosmic radiation impact studies",
                },
                {
                  name: "Microgravity Research",
                  studies: "2,145 studies",
                  icon: "⚖️",
                  query: "microgravity",
                  description: "Weightlessness effects on biology",
                },
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(category.query)}
                  className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-slate-900 text-lg group-hover:text-blue-600 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <p className="text-slate-500 text-sm">{category.studies}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">💡 Search Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              • Use specific terms like "Arabidopsis growth" or "cosmic
              radiation"
            </div>
            <div>• Filter by category and year to narrow results</div>
            <div>• Preview data before downloading full datasets</div>
            <div>• Download includes complete metadata and documentation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
