import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Headphones, Clock, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  { id: "1", name: "Carlos Admin", status: "available" as const, chats: 3 },
  { id: "2", name: "Ana Suporte", status: "busy" as const, chats: 5 },
  { id: "3", name: "Pedro Vendas", status: "busy" as const, chats: 4 },
  { id: "4", name: "Julia Help", status: "available" as const, chats: 1 },
  { id: "5", name: "Roberto Tech", status: "away" as const, chats: 0 },
  { id: "6", name: "Mariana Sales", status: "available" as const, chats: 2 },
];

const activeChats = [
  { id: "1", client: "João Silva", agent: "Ana Suporte", channel: "WhatsApp", duration: "12:34", dept: "Suporte" },
  { id: "2", client: "Maria Santos", agent: "Pedro Vendas", channel: "WhatsApp", duration: "08:21", dept: "Vendas" },
  { id: "3", client: "Lucas Oliveira", agent: "Carlos Admin", channel: "Instagram", duration: "03:45", dept: "Suporte" },
  { id: "4", client: "Fernanda Costa", agent: "Ana Suporte", channel: "WhatsApp", duration: "22:10", dept: "Financeiro" },
  { id: "5", client: "Ricardo Alves", agent: "Pedro Vendas", channel: "Telegram", duration: "05:12", dept: "Vendas" },
  { id: "6", client: "Patrícia Lima", agent: "Julia Help", channel: "WhatsApp", duration: "01:30", dept: "Suporte" },
  { id: "7", client: "André Souza", agent: "Carlos Admin", channel: "WhatsApp", duration: "15:48", dept: "Técnico" },
  { id: "8", client: "Camila Rocha", agent: "Mariana Sales", channel: "Instagram", duration: "07:03", dept: "Vendas" },
];

const statusConfig = {
  available: { label: "Disponível", class: "bg-green-500" },
  busy: { label: "Em atendimento", class: "bg-yellow-500" },
  away: { label: "Ausente", class: "bg-muted-foreground" },
};

const metrics = [
  { label: "Atendentes Online", value: agents.filter(a => a.status !== "away").length, icon: Headphones, color: "text-green-500" },
  { label: "Atendimentos em Curso", value: activeChats.length, icon: Users, color: "text-blue-500" },
  { label: "Fila de Espera", value: 3, icon: Clock, color: "text-yellow-500" },
];

export default function LiveView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Ao Vivo</h1>
        <Badge className="gap-1.5 bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
          <Radio className="h-3 w-3" /> Ao vivo
        </Badge>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn("p-2 rounded-lg bg-muted", m.color)}>
                <m.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agents Grid */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Atendentes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardContent className="p-3 flex flex-col items-center text-center gap-2">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {agent.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card", statusConfig[agent.status].class)} />
                </div>
                <p className="text-xs font-medium truncate w-full">{agent.name}</p>
                <Badge variant="secondary" className="text-[10px]">
                  {agent.chats} chats
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Chats Table */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Atendimentos Ativos</h2>
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Atendente</TableHead>
                  <TableHead className="hidden sm:table-cell">Canal</TableHead>
                  <TableHead className="hidden sm:table-cell">Departamento</TableHead>
                  <TableHead>Duração</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeChats.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell className="font-medium text-sm">{chat.client}</TableCell>
                    <TableCell className="text-sm">{chat.agent}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-[10px]">{chat.channel}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{chat.dept}</TableCell>
                    <TableCell className="text-sm font-mono">{chat.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
