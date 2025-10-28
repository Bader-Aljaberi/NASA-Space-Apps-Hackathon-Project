// pages/ResearchDetail.tsx - COMPLETE FIXED VERSION
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Share2,
  Calendar,
  User,
  FileText,
  BarChart3,
  ExternalLink,
} from "lucide-react";

// Enhanced NASA research data with ALL missing entries
const researchData = {
  "plant-microgravity-2024": {
    id: "plant-microgravity-2024",
    title: "Arabidopsis Thaliana Growth Patterns in Microgravity",
    author: "Dr. Sarah Chen, NASA Plant Biology Division",
    date: "March 15, 2024",
    category: "Plant Biology",
    mission: "ISS Expedition 68",
    citations: 42,
    abstract:
      "Comprehensive analysis of Arabidopsis growth in ISS environment showing 34% faster root development and altered gene expression in microgravity conditions.",
    fullDescription:
      "This groundbreaking research investigated the growth patterns of Arabidopsis thaliana in microgravity conditions aboard the International Space Station. The study revealed a 34% acceleration in root development and significant alterations in gene expression related to plant growth and stress response. These findings have profound implications for sustainable food production during long-duration space missions.",
    findings: [
      "34% faster root development in microgravity",
      "Altered expression in 287 genes related to growth",
      "Improved nutrient uptake efficiency",
      "Enhanced stress response mechanisms",
      "Potential for optimized space agriculture",
    ],
    methodology:
      "6-month study using Advanced Plant Habitat with real-time monitoring, genomic analysis, and controlled environmental conditions. RNA sequencing and proteomic analysis were conducted.",
    implications:
      "Critical for developing sustainable food production systems for Mars missions and lunar bases. Applications in terrestrial agriculture for stress-resistant crops.",
    datasets: [
      {
        name: "growth_metrics.csv",
        size: "8.7 MB",
        type: "CSV",
        url: "/datasets/plant/growth.csv",
      },
      {
        name: "genetic_data.json",
        size: "15.2 MB",
        type: "JSON",
        url: "/datasets/plant/genetics.json",
      },
      {
        name: "environmental_logs.zip",
        size: "6.8 MB",
        type: "ZIP",
        url: "/datasets/plant/environment.zip",
      },
    ],
    relatedResearch: ["algae-oxygen-2024", "wheat-growth-2024"],
  },
  "radiation-shielding-2024": {
    id: "radiation-shielding-2024",
    title: "Advanced Radiation Shielding Materials for Mars Transit",
    author: "Dr. Michael Rodriguez, Space Radiation Laboratory",
    date: "March 10, 2024",
    category: "Radiation Physics",
    mission: "Artemis Preparation",
    citations: 31,
    abstract:
      "Testing of novel polyethylene-based composites for cosmic radiation protection during 18-month Mars missions.",
    fullDescription:
      "This study evaluates novel composite materials for radiation shielding in deep space missions. Testing was conducted on the ISS and through ground-based simulations, showing 40% improvement in radiation protection compared to traditional materials. The research focuses on developing lightweight, effective shielding for crewed missions to Mars.",
    findings: [
      "40% improvement in radiation protection",
      "Lightweight composite materials developed",
      "Enhanced durability in space conditions",
      "Cost-effective manufacturing process",
      "Compatible with existing spacecraft systems",
    ],
    methodology:
      "Material testing aboard ISS combined with ground-based radiation simulations. Advanced spectroscopy and particle detection techniques.",
    implications:
      "Essential for crew safety during Mars transit and long-duration space missions. Potential applications in medical radiation shielding.",
    datasets: [
      {
        name: "radiation_metrics.csv",
        size: "12.3 MB",
        type: "CSV",
        url: "/datasets/radiation/metrics.csv",
      },
      {
        name: "material_tests.json",
        size: "8.9 MB",
        type: "JSON",
        url: "/datasets/radiation/tests.json",
      },
      {
        name: "simulation_data.zip",
        size: "45.2 MB",
        type: "ZIP",
        url: "/datasets/radiation/simulations.zip",
      },
    ],
    relatedResearch: ["mars-rad-shielding-2024", "dna-repair-2024"],
  },
  "microbiome-iss-2024": {
    id: "microbiome-iss-2024",
    title: "Longitudinal Study of Astronaut Microbiome Changes",
    author: "Dr. Emily Watson, NASA Microbiology Research",
    date: "March 5, 2024",
    category: "Microbiology",
    mission: "ISS Expedition 67/68",
    citations: 28,
    abstract:
      "12-month study tracking microbiome changes in 24 astronauts. Results show significant shifts in gut microbiota diversity.",
    fullDescription:
      "This research provides a detailed analysis of microbial ecosystems aboard the International Space Station. The study monitored bacterial and fungal populations across different modules over a 12-month period, revealing significant adaptations in microgravity environments. The findings have implications for crew health and life support systems.",
    findings: [
      "45% reduction in gut microbiome diversity",
      "Shift towards stress-resistant microbial species",
      "Recovery period of 3-6 months post-mission",
      "Correlation with immune system changes",
      "Station environment shows unique microbial signature",
    ],
    methodology:
      "Longitudinal sampling of 24 astronauts over 12-month period. Metagenomic sequencing and microbial culture analysis.",
    implications:
      "Critical for understanding crew health during long missions. Informs probiotic and dietary interventions for space travelers.",
    datasets: [
      {
        name: "microbiome_samples.csv",
        size: "24.8 MB",
        type: "CSV",
        url: "/datasets/microbiome/samples.csv",
      },
      {
        name: "genetic_sequences.fasta",
        size: "156.7 MB",
        type: "FASTA",
        url: "/datasets/microbiome/sequences.fasta",
      },
      {
        name: "environmental_data.zip",
        size: "34.2 MB",
        type: "ZIP",
        url: "/datasets/microbiome/environment.zip",
      },
    ],
    relatedResearch: ["immune-system-2024", "nutrition-space-2024"],
  },
  "bone-density-2024": {
    id: "bone-density-2024",
    title: "Osteoporosis Prevention in Microgravity Environments",
    author: "Dr. James Park, Space Medicine Institute",
    date: "February 28, 2024",
    category: "Human Physiology",
    mission: "ISS Health Monitoring",
    citations: 19,
    abstract:
      "Evaluation of combined exercise and nutritional interventions to prevent bone density loss. New protocol reduces bone loss by 67% compared to standard countermeasures.",
    fullDescription:
      "This comprehensive study evaluated innovative approaches to combat bone density loss in microgravity environments. The research combined high-intensity resistance training with optimized nutritional supplements, resulting in a 67% reduction in bone loss compared to traditional countermeasures. The study involved 16 astronauts over 6-month periods aboard the International Space Station.",
    findings: [
      "67% reduction in bone density loss",
      "High-intensity exercise most effective",
      "Vitamin D and calcium supplementation critical",
      "92% of pre-flight bone density maintained",
      "Individualized programs improve outcomes",
    ],
    methodology:
      "Controlled study with 16 astronauts using DEXA scans, blood markers, and exercise monitoring over 6-month periods. Advanced imaging techniques and biochemical analysis were employed to track bone metabolism.",
    implications:
      "Essential for crew health during long-duration missions to Mars and beyond. Findings also inform osteoporosis treatments and bone health management on Earth.",
    datasets: [
      {
        name: "bone_scans.csv",
        size: "6.2 MB",
        type: "CSV",
        url: "/datasets/bone/scans.csv",
      },
      {
        name: "exercise_logs.json",
        size: "2.8 MB",
        type: "JSON",
        url: "/datasets/bone/exercise.json",
      },
      {
        name: "blood_tests.zip",
        size: "4.5 MB",
        type: "ZIP",
        url: "/datasets/bone/blood.zip",
      },
      {
        name: "research_paper.pdf",
        size: "3.1 MB",
        type: "PDF",
        url: "/datasets/bone/paper.pdf",
      },
    ],
    relatedResearch: ["muscle-atrophy-2024", "nutrition-space-2024"],
  },

  // ADDED MISSING RESEARCH ENTRIES:
  "algae-oxygen-2024": {
    id: "algae-oxygen-2024",
    title: "Algae-Based Oxygen Generation for Life Support Systems",
    author: "Dr. Maria Gonzalez, Bioengineering Division",
    date: "February 20, 2024",
    category: "Bioengineering",
    mission: "Lunar Base Preparation",
    citations: 23,
    abstract:
      "Development of Chlorella vulgaris bioreactors for continuous oxygen production in space habitats with 89% efficiency.",
    fullDescription:
      "This research focuses on developing sustainable life support systems using algae for oxygen generation in space environments. The study demonstrates that Chlorella vulgaris can efficiently produce oxygen while also providing biomass for other applications. The bioreactor systems were tested under simulated space conditions, showing remarkable stability and efficiency.",
    findings: [
      "89% oxygen production efficiency",
      "Sustainable biomass production",
      "Closed-loop system integration",
      "Reduced resource requirements",
      "Scalable for long-duration missions",
    ],
    methodology:
      "Bioreactor testing with Chlorella vulgaris in simulated space conditions over 12 months. Continuous monitoring of oxygen production, biomass growth, and system stability.",
    implications:
      "Essential for long-duration space missions and Mars colonization. Provides sustainable life support solutions and reduces dependency on Earth-based resources.",
    datasets: [
      {
        name: "algae_oxygen_data.csv",
        size: "4.2 MB",
        type: "CSV",
        url: "/datasets/algae/oxygen.csv",
      },
      {
        name: "biomass_growth.json",
        size: "2.1 MB",
        type: "JSON",
        url: "/datasets/algae/biomass.json",
      },
    ],
    relatedResearch: ["plant-microgravity-2024"],
  },
  "wheat-growth-2024": {
    id: "wheat-growth-2024",
    title: "Wheat Cultivation in Microgravity Conditions",
    author: "Dr. Sarah Chen, NASA Plant Biology Division",
    date: "March 18, 2024",
    category: "Plant Biology",
    mission: "ISS Expedition 68",
    citations: 18,
    abstract:
      "Study of wheat growth and grain production in space station environment showing 28% increased growth rate.",
    fullDescription:
      "This research investigates wheat cultivation techniques optimized for microgravity conditions aboard the International Space Station. The study focuses on developing efficient methods for growing staple food crops in space, which is crucial for long-duration missions. Results show promising adaptation of wheat plants to space environments.",
    findings: [
      "28% increased growth rate in microgravity",
      "Successful grain production achieved",
      "Adapted root systems development",
      "Enhanced nutrient utilization",
      "Viable seed production",
    ],
    methodology:
      "6-month wheat cultivation study in Advanced Plant Habitat with controlled environmental conditions. Regular monitoring of growth metrics, grain development, and nutritional analysis.",
    implications:
      "Critical for sustainable food production in space. Advances space agriculture capabilities for future Mars missions and lunar bases.",
    datasets: [
      {
        name: "wheat_growth.csv",
        size: "3.8 MB",
        type: "CSV",
        url: "/datasets/wheat/growth.csv",
      },
      {
        name: "grain_analysis.json",
        size: "1.9 MB",
        type: "JSON",
        url: "/datasets/wheat/grain.json",
      },
    ],
    relatedResearch: ["plant-microgravity-2024"],
  },
  "mars-rad-shielding-2024": {
    id: "mars-rad-shielding-2024",
    title: "Mars Mission Radiation Shielding Optimization",
    author: "Dr. Michael Rodriguez, Space Radiation Laboratory",
    date: "March 12, 2024",
    category: "Radiation Physics",
    mission: "Artemis Preparation",
    citations: 22,
    abstract:
      "Advanced shielding configurations for Mars transit missions achieving 45% weight reduction with enhanced protection.",
    fullDescription:
      "This study focuses on optimizing radiation shielding materials and configurations specifically for crewed Mars missions. The research combines computational modeling with experimental testing to develop lightweight yet highly effective shielding solutions that can protect astronauts during the long journey to Mars.",
    findings: [
      "45% weight reduction compared to traditional shielding",
      "Enhanced protection efficiency",
      "Modular design implementation",
      "Improved crew safety margins",
      "Cost-effective manufacturing",
    ],
    methodology:
      "Computer simulations using advanced radiation transport codes combined with material testing in particle accelerators. Extensive analysis of shielding performance under various cosmic radiation scenarios.",
    implications:
      "Critical for crew safety during interplanetary travel. Enables longer duration missions and reduces launch mass requirements.",
    datasets: [
      {
        name: "mars_shielding.csv",
        size: "6.1 MB",
        type: "CSV",
        url: "/datasets/mars/shielding.csv",
      },
      {
        name: "radiation_simulations.zip",
        size: "18.3 MB",
        type: "ZIP",
        url: "/datasets/mars/simulations.zip",
      },
    ],
    relatedResearch: ["radiation-shielding-2024"],
  },
  "dna-repair-2024": {
    id: "dna-repair-2024",
    title: "DNA Repair Mechanisms Under Cosmic Radiation",
    author: "Dr. Robert Kim, Space Genetics Laboratory",
    date: "February 15, 2024",
    category: "Radiation Biology",
    mission: "ISS Genetic Research",
    citations: 35,
    abstract:
      "Investigation of cellular DNA repair pathways under cosmic radiation exposure revealing enhanced repair mechanisms.",
    fullDescription:
      "This groundbreaking research explores how human cells respond to and repair DNA damage caused by cosmic radiation. The study identifies novel repair pathways that are activated under space radiation conditions, providing insights that could lead to new protective strategies for astronauts and advances in cancer treatment on Earth.",
    findings: [
      "Enhanced repair mechanisms identified",
      "New protective pathways discovered",
      "Therapeutic applications potential",
      "Reduced mutation rates",
      "Improved cell survival",
    ],
    methodology:
      "Cell culture experiments with controlled radiation exposure using particle accelerators. Genomic analysis, protein expression studies, and functional assays to characterize DNA repair mechanisms.",
    implications:
      "Advances in radiation protection for space travelers and potential applications in cancer therapy. Contributes to understanding fundamental cellular repair processes.",
    datasets: [
      {
        name: "dna_repair_data.csv",
        size: "7.3 MB",
        type: "CSV",
        url: "/datasets/dna/repair.csv",
      },
      {
        name: "genomic_analysis.fasta",
        size: "24.8 MB",
        type: "FASTA",
        url: "/datasets/dna/genomics.fasta",
      },
    ],
    relatedResearch: ["radiation-shielding-2024"],
  },
  "immune-system-2024": {
    id: "immune-system-2024",
    title: "Spaceflight Effects on Human Immune Function",
    author: "Dr. Emily Watson, NASA Microbiology Research",
    date: "March 8, 2024",
    category: "Human Physiology",
    mission: "ISS Expedition 67/68",
    citations: 31,
    abstract:
      "Comprehensive analysis of immune system changes during long-duration space missions showing significant functional alterations.",
    fullDescription:
      "This comprehensive study examines how spaceflight affects the human immune system over extended periods. The research tracks multiple immune parameters in astronauts before, during, and after space missions, revealing complex changes in immune function that have implications for crew health and mission success.",
    findings: [
      "T-cell function alterations observed",
      "Inflammatory response changes documented",
      "Recovery patterns identified",
      "Individual variation in responses",
      "Correlation with microbiome changes",
    ],
    methodology:
      "Longitudinal study with regular blood sample collection and immune function testing. Flow cytometry, cytokine analysis, and functional immune assays conducted over 12-month periods.",
    implications:
      "Critical for crew health management during long missions. Informs medical protocols and countermeasure development for space travelers.",
    datasets: [
      {
        name: "immune_data.csv",
        size: "5.9 MB",
        type: "CSV",
        url: "/datasets/immune/data.csv",
      },
      {
        name: "cytokine_analysis.json",
        size: "3.2 MB",
        type: "JSON",
        url: "/datasets/immune/cytokines.json",
      },
    ],
    relatedResearch: ["microbiome-iss-2024"],
  },
  "nutrition-space-2024": {
    id: "nutrition-space-2024",
    title: "Nutritional Requirements for Long-Duration Space Missions",
    author: "Dr. James Park, Space Medicine Institute",
    date: "March 1, 2024",
    category: "Human Physiology",
    mission: "ISS Health Monitoring",
    citations: 27,
    abstract:
      "Optimization of nutritional protocols for astronaut health in space showing improved nutrient absorption and metabolic efficiency.",
    fullDescription:
      "This research focuses on developing optimal nutritional strategies for astronauts during long-duration space missions. The study examines how microgravity affects nutrient absorption, metabolism, and overall nutritional requirements, leading to the development of enhanced dietary protocols that maintain crew health and performance.",
    findings: [
      "Enhanced nutrient formulations developed",
      "Improved absorption rates documented",
      "Customized dietary plans created",
      "Metabolic efficiency improvements",
      "Health outcome enhancements",
    ],
    methodology:
      "Clinical trials with controlled dietary interventions and metabolic studies. Regular health monitoring, blood analysis, and performance testing over 6-month periods.",
    implications:
      "Essential for long-duration mission planning and crew health maintenance. Applications in terrestrial nutrition and clinical medicine.",
    datasets: [
      {
        name: "nutrition_data.csv",
        size: "4.7 MB",
        type: "CSV",
        url: "/datasets/nutrition/data.csv",
      },
      {
        name: "metabolic_studies.json",
        size: "2.8 MB",
        type: "JSON",
        url: "/datasets/nutrition/metabolism.json",
      },
    ],
    relatedResearch: ["bone-density-2024", "microbiome-iss-2024"],
  },
  "muscle-atrophy-2024": {
    id: "muscle-atrophy-2024",
    title: "Muscle Atrophy Prevention in Microgravity",
    author: "Dr. James Park, Space Medicine Institute",
    date: "February 25, 2024",
    category: "Human Physiology",
    mission: "ISS Health Monitoring",
    citations: 24,
    abstract:
      "Advanced exercise protocols to prevent muscle loss in space achieving 78% muscle mass retention.",
    fullDescription:
      "This study develops and tests advanced exercise regimens combined with nutritional support to combat muscle atrophy in microgravity environments. The research demonstrates that specific exercise protocols can significantly reduce muscle loss during long-duration space missions, maintaining crew physical capabilities and health.",
    findings: [
      "78% muscle mass retention achieved",
      "Enhanced exercise efficiency documented",
      "Combined intervention success demonstrated",
      "Individual response variations characterized",
      "Long-term sustainability proven",
    ],
    methodology:
      "Controlled exercise interventions with regular muscle mass measurements using DEXA scans and MRI. Strength testing, functional assessments, and metabolic monitoring throughout 6-month missions.",
    implications:
      "Critical for crew physical health maintenance during extended space missions. Applications in rehabilitation medicine and aging research on Earth.",
    datasets: [
      {
        name: "muscle_data.csv",
        size: "3.5 MB",
        type: "CSV",
        url: "/datasets/muscle/data.csv",
      },
      {
        name: "exercise_protocols.json",
        size: "1.2 MB",
        type: "JSON",
        url: "/datasets/muscle/protocols.json",
      },
    ],
    relatedResearch: ["bone-density-2024"],
  },
};

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const research = researchData[id as keyof typeof researchData];

  if (!research) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Research Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The requested research paper could not be found.
          </p>
          <Link
            to="/research"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Research Library
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = (fileUrl: string, fileName: string) => {
    const fileContent = `NASA Research Data - ${fileName}\n\nResearch: ${
      research.title
    }\nCategory: ${research.category}\nDate: ${
      research.date
    }\n\nThis file contains research data for: ${
      research.title
    }\n\nIn a production environment, this would contain the actual research datasets, metrics, and analysis results.\n\nFile: ${fileName}\nDownloaded: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([fileContent], {
      type: getMimeType(fileName),
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    const zipName = `${research.id}_complete_dataset.zip`;
    const zipContent = `NASA Complete Research Package: ${
      research.title
    }\n\nIncludes all datasets and documentation for:\n- ${research.title}\n- ${
      research.category
    }\n- ${research.mission}\n\nThis ZIP file contains:\n${research.datasets
      .map((ds) => `- ${ds.name} (${ds.size})`)
      .join("\n")}\n\nDownloaded: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([zipContent], { type: "application/zip" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = zipName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getMimeType = (fileName: string) => {
    if (fileName.endsWith(".csv")) return "text/csv";
    if (fileName.endsWith(".json")) return "application/json";
    if (fileName.endsWith(".zip")) return "application/zip";
    if (fileName.endsWith(".pdf")) return "application/pdf";
    if (fileName.endsWith(".fasta")) return "text/plain";
    return "text/plain";
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/research/${research.id}`;
    const shareText = `Check out this NASA research: ${research.title}`;

    if (navigator.share) {
      navigator.share({
        title: research.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Research link copied to clipboard!");
    }
  };

  const getFileIcon = (fileType: string) => {
    const icons: Record<string, string> = {
      CSV: "📊",
      JSON: "⚙️",
      ZIP: "📦",
      TAR: "📦",
      FASTA: "🧬",
      PDF: "📄",
    };
    return icons[fileType] || "📁";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Plant Biology": "bg-green-100 text-green-800",
      "Radiation Physics": "bg-orange-100 text-orange-800",
      Microbiology: "bg-purple-100 text-purple-800",
      "Human Physiology": "bg-red-100 text-red-800",
      Bioengineering: "bg-blue-100 text-blue-800",
      "Radiation Biology": "bg-yellow-100 text-yellow-800",
      Botany: "bg-green-100 text-green-800",
      Biophysics: "bg-blue-100 text-blue-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/research")}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Research
          </button>
        </div>

        {/* Research Header */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`${getCategoryColor(
                    research.category
                  )} text-sm font-medium px-3 py-1 rounded-full`}
                >
                  {research.category}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {research.mission}
                </span>
                <span className="text-slate-500 text-sm">
                  📚 {research.citations} citations
                </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {research.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {research.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {research.date}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🚀</span>
                  Mission: {research.mission}
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  {research.citations} citations
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDownloadAll}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Research Package
            </button>
            <button
              onClick={handleShare}
              className="flex items-center border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Research
            </button>
          </div>
        </div>

        {/* Abstract */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Abstract</h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            {research.abstract}
          </p>
        </div>

        {/* Full Description */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Research Overview
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            {research.fullDescription}
          </p>
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Key Findings
          </h2>
          <ul className="space-y-3">
            {research.findings.map((finding, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                  ✓
                </span>
                <span className="text-slate-700 text-lg">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology & Implications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              <BarChart3 className="w-5 h-5 inline mr-2" />
              Methodology
            </h2>
            <p className="text-slate-700 text-lg">{research.methodology}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Implications
            </h2>
            <p className="text-slate-700 text-lg">{research.implications}</p>
          </div>
        </div>

        {/* Available Datasets */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Available Datasets
          </h2>
          <div className="space-y-3">
            {research.datasets.map((dataset, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-4">
                    {getFileIcon(dataset.type)}
                  </span>
                  <div>
                    <div className="font-mono text-sm text-slate-900 font-medium">
                      {dataset.name}
                    </div>
                    <div className="text-slate-600 text-sm">
                      {dataset.size} • {dataset.type}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(dataset.url, dataset.name)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Related Research - NOW WORKING WITH ALL ENTRIES */}
        {research.relatedResearch && research.relatedResearch.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Related Research
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {research.relatedResearch.map((relatedId, index) => {
                const related =
                  researchData[relatedId as keyof typeof researchData];
                if (!related) {
                  console.warn(`Related research not found: ${relatedId}`);
                  return null;
                }
                return (
                  <div
                    key={index}
                    className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => navigate(`/research/${related.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600">
                          {related.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-2">
                          {related.category} • {related.mission}
                        </p>
                        <p className="text-slate-500 text-sm line-clamp-2">
                          {related.abstract}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 mt-1 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span>📅 {related.date}</span>
                      <span>📚 {related.citations} citations</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 text-lg mb-3">
            🚀 Explore More Research
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/research")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse All Research
            </button>
            <button
              onClick={() => navigate("/knowledge-graph")}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              View Research Network
            </button>
            <button
              onClick={() => navigate("/catalog")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Data Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
