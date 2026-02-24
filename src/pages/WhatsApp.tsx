import { useState, useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Wifi, WifiOff, QrCode, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WhatsApp() {
  const [status, setStatus] = useState<"connected" | "disconnected">("disconnected");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    socket.on("wa_status", (data: { status: "connected" | "disconnected" }) => {
      setStatus(data.status);
      if (data.status === "connected") setQrCode(null);
    });
    socket.on("qr", (data: string) => setQrCode(data));
    return () => { socket.off("wa_status"); socket.off("qr"); };
  }, []);

  const connect = async () => {
    setLoading(true);
    try { await apiPost("/api/whatsapp/connect"); } catch {} finally { setLoading(false); }
  };

  const disconnect = async () => {
    setLoading(true);
    try { await apiPost("/api/whatsapp/disconnect"); setQrCode(null); } catch {} finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">WhatsApp</h1>

      <div className="max-w-lg mx-auto">
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", status === "connected" ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground")}>
                  {status === "connected" ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-semibold">Status da Conexão</h3>
                  <p className="text-sm text-muted-foreground">{status === "connected" ? "WhatsApp conectado" : "Aguardando conexão"}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn(status === "connected" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30")}>
                {status === "connected" ? "Online" : "Offline"}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={connect} disabled={loading || status === "connected"} className="flex-1 gap-2">
                <MessageSquare className="h-4 w-4" /> Conectar
              </Button>
              <Button variant="destructive" onClick={disconnect} disabled={loading || status === "disconnected"} className="flex-1 gap-2">
                <WifiOff className="h-4 w-4" /> Desconectar
              </Button>
            </div>

            {/* QR Code */}
            {qrCode ? (
              <div className="rounded-lg border border-border bg-background p-6 text-center space-y-3">
                <QrCode className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Escaneie o QR Code</p>
                <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto rounded-lg" />
                <p className="text-xs text-muted-foreground">Abra o WhatsApp no seu celular e escaneie o código acima.</p>
              </div>
            ) : status === "disconnected" && (
              <div className="rounded-lg border border-dashed border-border p-6 text-center space-y-3">
                <Smartphone className="h-8 w-8 mx-auto text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Como conectar</p>
                  <ol className="text-xs text-muted-foreground space-y-1 text-left max-w-xs mx-auto">
                    <li>1. Clique em "Conectar" acima</li>
                    <li>2. Abra o WhatsApp no celular</li>
                    <li>3. Vá em Configurações → Aparelhos conectados</li>
                    <li>4. Escaneie o QR Code que aparecerá aqui</li>
                  </ol>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
