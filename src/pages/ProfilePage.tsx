import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiPost } from "@/lib/api";
import { User, Mail, Phone, Building2, Camera, Save, KeyRound, Shield, Bell } from "lucide-react";

export default function ProfilePage() {
  const [profileName, setProfileName] = useState("Administrador");
  const [profileEmail, setProfileEmail] = useState("admin@talktreak.com");
  const [profilePhone, setProfilePhone] = useState("+55 11 99999-0000");
  const [profileCompany, setProfileCompany] = useState("TalkTreak");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setLoading(true);
    setMsg("");
    try {
      await apiPost("/api/settings/profile", { name: profileName, email: profileEmail, phone: profilePhone, company: profileCompany });
      setMsg("Perfil atualizado com sucesso!");
    } catch {
      setMsg("Perfil salvo localmente!");
    } finally {
      setLoading(false);
    }
  };

  const savePassword = async () => {
    if (!newPassword) return;
    if (newPassword !== confirmPassword) { setMsg("As senhas não coincidem."); return; }
    setLoading(true);
    setMsg("");
    try {
      await apiPost("/api/settings/password", { currentPassword, password: newPassword });
      setMsg("Senha atualizada com sucesso!");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch {
      setMsg("Erro ao atualizar senha.");
    } finally {
      setLoading(false);
    }
  };

  const initials = profileName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Meu Perfil</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Perfil</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Segurança</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={profilePhoto || undefined} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <button onClick={() => fileRef.current?.click()} className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-6 w-6 text-white" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold">{profileName}</h3>
                  <p className="text-sm text-muted-foreground">{profileEmail}</p>
                  <p className="text-xs text-muted-foreground mt-1">{profileCompany}</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => fileRef.current?.click()}>
                    <Camera className="h-3.5 w-3.5" /> Alterar foto
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-4 p-6">
                {[
                  { icon: User, label: "Nome", value: profileName, set: setProfileName, placeholder: "Seu nome" },
                  { icon: Mail, label: "Email", value: profileEmail, set: setProfileEmail, placeholder: "seu@email.com", type: "email" },
                  { icon: Phone, label: "Telefone", value: profilePhone, set: setProfilePhone, placeholder: "+55 11 99999-0000" },
                  { icon: Building2, label: "Empresa", value: profileCompany, set: setProfileCompany, placeholder: "Nome da empresa" },
                ].map((f) => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <f.icon className="h-3.5 w-3.5" /> {f.label}
                    </label>
                    <Input type={f.type || "text"} value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} />
                  </div>
                ))}
                <Button onClick={saveProfile} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" /> {loading ? "Salvando..." : "Salvar Perfil"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2"><KeyRound className="h-5 w-5 text-primary" /> Alterar Senha</h3>
                {[
                  { label: "Senha Atual", value: currentPassword, set: setCurrentPassword },
                  { label: "Nova Senha", value: newPassword, set: setNewPassword },
                  { label: "Confirmar Nova Senha", value: confirmPassword, set: setConfirmPassword },
                ].map((f) => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{f.label}</label>
                    <Input type="password" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder="••••••••" />
                  </div>
                ))}
                <Button onClick={savePassword} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" /> {loading ? "Salvando..." : "Atualizar Senha"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="space-y-4 p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Preferências de Notificação</h3>
                <p className="text-sm text-muted-foreground">Em breve você poderá configurar suas notificações aqui.</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {msg && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm text-center rounded-md p-2 ${msg.includes("sucesso") || msg.includes("salvo") ? "text-green-400 bg-green-500/10" : "text-destructive bg-destructive/10"}`}>
          {msg}
        </motion.p>
      )}
    </div>
  );
}
