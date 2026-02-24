import { useState } from "react";
import { apiPost, apiDelete } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { MessageSquare, Trash2, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  tags: string[];
  createdAt: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "João Silva", phone: "+55 11 98765-4321", email: "joao@email.com", tags: ["VIP", "Suporte"], createdAt: "15/01/2026" },
  { id: "2", name: "Maria Santos", phone: "+55 21 99876-5432", email: "maria@email.com", tags: ["Vendas"], createdAt: "18/01/2026" },
  { id: "3", name: "Pedro Costa", phone: "+55 31 97654-3210", email: "pedro@email.com", tags: ["Suporte"], createdAt: "20/01/2026" },
  { id: "4", name: "Ana Oliveira", phone: "+55 41 96543-2109", email: "ana@email.com", tags: ["Financeiro", "VIP"], createdAt: "22/01/2026" },
  { id: "5", name: "Lucas Ferreira", phone: "+55 51 95432-1098", email: "lucas@email.com", tags: ["Vendas"], createdAt: "25/01/2026" },
  { id: "6", name: "Fernanda Lima", phone: "+55 61 94321-0987", email: "fernanda@email.com", tags: ["Suporte"], createdAt: "28/01/2026" },
  { id: "7", name: "Ricardo Alves", phone: "+55 71 93210-9876", email: "ricardo@email.com", tags: ["VIP"], createdAt: "01/02/2026" },
  { id: "8", name: "Camila Rocha", phone: "+55 81 92109-8765", email: "camila@email.com", tags: ["Vendas", "Suporte"], createdAt: "05/02/2026" },
];

const tagColors: Record<string, string> = {
  VIP: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Suporte: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Vendas: "bg-green-500/20 text-green-400 border-green-500/30",
  Financeiro: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const create = async () => {
    if (!name || !phone) return;
    const newContact: Contact = {
      id: Date.now().toString(), name, phone, email: "", tags: [], createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setContacts(prev => [...prev, newContact]);
    setName(""); setPhone(""); setOpen(false);
    try { await apiPost("/api/contacts", { name, phone }); } catch {}
  };

  const remove = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    apiDelete(`/api/contacts/${id}`).catch(() => {});
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contatos</h1>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Contato
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou telefone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contato</TableHead>
                <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden sm:table-cell">Tags</TableHead>
                <TableHead className="hidden md:table-cell">Criado em</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                          {c.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{c.phone}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{c.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {c.tags.map(tag => (
                        <Badge key={tag} variant="outline" className={cn("text-[10px]", tagColors[tag] || "")}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{c.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => navigate("/conversations")}>
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(c.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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
            <DialogTitle>Novo Contato</DialogTitle>
            <DialogDescription>Preencha os dados do contato.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={create}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
