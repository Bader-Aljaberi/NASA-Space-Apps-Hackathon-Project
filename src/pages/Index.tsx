// pages/Index.tsx
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import StatsCards from "../components/StatsCards";
import ChartsSection from "../components/ChartsSection";
import FeaturedResearch from "../components/FeaturedResearch";
import QuickAccess from "../components/QuickAccess";
import ResearchCategories from "../components/ResearchCategories";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <StatsCards />
      <ChartsSection />
      <FeaturedResearch />
      <div id="quick-access">
        <QuickAccess />
      </div>
    </div>
  );
}
