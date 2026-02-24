import { useState } from "react";
import { apiPost, apiDelete } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Zap } from "lucide-react";

interface Flow {
  id: string;
  name: string;
  trigger: string;
  response: string;
  active: boolean;
  createdAt: string;
}

const mockFlows: Flow[] = [
  { id: "1", name: "Boas-vindas", trigger: "/start", response: "Olá! Bem-vindo ao TalkTreak. Como posso ajudar?", active: true, createdAt: "10/01/2026" },
  { id: "2", name: "Horário de Funcionamento", trigger: "horário", response: "Nosso horário é de segunda a sexta, das 8h às 18h.", active: true, createdAt: "12/01/2026" },
  { id: "3", name: "Suporte Técnico", trigger: "suporte", response: "Vou transferir você para nosso time de suporte. Aguarde um momento.", active: false, createdAt: "15/01/2026" },
  { id: "4", name: "Preços", trigger: "preço", response: "Confira nossos planos em talktreak.com/precos", active: true, createdAt: "20/01/2026" },
];

export default function Chatbot() {
  const [flows, setFlows] = useState<Flow[]>(mockFlows);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");

  const create = async () => {
    if (!name) return;
    const newFlow: Flow = {
      id: Date.now().toString(), name, trigger, response, active: true, createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setFlows(prev => [...prev, newFlow]);
    setName(""); setTrigger(""); setResponse(""); setOpen(false);
    try { await apiPost("/api/chatbot/flows", { name, trigger, response }); } catch {}
  };

  const toggle = (id: string) => {
    setFlows(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const remove = (id: string) => {
    setFlows(prev => prev.filter(f => f.id !== id));
    apiDelete(`/api/chatbot/flows/${id}`).catch(() => {});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chatbot</h1>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Fluxo
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">Gatilho</TableHead>
                <TableHead className="hidden md:table-cell">Resposta</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="hidden sm:table-cell">Data</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {flows.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-sm">{f.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px] font-mono">{f.trigger}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[200px] truncate">{f.response}</TableCell>
                  <TableCell>
                    <Switch checked={f.active} onCheckedChange={() => toggle(f.id)} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{f.createdAt}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(f.id)}>
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
            <DialogTitle>Novo Fluxo</DialogTitle>
            <DialogDescription>Configure o fluxo do chatbot.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome do fluxo" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Palavra-gatilho" value={trigger} onChange={(e) => setTrigger(e.target.value)} />
            <Input placeholder="Resposta automática" value={response} onChange={(e) => setResponse(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={create}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
