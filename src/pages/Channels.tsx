import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Instagram, Send as TelegramIcon, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  account: string;
  connectedAt?: string;
  color: string;
}

const initialChannels: Channel[] = [
  { id: "1", name: "WhatsApp", icon: MessageSquare, connected: true, account: "+55 11 98765-4321", connectedAt: "15/01/2026", color: "text-green-500" },
  { id: "2", name: "Instagram", icon: Instagram, connected: true, account: "@talktreak", connectedAt: "20/01/2026", color: "text-pink-500" },
  { id: "3", name: "Telegram", icon: TelegramIcon, connected: false, account: "", color: "text-blue-500" },
  { id: "4", name: "Email", icon: Mail, connected: false, account: "", color: "text-yellow-500" },
];

export default function Channels() {
  const [channels, setChannels] = useState(initialChannels);

  const toggleConnection = (id: string) => {
    setChannels(prev => prev.map(ch =>
      ch.id === id ? { ...ch, connected: !ch.connected, connectedAt: !ch.connected ? new Date().toLocaleDateString("pt-BR") : undefined, account: !ch.connected ? "Conta demo" : "" } : ch
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Canais</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {channels.map((ch) => (
          <Card key={ch.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-muted", ch.color)}>
                    <ch.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ch.name}</h3>
                    {ch.account && <p className="text-xs text-muted-foreground">{ch.account}</p>}
                  </div>
                </div>
                <Badge variant="outline" className={cn("text-[10px]", ch.connected ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-muted text-muted-foreground")}>
                  {ch.connected ? "Conectado" : "Desconectado"}
                </Badge>
              </div>

              {ch.connectedAt && (
                <p className="text-xs text-muted-foreground mb-4">Conectado em: {ch.connectedAt}</p>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={ch.connected ? "destructive" : "default"}
                  className="text-xs"
                  onClick={() => toggleConnection(ch.id)}
                >
                  {ch.connected ? "Desconectar" : "Conectar"}
                </Button>
                {ch.connected && (
                  <Button size="sm" variant="outline" className="text-xs gap-1">
                    <Settings className="h-3 w-3" /> Configurar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
