import { motion } from "framer-motion";
import {
  MessageSquare, Phone, PhoneIncoming, Clock, Users, UserPlus, UserCheck,
  Headphones, Info, BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const row1 = [
  { label: "Atendimentos", value: 152, icon: MessageSquare, color: "hsl(0, 72%, 51%)" },
  { label: "Receptivos", value: 98, icon: PhoneIncoming, color: "hsl(142, 71%, 45%)" },
  { label: "Ativos", value: 34, icon: Phone, color: "hsl(210, 80%, 55%)" },
  { label: "Pendentes", value: 20, icon: Clock, color: "hsl(45, 90%, 50%)" },
];

const row2 = [
  { label: "Atendentes", value: 12, icon: Headphones, color: "hsl(270, 70%, 60%)" },
  { label: "Total contatos", value: 3482, icon: Users, color: "hsl(190, 80%, 50%)" },
  { label: "Novos contatos", value: 47, icon: UserPlus, color: "hsl(24, 95%, 53%)" },
  { label: "Contatos ativos", value: 289, icon: UserCheck, color: "hsl(340, 70%, 55%)" },
];

const row3 = [
  { label: "TMA", value: "04:32", icon: Clock, color: "hsl(160, 60%, 45%)" },
  { label: "1ª resposta", value: "00:45", icon: MessageSquare, color: "hsl(200, 70%, 50%)" },
];

const barData = [
  { dia: "Seg", atendimentos: 32 },
  { dia: "Ter", atendimentos: 48 },
  { dia: "Qua", atendimentos: 39 },
  { dia: "Qui", atendimentos: 52 },
  { dia: "Sex", atendimentos: 61 },
  { dia: "Sáb", atendimentos: 28 },
  { dia: "Dom", atendimentos: 19 },
];

const closingReasons = [
  { name: "Resolvido", value: 45, color: "hsl(142, 71%, 45%)" },
  { name: "Sem resposta", value: 20, color: "hsl(45, 90%, 50%)" },
  { name: "Transferido", value: 15, color: "hsl(210, 80%, 55%)" },
  { name: "Spam", value: 10, color: "hsl(0, 72%, 51%)" },
  { name: "Outros", value: 10, color: "hsl(270, 70%, 60%)" },
];

const departmentData = [
  { name: "Suporte", value: 40, color: "hsl(210, 80%, 55%)" },
  { name: "Vendas", value: 30, color: "hsl(142, 71%, 45%)" },
  { name: "Financeiro", value: 15, color: "hsl(45, 90%, 50%)" },
  { name: "Técnico", value: 15, color: "hsl(270, 70%, 60%)" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function MetricCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: any; color: string }) {
  return (
    <motion.div variants={item}>
      <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
        <CardContent className="p-5">
          <div className="absolute top-3 right-3">
            <Icon className="h-10 w-10 opacity-80" style={{ color }} />
          </div>
          <p className="text-3xl font-bold text-foreground mt-2">{typeof value === "number" ? value.toLocaleString("pt-BR") : value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs text-muted-foreground">{label}</span>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>{label} no período selecionado</TooltipContent>
            </UITooltip>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{greeting}, Administrador 👋</h1>
        <p className="text-muted-foreground text-sm">Aqui está o resumo do seu dia</p>
      </div>

      {/* Row 1 - 4 cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {row1.map((m) => <MetricCard key={m.label} {...m} />)}
      </motion.div>

      {/* Row 2 - 4 cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {row2.map((m) => <MetricCard key={m.label} {...m} />)}
      </motion.div>

      {/* Row 3 - 2 cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
        {row3.map((m) => <MetricCard key={m.label} {...m} />)}
      </motion.div>

      {/* Row 4 - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Atendimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Bar dataKey="atendimentos" fill="hsl(210, 80%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Motivo de fechamento</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={closingReasons} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {closingReasons.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Atendimento por departamento</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {departmentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
