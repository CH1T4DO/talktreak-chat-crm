import { useState, useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { apiGet, apiPost } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Send, Search, ArrowLeft, Phone, RefreshCw, Edit, Merge, X, Check, ArrowRightLeft, User, Paperclip, Smile } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  phone: string;
  tags?: string[];
  channel?: string;
  status?: "active" | "pending" | "group";
}

const mockConversations: Conversation[] = [
  { id: "1", name: "João Silva", lastMessage: "Olá, preciso de ajuda com meu pedido", time: "10:32", phone: "+55 11 98765-4321", tags: ["Suporte", "VIP"], channel: "whatsapp", status: "active" },
  { id: "2", name: "Maria Santos", lastMessage: "Qual o prazo de entrega?", time: "09:45", phone: "+55 21 99876-5432", tags: ["Vendas"], channel: "whatsapp", status: "active" },
  { id: "3", name: "Pedro Costa", lastMessage: "Obrigado pelo atendimento!", time: "09:12", phone: "+55 31 97654-3210", tags: ["Resolvido"], channel: "whatsapp", status: "pending" },
  { id: "4", name: "Ana Oliveira", lastMessage: "Vocês aceitam PIX?", time: "Ontem", phone: "+55 41 96543-2109", tags: ["Financeiro"], channel: "whatsapp", status: "active" },
  { id: "5", name: "Grupo Marketing", lastMessage: "Reunião amanhã às 10h", time: "Ontem", phone: "", tags: [], channel: "whatsapp", status: "group" },
];

const mockMessages: Message[] = [
  { id: "1", text: "Olá, preciso de ajuda com meu pedido #4521", fromMe: false, timestamp: "2024-01-15T10:30:00" },
  { id: "2", text: "Olá João! Claro, vou verificar seu pedido. Um momento por favor.", fromMe: true, timestamp: "2024-01-15T10:31:00" },
  { id: "3", text: "O pedido #4521 está em transporte e deve chegar até amanhã.", fromMe: true, timestamp: "2024-01-15T10:32:00" },
  { id: "4", text: "Ótimo, muito obrigado!", fromMe: false, timestamp: "2024-01-15T10:33:00" },
];

