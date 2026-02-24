import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plug, Zap, Tag, XCircle, FileText, UserCheck, MapPin, Kanban, Package, Target, TrendingDown,
  Star, Users, Building2, Columns3, User, Clock, CalendarOff, Webhook, Settings, Brain,
} from "lucide-react";

interface SettingCard {
  icon: any;
  title: string;
  description: string;
  path?: string;
}

const sections: { title: string; items: SettingCard[] }[] = [
  {
    title: "Atendimento",
    items: [
      { icon: Plug, title: "Plug-in", description: "Configurar widget de chat no site" },
      { icon: Zap, title: "Mensagens Rápidas", description: "Atalhos de respostas frequentes" },
      { icon: Tag, title: "Etiquetas", description: "Gerenciar tags para conversas" },
      { icon: XCircle, title: "Motivos de Fechamento", description: "Motivos para encerrar atendimentos" },
      { icon: FileText, title: "Templates", description: "Modelos de mensagens aprovados" },
    ],
  },
  {
    title: "Vendas",
    items: [
      { icon: UserCheck, title: "Status Cliente", description: "Definir status dos clientes" },
      { icon: MapPin, title: "Origens do Lead", description: "De onde vêm seus leads" },
      { icon: Kanban, title: "Pipeline", description: "Etapas do funil de vendas" },
      { icon: Package, title: "Produtos", description: "Catálogo de produtos/serviços" },
      { icon: Target, title: "Meta de Vendas", description: "Definir metas para equipe" },
      { icon: TrendingDown, title: "Motivos das Perdas", description: "Por que oportunidades são perdidas" },
    ],
  },
  {
    title: "Cadastros",
    items: [
      { icon: Star, title: "Avaliação", description: "Configurar avaliações de atendimento" },
      { icon: Users, title: "Usuários", description: "Gerenciar atendentes e permissões" },
      { icon: Building2, title: "Departamento", description: "Setores e equipes da empresa" },
      { icon: Columns3, title: "Campos Customizados", description: "Campos extras para contatos" },
      { icon: User, title: "Perfil", description: "Configurações do seu perfil", path: "/profile" },
    ],
  },
  {
    title: "Avançado",
    items: [
      { icon: Clock, title: "Horário de Atendimento", description: "Horários de funcionamento" },
      { icon: CalendarOff, title: "Feriados", description: "Dias sem atendimento" },
      { icon: Webhook, title: "API/Webhook", description: "Integrações via API e webhooks" },
      { icon: Settings, title: "Configurações Avançadas", description: "Opções avançadas do sistema" },
      { icon: Brain, title: "Prompts", description: "Configurar prompts de IA" },
    ],
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Configurações</h1>

      <Accordion type="multiple" defaultValue={sections.map((s) => s.title)} className="space-y-3">
        {sections.map((section) => (
          <AccordionItem key={section.title} value={section.title} className="border rounded-lg overflow-hidden border-l-4 border-l-primary">
            <AccordionTrigger className="px-4 py-3 hover:no-underline text-base font-semibold">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <motion.div key={item.title} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className="cursor-pointer hover:shadow-md transition-shadow h-full"
                      onClick={() => item.path && navigate(item.path)}
                    >
                      <CardContent className="flex items-start gap-3 p-4">
                        <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-primary">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
