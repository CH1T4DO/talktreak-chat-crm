import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Conversations from "./pages/Conversations";
import Contacts from "./pages/Contacts";
import Campaigns from "./pages/Campaigns";
import Chatbot from "./pages/Chatbot";
import Pipeline from "./pages/Pipeline";
import WhatsApp from "./pages/WhatsApp";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import LiveView from "./pages/LiveView";
import QueryAttendance from "./pages/QueryAttendance";
import Channels from "./pages/Channels";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey="talktreak-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="conversations" element={<Conversations />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="campaigns" element={<Campaigns />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="whatsapp" element={<WhatsApp />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="live" element={<LiveView />} />
              <Route path="query" element={<QueryAttendance />} />
              <Route path="channels" element={<Channels />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
