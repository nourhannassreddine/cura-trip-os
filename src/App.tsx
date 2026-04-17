import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Compare from "./pages/Compare";
import TripWorkspace from "./pages/TripWorkspace";
import ItineraryView from "./pages/ItineraryView";
import Pack from "./pages/Pack";
import Spend from "./pages/Spend";
import Visa from "./pages/Visa";
import RouteScreen from "./pages/Route";
import During from "./pages/During";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import NewTrip from "./pages/NewTrip";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/trip/new" element={<NewTrip />} />
          <Route path="/trip/:id" element={<TripWorkspace />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/pack" element={<Pack />} />
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
