// pages/AllResearch.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Calendar,
  User,
  ArrowRight,
  Download,
  Share2,
  Eye,
} from "lucide-react";

interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  abstract: string;
  mission: string;
  citations: number;
  downloadUrl: string;
  fullDescription?: string;
  datasets?: string[];
  verified?: boolean;
  relatedDatasets?: number;
}

export default function AllResearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([]);
  const [selectedResearch, setSelectedResearch] = useState<string | null>(null);
  const [viewDetails, setViewDetails] = useState<ResearchPaper | null>(null);

  // Enhanced category styling with better colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> =
      {
        "Plant Biology": {
          bg: "bg-green-100",
          text: "text-green-800",
          hover: "hover:bg-green-200",
        },
        "Radiation Physics": {
          bg: "bg-orange-100",
          text: "text-orange-800",
          hover: "hover:bg-orange-200",
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
        "Radiation Biology": {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          hover: "hover:bg-yellow-200",
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

  // Enhanced NASA research data with more details
  const nasaResearch: ResearchPaper[] = [
    {
      id: "plant-microgravity-2024",
      title: "Arabidopsis Thaliana Growth Patterns in Microgravity",
      author: "Dr. Sarah Chen, NASA Plant Biology Division",
      date: "2024-03-15",
      category: "Plant Biology",
      abstract:
        "Comprehensive analysis of Arabidopsis growth in ISS environment showing 34% faster root development and altered gene expression in microgravity conditions.",
      fullDescription:
        "Comprehensive analysis of Arabidopsis growth in ISS environment showing 34% faster root development and altered gene expression in microgravity conditions. Study conducted over 6 months aboard International Space Station with detailed genomic analysis.",
      mission: "ISS Expedition 68",
      citations: 42,
      downloadUrl: "/datasets/plant-growth-iss-2024.zip",
      datasets: ["arabidopsis-growth-2024.csv", "genetic-data-2024.xlsx"],
      verified: true,
      relatedDatasets: 89,
    },
    {
      id: "radiation-shielding-2024",
      title: "Advanced Radiation Shielding Materials for Mars Transit",
      author: "Dr. Michael Rodriguez, Space Radiation Laboratory",
      date: "2024-03-10",
      category: "Radiation Physics",
      abstract:
        "Testing of novel polyethylene-based composites for cosmic radiation protection during 18-month Mars missions.",
      fullDescription:
        "This study evaluates novel composite materials for radiation shielding in deep space missions. Testing was conducted on the ISS and through ground-based simulations, showing 40% improvement in radiation protection compared to traditional materials.",
      mission: "Artemis Preparation",
      citations: 31,
      downloadUrl: "/datasets/radiation-shielding-2024.zip",
      datasets: ["radiation-metrics-2024.json", "material-tests-2024.csv"],
      verified: true,
      relatedDatasets: 167,
    },
    {
      id: "microbiome-iss-2024",
      title: "Longitudinal Study of Astronaut Microbiome Changes",
      author: "Dr. Emily Watson, NASA Microbiology Research",
      date: "2024-03-05",
      category: "Microbiology",
      abstract:
        "12-month study tracking microbiome changes in 24 astronauts. Results show significant shifts in gut microbiota diversity.",
      fullDescription:
        "This research provides a detailed analysis of microbial ecosystems aboard the International Space Station. The study monitored bacterial and fungal populations across different modules over a 12-month period, revealing significant adaptations in microgravity environments.",
      mission: "ISS Expedition 67/68",
      citations: 28,
      downloadUrl: "/datasets/microbiome-iss-2024.zip",
      datasets: ["microbiome-iss-2024.csv"],
      verified: true,
      relatedDatasets: 142,
    },
    {
      id: "bone-density-2024",
      title: "Osteoporosis Prevention in Microgravity Environments",
      author: "Dr. James Park, Space Medicine Institute",
      date: "2024-02-28",
      category: "Human Physiology",
      abstract:
        "Evaluation of combined exercise and nutritional interventions to prevent bone density loss.",
      fullDescription:
        "Evaluation of combined exercise and nutritional interventions to prevent bone density loss. New protocol reduces bone loss by 67% compared to standard countermeasures. Study conducted with 16 astronauts using DEXA scans and blood markers.",
      mission: "ISS Health Monitoring",
      citations: 19,
      downloadUrl: "/datasets/bone-density-2024.zip",
      datasets: ["bone_scans.csv", "exercise_logs.json", "blood_tests.zip"],
      verified: true,
      relatedDatasets: 56,
    },
    {
      id: "algae-oxygen-2024",
      title: "Algae-Based Oxygen Generation for Life Support",
      author: "Dr. Maria Gonzalez, Bioengineering Division",
      date: "2024-02-20",
      category: "Bioengineering",
      abstract:
        "Development of Chlorella vulgaris bioreactors for continuous oxygen production.",
      fullDescription:
        "Development of Chlorella vulgaris bioreactors for continuous oxygen production. System achieves 89% efficiency in closed-loop environment simulations. Essential technology for long-duration space missions and Mars colonization.",
      mission: "Lunar Base Preparation",
      citations: 23,
      downloadUrl: "/datasets/algae-oxygen-2024.zip",
      datasets: ["algae_growth.csv", "oxygen_production.json"],
      verified: true,
      relatedDatasets: 78,
    },
    {
      id: "dna-repair-2024",
      title: "DNA Repair Mechanisms in Space Radiation Environment",
      author: "Dr. Robert Kim, Space Genetics Laboratory",
      date: "2024-02-15",
      category: "Radiation Biology",
      abstract:
        "Investigation of cellular DNA repair pathways under cosmic radiation exposure.",
      fullDescription:
        "Investigation of cellular DNA repair pathways under cosmic radiation exposure. Identifies enhanced repair mechanisms in microgravity conditions. Study provides insights for radiation protection and cancer research.",
      mission: "ISS Genetic Research",
      citations: 35,
      downloadUrl: "/datasets/dna-repair-2024.zip",
      datasets: ["dna_sequences.fasta", "repair_analysis.csv"],
      verified: true,
      relatedDatasets: 112,
    },
  ];

  // Filter papers based on search and category
  useEffect(() => {
    let results = nasaResearch;

    if (searchQuery) {
      results = results.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.mission.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      results = results.filter((paper) => paper.category === selectedCategory);
    }

    setFilteredPapers(results);
  }, [searchQuery, selectedCategory]);

  // Handle category filter from navigation
  useEffect(() => {
    if (location.state?.filter) {
      const filterMap: Record<string, string> = {
        "plant-biology": "Plant Biology",
        "radiation-effects": "Radiation Physics",
        microbiology: "Microbiology",
        "human-physiology": "Human Physiology",
        bioengineering: "Bioengineering",
        "radiation-biology": "Radiation Biology",
      };
      setSelectedCategory(filterMap[location.state.filter] || "all");
    }

    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  // Function to handle category clicks
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const categories = [
    "all",
    "Plant Biology",
    "Radiation Physics",
    "Microbiology",
    "Human Physiology",
    "Bioengineering",
    "Radiation Biology",
  ];

  // Enhanced download function
  const handleDownload = (paper: ResearchPaper) => {
    const pdfContent = `NASA RESEARCH PAPER

Title: ${paper.title}
Category: ${paper.category}
Author: ${paper.author}
Publication Date: ${paper.date}
Mission: ${paper.mission}
Citations: ${paper.citations}

ABSTRACT
${paper.abstract}

RESEARCH OVERVIEW
${paper.fullDescription}

KEY FINDINGS:
• Significant advancements in ${paper.category.toLowerCase()} research
• Practical applications for space exploration
• Contributions to scientific knowledge

METHODOLOGY:
The study employed rigorous scientific methods including controlled experiments, data analysis, and peer review processes standard in NASA research protocols.

CONCLUSION:
This research represents an important contribution to space biology and has implications for both space exploration and terrestrial applications.

Published by NASA Research Division
Official Document - For Research and Educational Purposes
Download Date: ${new Date().toLocaleDateString()}

---
NASA Space Biology Program
Advancing scientific discovery for space exploration and life on Earth
    `;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${paper.id}_research_paper.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download dataset function
  const downloadDataset = async (datasetFile: string, paperTitle: string) => {
    try {
      let content = "";
      let mimeType = "text/plain";

      if (datasetFile.includes(".csv")) {
        content = "sample,data,values\nmicrobiome,iss,2024\nplant,growth,data";
        mimeType = "text/csv";
      } else if (datasetFile.includes(".json")) {
        content = JSON.stringify(
          {
            sample: "data",
            mission: "ISS",
            year: 2024,
            data: [1, 2, 3, 4, 5],
          },
          null,
          2
        );
        mimeType = "application/json";
      } else if (
        datasetFile.includes(".xlsx") ||
        datasetFile.includes(".zip")
      ) {
        content = "sample,data,values\nmicrobiome,iss,2024\nplant,growth,data";
        mimeType = "application/zip";
      } else if (datasetFile.includes(".fasta")) {
        content = ">sample_sequence\nATCGATCGATCG";
        mimeType = "text/plain";
      } else {
        content = `Sample data for ${datasetFile}`;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = datasetFile;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert("Error downloading file. Please try again.");
    }
  };

  const handleShare = (paperTitle: string, paperId: string) => {
    if (navigator.share) {
      navigator.share({
        title: paperTitle,
        text: `Check out this NASA research paper: ${paperTitle}`,
        url: `${window.location.origin}/research/${paperId}`,
      });
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/research/${paperId}`
      );
      alert("Research paper link copied to clipboard!");
    }
  };

  const showResearchDetails = (paper: ResearchPaper) => {
    setViewDetails(paper);
  };

  const closeDetails = () => {
    setViewDetails(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            NASA Research Library
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Access peer-reviewed research papers from NASA's space biology
            programs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research papers by title, author, or topic..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>
              Showing {filteredPapers.length} of {nasaResearch.length} research
              papers
            </span>
            {(selectedCategory !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Research Papers */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => {
            const categoryColor = getCategoryColor(paper.category);
            return (
              <div
                key={paper.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        onClick={() => handleCategoryClick(paper.category)}
                        className={`${categoryColor.bg} ${categoryColor.text} ${categoryColor.hover} text-sm font-medium px-3 py-1 rounded-full cursor-pointer transition-colors`}
                      >
                        {paper.category}
                      </span>
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {paper.mission}
                      </span>
                      <span className="text-sm text-slate-500">
                        📚 {paper.citations} citations
                      </span>
                      {paper.verified && (
                        <span className="text-green-600 text-sm font-medium">
                          ✅ NASA Verified
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {paper.title}
                    </h3>

                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {selectedResearch === paper.id
                        ? paper.fullDescription
                        : paper.abstract}
                    </p>

                    {selectedResearch === paper.id && paper.datasets && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-3">
                          Available Datasets:
                        </h4>
                        <div className="space-y-2">
                          {paper.datasets.map((dataset, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-2"
                            >
                              <span className="text-sm text-slate-600 font-mono">
                                {dataset}
                              </span>
                              <button
                                onClick={() =>
                                  downloadDataset(dataset, paper.title)
                                }
                                className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
                              >
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {paper.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(paper.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {paper.relatedDatasets && (
                      <div className="flex items-center">
                        <span className="mr-2">📊</span>
                        {paper.relatedDatasets} related datasets
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() =>
                        setSelectedResearch(
                          selectedResearch === paper.id ? null : paper.id
                        )
                      }
                      className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {selectedResearch === paper.id
                        ? "Show Less"
                        : "Preview Data"}
                    </button>

                    <button
                      onClick={() => handleDownload(paper)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>

                    <button
                      onClick={() => handleShare(paper.title, paper.id)}
                      className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>

                    <button
                      onClick={() => showResearchDetails(paper)}
                      className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                    >
                      View Details
                    </button>

                    <Link
                      to={`/research/${paper.id}`}
                      className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No research papers found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Research Stats */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 text-lg mb-3">
            📊 Research Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-700">
            <div>
              <strong>Total Papers:</strong> {nasaResearch.length}
            </div>
            <div>
              <strong>Active Missions:</strong> 6
            </div>
            <div>
              <strong>Research Areas:</strong> 6
            </div>
            <div>
              <strong>Avg. Citations:</strong>{" "}
              {Math.round(
                nasaResearch.reduce((acc, paper) => acc + paper.citations, 0) /
                  nasaResearch.length
              )}
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-4">
            🔬 Browse by Research Area
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => {
                const color = getCategoryColor(category);
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`${color.bg} ${color.text} ${color.hover} px-4 py-2 rounded-lg font-medium transition-colors`}
                  >
                    {category}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Research Details Modal */}
      {viewDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-slate-900">
                  {viewDetails.title}
                </h2>
                <button
                  onClick={closeDetails}
                  className="text-slate-500 hover:text-slate-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 text-xl mb-3">
                    Research Details
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {viewDetails.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900">Author</h4>
                    <p className="text-slate-600">{viewDetails.author}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Mission</h4>
                    <p className="text-slate-600">{viewDetails.mission}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Publication Date
                    </h4>
                    <p className="text-slate-600">{viewDetails.date}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Citations</h4>
                    <p className="text-slate-600">{viewDetails.citations}</p>
                  </div>
                </div>

                {viewDetails.datasets && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">
                      Available Datasets
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {viewDetails.datasets.map((dataset, index) => (
                        <li key={index} className="font-mono text-sm">
                          {dataset}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 pt-6">
                  <button
                    onClick={() => handleDownload(viewDetails)}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Research Paper
                  </button>
                  <button
                    onClick={() => navigate(`/research/${viewDetails.id}`)}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
