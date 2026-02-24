import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PipelineCard {
  id: string;
  name: string;
  phone: string;
  value?: string;
  tags?: string[];
}

type Column = "novo" | "contato" | "proposta" | "fechado" | "perdido";

const COLUMNS: { key: Column; label: string; color: string }[] = [
  { key: "novo", label: "Novo Lead", color: "bg-blue-500" },
  { key: "contato", label: "Em Contato", color: "bg-yellow-500" },
  { key: "proposta", label: "Proposta", color: "bg-purple-500" },
  { key: "fechado", label: "Fechado", color: "bg-green-500" },
  { key: "perdido", label: "Perdido", color: "bg-red-500" },
];

const INITIAL: Record<Column, PipelineCard[]> = {
  novo: [
    { id: "1", name: "João Silva", phone: "+55 11 99999-0001", value: "R$ 2.500", tags: ["WhatsApp"] },
    { id: "2", name: "Maria Souza", phone: "+55 11 99999-0002", value: "R$ 1.800", tags: ["Instagram"] },
    { id: "8", name: "Larissa Ferreira", phone: "+55 11 99999-0008", value: "R$ 3.200" },
  ],
  contato: [
    { id: "3", name: "Carlos Lima", phone: "+55 11 99999-0003", value: "R$ 5.000", tags: ["VIP"] },
    { id: "9", name: "Bruno Mendes", phone: "+55 11 99999-0009", value: "R$ 900" },
  ],
  proposta: [
    { id: "4", name: "Ana Oliveira", phone: "+55 11 99999-0004", value: "R$ 12.000", tags: ["Enterprise"] },
  ],
  fechado: [
    { id: "5", name: "Pedro Costa", phone: "+55 11 99999-0005", value: "R$ 8.500", tags: ["VIP"] },
    { id: "6", name: "Fernanda Lima", phone: "+55 11 99999-0006", value: "R$ 3.000" },
  ],
  perdido: [
    { id: "7", name: "Ricardo Alves", phone: "+55 11 99999-0007", value: "R$ 1.200" },
  ],
};

export default function Pipeline() {
  const [columns, setColumns] = useState<Record<Column, PipelineCard[]>>(INITIAL);
  const dragItem = useRef<{ col: Column; id: string } | null>(null);
  const [dragOver, setDragOver] = useState<Column | null>(null);

  const handleDragStart = (col: Column, id: string) => {
    dragItem.current = { col, id };
  };

  const handleDrop = (targetCol: Column) => {
    if (!dragItem.current) return;
    const { col: srcCol, id } = dragItem.current;
    if (srcCol === targetCol) { dragItem.current = null; setDragOver(null); return; }
    setColumns((prev) => {
      const card = prev[srcCol].find((c) => c.id === id);
      if (!card) return prev;
      return { ...prev, [srcCol]: prev[srcCol].filter((c) => c.id !== id), [targetCol]: [...prev[targetCol], card] };
    });
    dragItem.current = null;
    setDragOver(null);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pipeline</h1>
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory touch-pan-x">
        {COLUMNS.map(({ key, label, color }) => (
          <div
            key={key}
            className={cn(
              "flex w-60 shrink-0 flex-col rounded-lg border border-border bg-card snap-start",
              dragOver === key && "ring-2 ring-primary"
            )}
            onDragOver={(e) => { e.preventDefault(); setDragOver(key); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(key)}
          >
            <div className={cn("flex items-center justify-between px-3 py-2 rounded-t-lg", color)}>
              <h3 className="text-sm font-semibold text-white">{label}</h3>
              <Badge className="bg-white/20 text-white border-0 text-[10px]">{columns[key].length}</Badge>
            </div>
            <div className="flex flex-col gap-2 p-3 min-h-[80px]">
              {columns[key].map((card) => (
                <Card key={card.id} draggable onDragStart={() => handleDragStart(key, card.id)} className="cursor-grab active:cursor-grabbing">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                          {card.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{card.name}</p>
                        <p className="text-[10px] text-muted-foreground">{card.phone}</p>
                      </div>
                    </div>
                    {card.value && <p className="text-xs font-semibold text-primary">{card.value}</p>}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex gap-1">
                        {card.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[9px] px-1.5">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
