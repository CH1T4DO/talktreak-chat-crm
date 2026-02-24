import { Users, MessageSquare, CheckCircle, Clock, Bot, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Conversas Hoje', value: '127', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Atendimentos Abertos', value: '34', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { label: 'Resolvidos', value: '93', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Total Contatos', value: '1.842', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Tempo Mdio', value: '4:32', icon: TrendingUp, color: 'text-pink-500', bg: 'bg-pink-50' },
  { label: 'Chatbot Hoje', value: '289', icon: Bot, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

const conversations = [
  { id: 1, name: 'Maria Silva', msg: 'Ol, gostaria de agendar uma consulta', time: '2min', status: 'aberto', avatar: 'MS' },
  { id: 2, name: 'Joo Santos', msg: 'Qual o valor do procedimento?', time: '5min', status: 'aberto', avatar: 'JS' },
  { id: 3, name: 'Ana Costa', msg: 'Obrigada pelo atendimento!', time: '12min', status: 'resolvido', avatar: 'AC' },
  { id: 4, name: 'Pedro Lima', msg: 'Preciso remarcar minha consulta', time: '18min', status: 'aberto', avatar: 'PL' },
  { id: 5, name: 'Carla Souza', msg: 'Vocs aceitam plano de sade?', time: '25min', status: 'bot', avatar: 'CS' },
];

const channels = [
  { name: 'WhatsApp Principal', status: 'online', msgs: 89 },
  { name: 'WhatsApp Suporte', status: 'online', msgs: 34 },
  { name: 'Chatbot IA', status: 'online', msgs: 289 },
  { name: 'Campanhas', status: 'online', msgs: 12 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Viso geral do seu atendimento</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Conversas Recentes</h2>
            <button className="text-sm text-blue-600 hover:underline">Ver todas</button>
          </div>
          <div className="divide-y divide-gray-50">
            {conversations.map((c) => (
              <div key={c.id} className="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-gray-900">{c.name}</span>
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.msg}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  c.status === 'aberto' ? 'bg-yellow-100 text-yellow-700' :
                  c.status === 'resolvido' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Status dos Canais</h2>
          </div>
          <div className="p-4 space-y-3">
            {channels.map((ch) => (
              <div key={ch.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">{ch.name}</span>
                </div>
                <span className="text-xs font-medium text-gray-500">{ch.msgs} msgs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
