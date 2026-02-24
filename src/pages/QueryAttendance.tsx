import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "finished" | "active" | "abandoned";

interface Record {
  id: string;
  protocol: string;
  client: string;
  agent: string;
  department: string;
  status: Status;
  date: string;
  duration: string;
}

const mockRecords: Record[] = [
  { id: "1", protocol: "#00421", client: "João Silva", agent: "Ana Suporte", department: "Suporte", status: "finished", date: "23/02/2026 10:32", duration: "12:34" },
  { id: "2", protocol: "#00420", client: "Maria Santos", agent: "Pedro Vendas", department: "Vendas", status: "finished", date: "23/02/2026 09:45", duration: "08:21" },
  { id: "3", protocol: "#00419", client: "Lucas Oliveira", agent: "Carlos Admin", department: "Suporte", status: "active", date: "23/02/2026 09:12", duration: "03:45" },
  { id: "4", protocol: "#00418", client: "Fernanda Costa", agent: "Ana Suporte", department: "Financeiro", status: "abandoned", date: "22/02/2026 16:30", duration: "22:10" },
  { id: "5", protocol: "#00417", client: "Ricardo Alves", agent: "Pedro Vendas", department: "Vendas", status: "finished", date: "22/02/2026 15:20", duration: "05:12" },
  { id: "6", protocol: "#00416", client: "Patrícia Lima", agent: "Julia Help", department: "Suporte", status: "finished", date: "22/02/2026 14:00", duration: "01:30" },
  { id: "7", protocol: "#00415", client: "André Souza", agent: "Carlos Admin", department: "Técnico", status: "active", date: "22/02/2026 11:48", duration: "15:48" },
  { id: "8", protocol: "#00414", client: "Camila Rocha", agent: "Mariana Sales", department: "Vendas", status: "finished", date: "21/02/2026 17:03", duration: "07:03" },
  { id: "9", protocol: "#00413", client: "Bruno Mendes", agent: "Ana Suporte", department: "Suporte", status: "abandoned", date: "21/02/2026 10:15", duration: "30:22" },
  { id: "10", protocol: "#00412", client: "Larissa Ferreira", agent: "Pedro Vendas", department: "Vendas", status: "finished", date: "21/02/2026 09:00", duration: "04:55" },
];

const statusConfig: { [k in Status]: { label: string; class: string } } = {
  finished: { label: "Finalizado", class: "bg-green-500/20 text-green-400 border-green-500/30" },
  active: { label: "Em andamento", class: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  abandoned: { label: "Abandonado", class: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function QueryAttendance() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");

  const agents = [...new Set(mockRecords.map(r => r.agent))];

  const filtered = mockRecords.filter((r) => {
    const matchSearch = r.client.toLowerCase().includes(search.toLowerCase()) || r.protocol.includes(search);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchAgent = agentFilter === "all" || r.agent === agentFilter;
    return matchSearch && matchStatus && matchAgent;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Consulta de Atendimentos</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou protocolo..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="finished">Finalizado</SelectItem>
            <SelectItem value="active">Em andamento</SelectItem>
            <SelectItem value="abandoned">Abandonado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={agentFilter} onValueChange={setAgentFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Atendente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {agents.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Protocolo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden sm:table-cell">Atendente</TableHead>
                <TableHead className="hidden md:table-cell">Departamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Data/Hora</TableHead>
                <TableHead>Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-sm">{r.protocol}</TableCell>
                  <TableCell className="font-medium text-sm">{r.client}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{r.agent}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{r.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-[10px]", statusConfig[r.status].class)}>
                      {statusConfig[r.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{r.date}</TableCell>
                  <TableCell className="text-sm font-mono">{r.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{filtered.length} registros</p>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="icon" className="h-8 w-8" disabled><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
