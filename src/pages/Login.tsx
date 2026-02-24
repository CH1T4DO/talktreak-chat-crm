import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { MessageSquare, Bot, Link2, Mail, KeyRound, Eye, EyeOff, X } from "lucide-react";

const DEMO_EMAIL = "admin@talktreak.com";
const DEMO_PASSWORD = "admin123";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo credentials - works without backend
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      login("demo-token-talktreak-2024");
      setLoading(false);
      navigate("/dashboard", { replace: true });
      return;
    }

    try {
      const data = await apiPost("/api/auth/login", { email, password });
      login(data.token);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message || "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Hero */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(217,33%,14%)] to-[hsl(var(--background))] p-8 md:w-[60%] md:p-16"
      >
        {/* Decorative glow */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            <span className="text-primary">Talk</span>{" "}
            <span className="text-primary">Treak</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-md text-lg text-muted-foreground md:text-xl"
          >
            Inteligência e Automação para sua Comunicação
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 flex gap-8"
          >
            {[
              { icon: MessageSquare, label: "Chat" },
              { icon: Bot, label: "AI" },
              { icon: Link2, label: "Integração" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex w-full flex-col items-center justify-center bg-card p-8 md:w-[40%] md:p-12"
      >
        <div className="w-full max-w-sm space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest">TALK TREAK</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-1"
          >
            <h3 className="text-2xl font-bold text-foreground">Bem vindo!</h3>
            <p className="text-sm text-muted-foreground">
              Faça login para acessar sua conta
            </p>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive text-center rounded-md bg-destructive/10 p-2"
            >
              {error}
            </motion.p>
          )}

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 pr-8"
                />
                {email && (
                  <button type="button" onClick={() => setEmail("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Senha</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-xs text-primary hover:underline">
                Recuperar minha senha
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full text-sm font-bold tracking-wider" disabled={loading}>
                {loading ? "ENTRANDO..." : "LOGIN"}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
