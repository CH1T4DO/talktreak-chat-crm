import { useState } from 'react';
import { Search, Send, Phone, MoreVertical, CheckCheck } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Maria Silva', msg: 'Gostaria de agendar uma consulta', time: '2min', unread: 2, avatar: 'MS', status: 'aberto' },
  { id: 2, name: 'Joo Santos', msg: 'Qual o valor do procedimento?', time: '5min', unread: 1, avatar: 'JS', status: 'aberto' },
  { id: 3, name: 'Ana Costa', msg: 'Obrigada pelo atendimento!', time: '12min', unread: 0, avatar: 'AC', status: 'resolvido' },
  { id: 4, name: 'Pedro Lima', msg: 'Preciso remarcar minha consulta', time: '18min', unread: 3, avatar: 'PL', status: 'aberto' },
  { id: 5, name: 'Carla Souza', msg: 'Vocs aceitam plano de sade?', time: '25min', unread: 0, avatar: 'CS', status: 'bot' },
  { id: 6, name: 'Roberto Alves', msg: 'Quando  minha prxima consulta?', time: '1h', unread: 1, avatar: 'RA', status: 'aberto' },
];

const msgs = [
  { id: 1, from: 'client', text: 'Ol! Gostaria de agendar uma consulta de avaliao facial.', time: '09:32' },
  { id: 2, from: 'agent', text: 'Ol Maria! Tudo bem? Claro, temos horrios disponveis esta semana. Qual dia seria melhor para voc?', time: '09:33' },
  { id: 3, from: 'client', text: 'Pode ser na quinta-feira  tarde?', time: '09:35' },
  { id: 4, from: 'agent', text: 'Quinta temos disponvel s 14h ou 16h. Qual prefere?', time: '09:36' },
  { id: 5, from: 'client', text: 's 14h perfeito!', time: '09:37' },
  { id: 6, from: 'agent', text: 'timo! Agendado para quinta-feira s 14h. Vou enviar a confirmao por aqui. Precisa de mais alguma informao?', time: '09:38' },
  { id: 7, from: 'client', text: 'No, obrigada! At quinta ', time: '09:39' },
];

export default function Conversations() {
  const [selected, setSelected] = useState(contacts[0]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [filter, setFilter] = useState('todos');

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'todos' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Lista */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-3">Conversas</h2>
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
          <div className="flex gap-1">
            {['todos','aberto','resolvido'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-1 text-xs rounded-lg font-medium capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filtered.map(c => (
            <div key={c.id} onClick={() => setSelected(c)} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${selected.id === c.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{c.msg}</p>
              </div>
              {c.unread > 0 && <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{c.unread}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{selected.avatar}</div>
            <div>
              <div className="font-semibold text-gray-900">{selected.name}</div>
              <div className="text-xs text-green-500">Online</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Assumir</button>
            <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">Resolver</button>
            <button className="p-2 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map(m => (
            <div key={m.id} className={`flex ${m.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${m.from === 'agent' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'}`}>
                <p className="text-sm">{m.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${m.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs ${m.from === 'agent' ? 'text-blue-200' : 'text-gray-400'}`}>{m.time}</span>
                  {m.from === 'agent' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && setMsg('')} placeholder="Digite uma mensagem..." className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-400" />
            <button onClick={() => setMsg('')} className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
