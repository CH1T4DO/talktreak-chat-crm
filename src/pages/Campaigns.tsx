import { useState } from 'react';
import { Send, Pause, Play, Plus, Users, CheckCircle, Eye, MessageSquare } from 'lucide-react';

const campaigns = [
  { id: 1, name: 'Promoo Janeiro', status: 'concluida', sent: 1200, delivered: 1178, read: 856, responses: 124, date: '15/01/2026' },
  { id: 2, name: 'Reativao Clientes', status: 'ativa', sent: 800, delivered: 792, read: 543, responses: 89, date: '20/01/2026' },
  { id: 3, name: 'Lembrete Consultas', status: 'ativa', sent: 450, delivered: 448, read: 398, responses: 67, date: '22/01/2026' },
  { id: 4, name: 'Newsletter Fevereiro', status: 'agendada', sent: 0, delivered: 0, read: 0, responses: 0, date: '01/02/2026' },
  { id: 5, name: 'Oferta Especial VIP', status: 'pausada', sent: 320, delivered: 315, read: 210, responses: 45, date: '10/01/2026' },
];

const statusStyle: Record<string, string> = {
  ativa: 'bg-green-100 text-green-700',
  pausada: 'bg-yellow-100 text-yellow-700',
  concluida: 'bg-gray-100 text-gray-600',
  agendada: 'bg-blue-100 text-blue-700',
  rascunho: 'bg-orange-100 text-orange-700',
};

export default function Campaigns() {
  const [filter, setFilter] = useState('todas');
  const filtered = filter === 'todas' ? campaigns : campaigns.filter(c => c.status === filter);
  const total = campaigns.reduce((a, c) => a + c.sent, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-gray-900">Campanhas</h1><p className="text-sm text-gray-500 mt-1">Gerencie seus disparos em massa</p></div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4" /> Nova Campanha</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[['Total Enviadas', total.toLocaleString(), 'text-blue-600'],['Taxa Entrega','98.2%','text-green-600'],['Taxa Leitura','68.4%','text-purple-600'],['Respostas','490','text-orange-600']].map(([l,v,cls])=>(
          <div key={String(l)} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`text-2xl font-bold ${cls}`}>{String(v)}</div>
            <div className="text-sm text-gray-500">{String(l)}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-2 flex-wrap">
            {['todas','ativa','agendada','pausada','concluida'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${filter===f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map(c=>(
            <div key={c.id} className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 text-sm">{c.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                </div>
                <div className="text-xs text-gray-400">{c.date}</div>
              </div>
              <div className="hidden md:flex items-center gap-6 text-center">
                {[['Enviadas',c.sent,'text-blue-600'],['Entregues',c.delivered,'text-green-600'],['Lidas',c.read,'text-purple-600'],['Respostas',c.responses,'text-orange-600']].map(([l,v,cls])=>(
                  <div key={String(l)}><div className={`text-sm font-bold ${cls}`}>{String(v)}</div><div className="text-xs text-gray-400">{String(l)}</div></div>
                ))}
              </div>
              <div className="flex gap-2">
                {c.status === 'ativa' && <button className="p-1.5 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200"><Pause className="w-4 h-4" /></button>}
                {c.status === 'pausada' && <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"><Play className="w-4 h-4" /></button>}
                {c.status === 'agendada' && <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Send className="w-4 h-4" /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
