import { useState } from 'react';
import { Bot, Play, Pause, Plus, Zap, TrendingUp, GitBranch } from 'lucide-react';

const flows = [
  { id: 1, name: 'Boas-vindas', active: true, triggers: 'Mensagem inicial', completions: 289, nodes: 8, rate: 87 },
  { id: 2, name: 'Agendamento', active: true, triggers: 'agendar, consulta, marcar', completions: 156, nodes: 12, rate: 74 },
  { id: 3, name: 'FAQ Preos', active: true, triggers: 'preo, valor, quanto custa', completions: 98, nodes: 6, rate: 91 },
  { id: 4, name: 'Suporte Ps-Atendimento', active: false, triggers: 'problema, reclamao', completions: 34, nodes: 10, rate: 65 },
  { id: 5, name: 'Captura de Leads', active: true, triggers: 'informaes, quero saber', completions: 201, nodes: 9, rate: 82 },
];

export default function Chatbot() {
  const [flowList, setFlowList] = useState(flows);
  const toggle = (id: number) => setFlowList(f => f.map(x => x.id === id ? {...x, active: !x.active} : x));
  const activeCount = flowList.filter(f => f.active).length;
  const totalCompletions = flowList.reduce((a, f) => a + f.completions, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-gray-900">Chatbot</h1><p className="text-sm text-gray-500 mt-1">Gerencie seus fluxos de automao</p></div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4" /> Novo Fluxo</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[['Fluxos Ativos', activeCount, 'text-green-600'],['Disparos Hoje', totalCompletions, 'text-blue-600'],['Taxa Concluso', '83%', 'text-purple-600']].map(([l,v,cls])=>(
          <div key={String(l)} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`text-2xl font-bold ${cls}`}>{String(v)}</div>
            <div className="text-sm text-gray-500">{String(l)}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {flowList.map(f => (
          <div key={f.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.active ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Bot className={`w-5 h-5 ${f.active ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{f.name}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1"><Zap className="w-3 h-3" />{f.triggers}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center hidden md:block"><div className="text-sm font-bold text-gray-900">{f.completions}</div><div className="text-xs text-gray-400">Disparos</div></div>
                <div className="text-center hidden md:block"><div className="text-sm font-bold text-gray-900">{f.nodes}</div><div className="text-xs text-gray-400">Ns</div></div>
                <button onClick={() => toggle(f.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${f.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f.active ? <><Play className="w-3 h-3" /> Ativo</> : <><Pause className="w-3 h-3" /> Inativo</>}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${f.rate}%`}}></div>
              </div>
              <span className="text-xs text-gray-500">{f.rate}% concluso</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <GitBranch className="w-6 h-6" />
          <h3 className="font-semibold text-lg">Flow Builder Visual</h3>
        </div>
        <p className="text-blue-100 text-sm mb-4">Crie fluxos complexos arrastando e soltando elementos no editor visual.</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">Abrir Editor Visual</button>
      </div>
    </div>
  );
}
