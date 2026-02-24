import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getSocket } from "@/lib/socket";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import {
  MessageSquare, Users, Megaphone, Bot, Kanban, Smartphone, Settings, LogOut, Menu, X, LayoutDashboard, User,
  LayoutGrid, Search, Monitor, Sun, Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Conversas", icon: MessageSquare, path: "/conversations" },
  { label: "Contatos", icon: Users, path: "/contacts" },
  { label: "Ao Vivo", icon: LayoutGrid, path: "/live" },
  { label: "Consulta", icon: Search, path: "/query" },
  { label: "Campanhas", icon: Megaphone, path: "/campaigns" },
  { label: "Chatbot", icon: Bot, path: "/chatbot" },
  { label: "Pipeline", icon: Kanban, path: "/pipeline" },
  { label: "WhatsApp", icon: Smartphone, path: "/whatsapp" },
  { label: "Canais", icon: Monitor, path: "/channels" },
  { label: "Configurações", icon: Settings, path: "/settings" },
];

export default function AppLayout() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const [waStatus, setWaStatus] = useState<"connected" | "disconnected">("disconnected");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    const socket = getSocket();
    const handler = (data: { status: "connected" | "disconnected" }) => setWaStatus(data.status);
    socket.on("wa_status", handler);
    return () => { socket.off("wa_status", handler); };
  }, [isAuthenticated, navigate]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  if (!isAuthenticated) return null;

  const sidebarContent = (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <span className="text-lg font-bold text-primary">TalkTreak</span>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside
          className={cn(
            "flex flex-col border-r border-border bg-sidebar transition-all duration-200",
            sidebarOpen ? "w-56" : "w-0 overflow-hidden"
          )}
        >
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-56 flex-col bg-sidebar border-r border-border"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
            <span className="font-semibold text-primary hidden sm:inline">TalkTreak</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5",
                waStatus === "connected" ? "border-green-500 text-green-400" : "border-destructive text-destructive"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                waStatus === "connected" ? "bg-green-500" : "bg-destructive"
              )} />
              WA {waStatus === "connected" ? "Online" : "Offline"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full outline-none focus:ring-2 focus:ring-ring">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">AD</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Administrador</p>
                    <p className="text-xs text-muted-foreground">admin@talktreak.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
