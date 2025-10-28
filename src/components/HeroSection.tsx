// components/HeroSection.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Search, Database, BarChart3 } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            NASA Space Biology
            <span className="block text-blue-400">Research Portal</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Explore 2.4M+ datasets from NASA's space biology research. Discover
            groundbreaking studies in microgravity, radiation effects, and life
            support systems for deep space exploration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/research"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Research
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Database className="w-5 h-5 mr-2" />
              Data Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Advanced Search</h3>
              <p className="text-blue-200">
                Find specific research papers and datasets
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Data Catalog</h3>
              <p className="text-blue-200">
                Access millions of NASA research datasets
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Analytics</h3>
              <p className="text-blue-200">
                Visualize research trends and patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
