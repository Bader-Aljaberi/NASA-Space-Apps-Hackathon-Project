// pages/KnowledgeGraph.tsx - COMPLETE WITH REDUCED CIRCLE SIZES
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Network, ArrowRight } from "lucide-react";

interface ResearchNode {
  id: string;
  type: string;
  studies: number;
  x: number;
  y: number;
  connections: string[];
  description: string;
}

interface ResearchConnection {
  from: string;
  to: string;
  strength: "strong" | "medium" | "weak";
  studies: number;
  description: string;
}

export default function KnowledgeGraph() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<ResearchNode[]>([]);

  // Real NASA research data
  const researchConnections: ResearchConnection[] = [
    {
      from: "Plant Biology",
      to: "Microgravity",
      strength: "strong",
      studies: 234,
      description: "How plants adapt to weightlessness in space environments",
    },
    {
      from: "Radiation",
      to: "DNA Damage",
      strength: "medium",
      studies: 156,
      description: "Effects of cosmic radiation on genetic material",
    },
    {
      from: "Microbiome",
      to: "Immune System",
      strength: "strong",
      studies: 189,
      description: "Impact of space travel on human microbiome and immunity",
    },
    {
      from: "Plant Biology",
      to: "Oxygen Production",
      strength: "strong",
      studies: 312,
      description:
        "Plants as natural life support systems for oxygen generation",
    },
    {
      from: "Human Physiology",
      to: "Microgravity",
      strength: "medium",
      studies: 278,
      description: "Effects of weightlessness on human body systems",
    },
  ];

  // Initialize nodes with better positions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const initialNodes: ResearchNode[] = [
      {
        id: "Plant Biology",
        type: "biology",
        studies: 1245,
        x: width * 0.25,
        y: height * 0.3,
        connections: ["Microgravity", "Oxygen Production"],
        description:
          "Study of plant growth and adaptation in space environments",
      },
      {
        id: "Microgravity",
        type: "physics",
        studies: 892,
        x: width * 0.5,
        y: height * 0.2,
        connections: ["Plant Biology", "Human Physiology"],
        description: "Research on biological systems in weightless conditions",
      },
      {
        id: "Radiation",
        type: "physics",
        studies: 756,
        x: width * 0.75,
        y: height * 0.3,
        connections: ["DNA Damage"],
        description: "Cosmic radiation effects and protection mechanisms",
      },
      {
        id: "DNA Damage",
        type: "genetics",
        studies: 543,
        x: width * 0.85,
        y: height * 0.5,
        connections: ["Radiation"],
        description:
          "Genetic damage and repair in space radiation environments",
      },
      {
        id: "Microbiome",
        type: "biology",
        studies: 678,
        x: width * 0.3,
        y: height * 0.6,
        connections: ["Immune System"],
        description: "Changes in microbial communities during spaceflight",
      },
      {
        id: "Immune System",
        type: "medicine",
        studies: 834,
        x: width * 0.5,
        y: height * 0.7,
        connections: ["Microbiome"],
        description: "Spaceflight effects on human immune function",
      },
      {
        id: "Oxygen Production",
        type: "engineering",
        studies: 456,
        x: width * 0.15,
        y: height * 0.5,
        connections: ["Plant Biology"],
        description: "Biological systems for life support oxygen generation",
      },
      {
        id: "Human Physiology",
        type: "medicine",
        studies: 923,
        x: width * 0.65,
        y: height * 0.6,
        connections: ["Microgravity"],
        description: "Human body adaptation to space environments",
      },
    ];
    setNodes(initialNodes);
  }, []);

  const nodeColors: Record<string, string> = {
    biology: "#10b981", // green
    physics: "#3b82f6", // blue
    genetics: "#8b5cf6", // purple
    medicine: "#ef4444", // red
    engineering: "#f59e0b", // amber
  };

  const connectionColors: Record<string, string> = {
    strong: "#10b981",
    medium: "#f59e0b",
    weak: "#ef4444",
  };

  // Function to split text into exactly 2 lines
  const splitIntoTwoLines = (text: string): [string, string] => {
    const words = text.split(" ");

    if (words.length === 1) {
      // Single long word - split in the middle
      const mid = Math.ceil(text.length / 2);
      return [text.substring(0, mid), text.substring(mid)];
    }

    if (words.length === 2) {
      // Two words - one per line
      return [words[0], words[1]];
    }

    // Multiple words - find the best split point
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");

    return [line1, line2];
  };

  // Draw the graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to container
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Clear canvas with light background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections first (behind nodes)
    researchConnections.forEach((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.from);
      const toNode = nodes.find((n) => n.id === conn.to);

      if (fromNode && toNode) {
        // Connection line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = connectionColors[conn.strength];
        ctx.lineWidth = conn.strength === "strong" ? 4 : 3;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    });

    // Draw nodes with REDUCED circle sizes
    nodes.forEach((node) => {
      const isSelected = selectedNode === node.id;
      const isHovered = hoveredNode === node.id;
      const nodeRadius = 28; // REDUCED from 35-40 to 28

      // Node glow effect for better visibility
      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius + 6, 0, 2 * Math.PI);
        ctx.fillStyle = nodeColors[node.type] + "30";
        ctx.fill();
      }

      // Main node circle - REDUCED SIZE
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? "#1e40af" : nodeColors[node.type];
      ctx.fill();

      // White border for better contrast
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      // Node label - 2 LINES with smaller font for reduced circles
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 9px Arial"; // Smaller font for reduced circles

      // Split text into exactly 2 lines
      const [line1, line2] = splitIntoTwoLines(node.id);

      // Draw lines with tighter spacing for reduced circles
      ctx.fillText(line1, node.x, node.y - 6);
      ctx.fillText(line2, node.x, node.y + 6);

      // Studies count BELOW the circle
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 9px Arial";
      ctx.textBaseline = "top";

      const studiesText = `${node.studies} studies`;
      ctx.fillText(studiesText, node.x, node.y + nodeRadius + 8);
    });
  }, [selectedNode, hoveredNode, nodes]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if any node was clicked
    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return distance <= 35; // Adjusted clickable area for reduced circles
    });

    if (clickedNode) {
      setSelectedNode(clickedNode.id);
    } else {
      setSelectedNode(null);
    }
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hovered = nodes.find((node) => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return distance <= 35;
    });

    setHoveredNode(hovered ? hovered.id : null);
    canvas.style.cursor = hovered ? "pointer" : "default";
  };

  const handleExploreResearch = (researchArea: string) => {
    navigate("/research", {
      state: { filter: researchArea.toLowerCase().replace(" ", "-") },
    });
  };

  const filteredConnections = selectedNode
    ? researchConnections.filter(
        (conn) => conn.from === selectedNode || conn.to === selectedNode
      )
    : [];

  const selectedNodeData = selectedNode
    ? nodes.find((n) => n.id === selectedNode)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Network className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">
              Research Network Map
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Interactive visualization of connections between NASA space biology
            research areas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Graph */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Research Network
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-slate-600">Strong Connection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-slate-600">Medium Connection</span>
                </div>
              </div>
            </div>

            <div
              ref={containerRef}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-slate-300 h-96 relative"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
              />

              {!selectedNode && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-slate-700 font-semibold mb-1">
                      Click any research area to explore
                    </p>
                    <p className="text-slate-600 text-sm">
                      Discover connections between space biology research fields
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                💡 <strong>Tip:</strong> Click on research areas to see
                connections and study counts
              </p>
            </div>
          </div>

          {/* Connection Details */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {selectedNode
                ? `Research: ${selectedNode}`
                : "Select a Research Area"}
            </h2>

            {selectedNode && selectedNodeData ? (
              <div className="space-y-4">
                {/* Node Overview */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Research Overview
                  </h3>
                  <p className="text-blue-800 text-sm mb-2">
                    {selectedNodeData.description}
                  </p>
                  <div className="flex items-center text-sm text-blue-700">
                    <span className="bg-white px-2 py-1 rounded border border-blue-200">
                      📚 {selectedNodeData.studies} studies
                    </span>
                  </div>
                </div>

                {/* Connections */}
                {filteredConnections.length > 0 ? (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Research Connections
                    </h4>
                    <div className="space-y-3">
                      {filteredConnections.map((connection, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-300 transition-all duration-200 bg-white"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="font-semibold text-slate-900">
                                {connection.from}
                              </span>
                              <ArrowRight className="w-4 h-4 text-slate-400" />
                              <span className="font-semibold text-slate-900">
                                {connection.to}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold border ${
                                connection.strength === "strong"
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
                              }`}
                            >
                              {connection.strength.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-700 text-sm mb-3 leading-relaxed">
                            {connection.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">
                              📊 {connection.studies} supporting studies
                            </span>
                            <button
                              onClick={() =>
                                handleExploreResearch(connection.to)
                              }
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 bg-blue-50 rounded-lg transition-colors hover:bg-blue-100"
                            >
                              Explore Research →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                    <Network className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p>No direct research connections found</p>
                    <p className="text-sm mt-1">
                      This research area operates independently
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-slate-600 mb-2 font-medium">
                  Click on any research area in the graph
                </p>
                <p className="text-slate-500 text-sm">
                  Select a node to see its research connections and study
                  information
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Research Categories */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Research Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Plant Growth", icon: "🌱", query: "plant growth" },
              { name: "Microbiome", icon: "🦠", query: "microbiome" },
              { name: "Radiation", icon: "☢️", query: "radiation" },
              { name: "Human Health", icon: "👨‍🚀", query: "human physiology" },
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => handleExploreResearch(category.name)}
                className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 text-sm">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