const tagColors: Record<string, string> = {
  Suporte: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  VIP: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Vendas: "bg-green-500/20 text-green-400 border-green-500/30",
  Resolvido: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Financeiro: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

function ContactPanel({ contact }: { contact: Conversation }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarFallback className="text-lg bg-primary/20 text-primary">{contact.name.split(" ").map(n => n[0]).join("").substring(0, 2)}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-sm">{contact.name}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> {contact.phone}</p>
      </div>

      <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
        <RefreshCw className="h-3 w-3" /> Sinc. Messages
      </Button>

      {contact.tags && contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {contact.tags.map((tag) => (
            <span key={tag} className={cn("text-[10px] px-2 py-0.5 rounded-full border", tagColors[tag] || "bg-muted text-muted-foreground border-border")}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs gap-1"><Edit className="h-3 w-3" /> EDITAR</Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs gap-1"><Merge className="h-3 w-3" /> MERGE</Button>
      </div>

      <div className="space-y-3">
        {[
          { label: "Origem do Lead", options: ["WhatsApp", "Site", "Indicação", "Outro"] },
          { label: "Status Cliente", options: ["Novo", "Ativo", "Inativo"] },
          { label: "Etiquetas", options: ["Suporte", "VIP", "Vendas"] },
          { label: "Atendente Padrão", options: ["Admin", "Suporte 1", "Vendas 1"] },
          { label: "Departamento Padrão", options: ["Suporte", "Vendas", "Financeiro"] },
        ].map((item) => (
          <div key={item.label} className="space-y-1">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{item.label}</label>
            <Select>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Selecionar..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {item.options.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Observações</label>
        <textarea className="w-full h-20 rounded-md border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-ring" placeholder="Adicionar observação..." />
      </div>
    </div>
  );
}

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [showContactPanel, setShowContactPanel] = useState(true);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileContactOpen) {
          setMobileContactOpen(false);
        } else if (selected) {
          setSelected(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, mobileContactOpen]);

  useEffect(() => {
    apiGet<Conversation[]>("/api/conversations").then(setConversations).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selected) return;
    setMessages(mockMessages);
    apiGet<Message[]>(`/api/conversations/${selected.id}/messages`).then(setMessages).catch(() => {});
  }, [selected]);

  useEffect(() => {
    const socket = getSocket();
    const handler = (msg: Message) => setMessages((prev) => [...prev, msg]);
    socket.on("message", handler);
    return () => { socket.off("message", handler); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !selected) return;
    try {
      await apiPost(`/api/conversations/${selected.id}/messages`, { text });
      setMessages((prev) => [...prev, { id: Date.now().toString(), text, fromMe: true, timestamp: new Date().toISOString() }]);
      setText("");
    } catch {}
  };

  const filtered = conversations.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "active") return matchSearch && c.status === "active";
    if (activeTab === "pending") return matchSearch && c.status === "pending";
    if (activeTab === "groups") return matchSearch && c.status === "group";
    return matchSearch;
  });

  const activeCounts = {
    active: conversations.filter((c) => c.status === "active").length,
    pending: conversations.filter((c) => c.status === "pending").length,
    groups: conversations.filter((c) => c.status === "group").length,
  };

  const showList = !isMobile || !selected;
  const showChat = !isMobile || !!selected;

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-0 -m-4">
      {/* Left Panel - List */}
      <AnimatePresence mode="wait">
        {showList && (
          <motion.div
            key="list"
            initial={isMobile ? { x: -20, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className={cn("shrink-0 border-r border-border flex flex-col bg-card", isMobile ? "w-full" : "w-80")}
          >
            <div className="p-2 border-b border-border">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="active" className="text-xs gap-1">
                    Ativos <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{activeCounts.active}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs gap-1">
                    Pendentes <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{activeCounts.pending}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="text-xs gap-1">
                    Grupos <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{activeCounts.groups}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar conversas..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-8 text-sm" />
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border px-3 py-3 text-left transition-colors",
                    selected?.id === c.id ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">{c.name.split(" ").map(n => n[0]).join("").substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                    {c.tags && c.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {c.tags.map((tag) => (
                          <span key={tag} className={cn("text-[10px] px-1.5 py-0.5 rounded-full border", tagColors[tag] || "bg-muted text-muted-foreground border-border")}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Panel - Chat */}
      <AnimatePresence mode="wait">
        {showChat && (
          <motion.div
            key="chat"
            initial={isMobile ? { x: 20, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="flex flex-1 flex-col min-w-0"
          >
            {selected ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-border px-3 py-2 flex items-center justify-between bg-card">
                  <div className="flex items-center gap-2 min-w-0">
                    {isMobile && (
                      <Button variant="ghost" size="icon" onClick={() => setSelected(null)} className="shrink-0 h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-xs bg-primary/20 text-primary">{selected.name.split(" ").map(n => n[0]).join("").substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-sm truncate">{selected.name}</h2>
                      <p className="text-[10px] text-muted-foreground truncate">{selected.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => isMobile ? setMobileContactOpen(true) : setShowContactPanel(!showContactPanel)}>
                      <User className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="h-7 text-xs gap-1 bg-green-600 hover:bg-green-700 text-white px-2">
                      <Check className="h-3 w-3" />
                      <span className="hidden sm:inline">ACEITAR</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-2">
                      <ArrowRightLeft className="h-3 w-3" />
                      <span className="hidden sm:inline">TRANSFERIR</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-destructive text-destructive hover:bg-destructive/10 px-2">
                      <X className="h-3 w-3" />
                      <span className="hidden sm:inline">FECHAR</span>
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-2 bg-background/50">
                  {messages.map((m) => (
                    <div key={m.id} className={cn("flex", m.fromMe ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                        m.fromMe
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100"
                          : "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100"
                      )}>
                        <p>{m.text}</p>
                        <p className="text-[10px] opacity-60 mt-1 text-right">
                          {new Date(m.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t border-border p-3 flex gap-2 bg-card items-center">
                  <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0 text-muted-foreground">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0 text-muted-foreground">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Digite uma mensagem..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="h-9" />
                  <Button size="icon" onClick={sendMessage} className="h-9 w-9 shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-muted-foreground">Selecione uma conversa</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Panel - Contact Details (desktop) */}
      {!isMobile && selected && showContactPanel && (
        <div className="w-72 border-l border-border bg-card overflow-auto shrink-0">
          <ContactPanel contact={selected} />
        </div>
      )}

      {/* Mobile Contact Sheet */}
      {isMobile && selected && (
        <Sheet open={mobileContactOpen} onOpenChange={setMobileContactOpen}>
          <SheetContent side="right" className="w-[85vw] sm:max-w-sm overflow-auto p-0">
            <SheetHeader className="p-4 pb-0">
              <SheetTitle>Informações do Contato</SheetTitle>
            </SheetHeader>
            <ContactPanel contact={selected} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
