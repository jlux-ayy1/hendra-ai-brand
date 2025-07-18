import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Generator from "./pages/Generator";
import Showcase from "./pages/Showcase";
import FAQ from "./pages/FAQ";
import Tutorial from "./pages/Tutorial";
import BrandIdentity from "./pages/BrandIdentity";
import SloganGenerator from "./pages/SloganGenerator";
import BrandGuidelines from "./pages/BrandGuidelines";
import HubungiKonsultan from "./pages/HubungiKonsultan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/brand-identity" element={<BrandIdentity />} />
          <Route path="/slogan-generator" element={<SloganGenerator />} />
          <Route path="/brand-guidelines" element={<BrandGuidelines />} />
          <Route path="/hubungi-konsultan" element={<HubungiKonsultan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
