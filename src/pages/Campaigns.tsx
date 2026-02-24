import { useState } from "react";
import { apiPost, apiDelete } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Users, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "inactive" | "scheduled" | "completed";
  recipients: number;
  sent: number;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  { id: "1", name: "Promoção de Verão", status: "active", recipients: 1200, sent: 890, createdAt: "20/02/2026" },
  { id: "2", name: "Boas-vindas Novos Clientes", status: "active", recipients: 350, sent: 350, createdAt: "15/02/2026" },
  { id: "3", name: "Reengajamento Q1", status: "scheduled", recipients: 2500, sent: 0, createdAt: "22/02/2026" },
  { id: "4", name: "Black Friday 2025", status: "completed", recipients: 5000, sent: 4850, createdAt: "25/11/2025" },
  { id: "5", name: "Newsletter Fevereiro", status: "inactive", recipients: 3200, sent: 0, createdAt: "01/02/2026" },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  active: { label: "Ativa", class: "bg-green-500/20 text-green-400 border-green-500/30" },
  inactive: { label: "Inativa", class: "bg-muted text-muted-foreground" },
  scheduled: { label: "Agendada", class: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  completed: { label: "Concluída", class: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const create = async () => {
    if (!name) return;
    const newCampaign: Campaign = {
      id: Date.now().toString(), name, status: "inactive", recipients: 0, sent: 0, createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setCampaigns(prev => [...prev, newCampaign]);
    setName(""); setMessage(""); setOpen(false);
    try { await apiPost("/api/campaigns", { name, message }); } catch {}
  };

  const remove = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    apiDelete(`/api/campaigns/${id}`).catch(() => {});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campanhas</h1>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Nova Campanha
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Destinatários</TableHead>
                <TableHead className="hidden sm:table-cell">Enviados</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-sm">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-[10px]", statusConfig[c.status].class)}>
                      {statusConfig[c.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" /> {c.recipients.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground"><Send className="h-3 w-3" /> {c.sent.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{c.createdAt}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(c.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Campanha</DialogTitle>
            <DialogDescription>Defina o nome e a mensagem da campanha.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome da campanha" value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea placeholder="Mensagem" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={create}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
