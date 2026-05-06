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
import TripVisa from "./pages/TripVisa";
import TripPack from "./pages/TripPack";
import TripPrep from "./pages/TripPrep";
import TripSpend from "./pages/TripSpend";
import TripSpendWork from "./pages/TripSpendWork";
import TripItinerary from "./pages/TripItinerary";
import TripJournal from "./pages/TripJournal";
import TripDuring from "./pages/TripDuring";
import TripIntro from "./pages/TripIntro";
import TripEngine from "./pages/TripEngine";
import ItineraryView from "./pages/ItineraryView";
import Pack from "./pages/Pack";
import Outfits from "./pages/Outfits";
import Spend from "./pages/Spend";
import Visa from "./pages/Visa";
import RouteScreen from "./pages/Route";
import During from "./pages/During";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import HowYouTravel from "./pages/profile/HowYouTravel";
import WhatYouTravelFor from "./pages/profile/WhatYouTravelFor";
import WhatTravelMeans from "./pages/profile/WhatTravelMeans";
import YourRhythm from "./pages/profile/YourRhythm";
import InTransit from "./pages/profile/InTransit";
import WhereYouveBeen from "./pages/profile/WhereYouveBeen";
import WhatCuraKnows from "./pages/profile/WhatCuraKnows";
import YourPlan from "./pages/profile/YourPlan";
import NewTrip from "./pages/NewTrip";
import TripImport from "./pages/TripImport";
import Cura from "./pages/Cura";
import Identify from "./pages/Identify";
import Choose from "./pages/Choose";
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
          <Route path="/identify" element={<Identify />} />
          <Route path="/choose" element={<Choose />} />
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
          <Route path="/trip/puglia/visa" element={<TripVisa />} />
          <Route path="/trip/puglia/pack" element={<TripPack />} />
          <Route path="/trip/puglia/prep" element={<TripPrep />} />
          <Route path="/trip/puglia/spend" element={<TripSpend />} />
          <Route path="/trip/puglia/spend/work" element={<TripSpendWork />} />
          <Route path="/trip/puglia/itinerary" element={<TripItinerary />} />
          <Route path="/trip/puglia/journal" element={<TripJournal />} />
          <Route path="/trip/:id" element={<TripWorkspace />} />
          <Route path="/trip/:id/intro" element={<TripIntro />} />
          <Route path="/trip/:id/engine/:engine" element={<TripEngine />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/pack" element={<Pack />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/spend" element={<Spend />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/route" element={<RouteScreen />} />
          <Route path="/during" element={<During />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/how-you-travel" element={<HowYouTravel />} />
          <Route path="/profile/what-you-travel-for" element={<WhatYouTravelFor />} />
          <Route path="/profile/what-travel-means" element={<WhatTravelMeans />} />
          <Route path="/profile/your-rhythm" element={<YourRhythm />} />
          <Route path="/profile/in-transit" element={<InTransit />} />
          <Route path="/profile/where-youve-been" element={<WhereYouveBeen />} />
          <Route path="/profile/what-cura-knows" element={<WhatCuraKnows />} />
          <Route path="/profile/your-plan" element={<YourPlan />} />
          <Route path="/cura" element={<Cura />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
