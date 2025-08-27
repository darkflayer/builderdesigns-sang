import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import EventDetails from "@/pages/EventDetails";
import MyEvents from "@/pages/MyEvents";
import Scan from "@/pages/Scan";
import Network from "@/pages/Network";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/my-events" element={<MyEvents />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/network" element={<Network />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
