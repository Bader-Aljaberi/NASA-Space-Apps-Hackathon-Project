// App.tsx - No changes needed, just for reference
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdvancedSearch from "./pages/AdvancedSearch";
import DataCatalog from "./pages/DataCatalog";
import Analytics from "./pages/Analytics";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import AllResearch from "./pages/AllResearch";
import ResearchDetail from "./pages/ResearchDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<AdvancedSearch />} />
        <Route path="/catalog" element={<DataCatalog />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
        <Route path="/research" element={<AllResearch />} />
        <Route path="/research/:id" element={<ResearchDetail />} />
        <Route path="/all-research" element={<AllResearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
