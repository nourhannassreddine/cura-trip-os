import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "./pages/Welcome";
import EntryGate from "./pages/EntryGate";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Dream from "./pages/Dream";
import Compare from "./pages/Compare";
import Trips from "./pages/Trips";
import TripWorkspace from "./pages/TripWorkspace";
import ItineraryView from "./pages/ItineraryView";
import Pack from "./pages/Pack";
import Outfits from "./pages/Outfits";
import Spend from "./pages/Spend";
import Visa from "./pages/Visa";
import RouteScreen from "./pages/Route";
import During from "./pages/During";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import NewTrip from "./pages/NewTrip";
import TripImport from "./pages/TripImport";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/begin" element={<EntryGate />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dream" element={<Dream />} />
          {/* legacy redirect */}
          <Route path="/discover" element={<Navigate to="/dream" replace />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trip/new" element={<NewTrip />} />
          <Route path="/trip/import" element={<TripImport />} />
          <Route path="/trip/:id" element={<TripWorkspace />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/pack" element={<Pack />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/spend" element={<Spend />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/route" element={<RouteScreen />} />
          <Route path="/during" element={<During />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
