import { useState } from 'react';
import { Search, Plus, Tag, Phone, Mail, User } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Maria Silva', phone: '(84) 99999-1111', email: 'maria@email.com', tags: ['cliente','vip'], lastContact: '2min' },
  { id: 2, name: 'Joo Santos', phone: '(84) 99999-2222', email: 'joao@email.com', tags: ['lead'], lastContact: '5min' },
  { id: 3, name: 'Ana Costa', phone: '(84) 99999-3333', email: 'ana@email.com', tags: ['cliente'], lastContact: '1h' },
  { id: 4, name: 'Pedro Lima', phone: '(84) 99999-4444', email: 'pedro@email.com', tags: ['vip','pro'], lastContact: '2h' },
  { id: 5, name: 'Carla Souza', phone: '(84) 99999-5555', email: 'carla@email.com', tags: ['lead'], lastContact: '3h' },
  { id: 6, name: 'Roberto Alves', phone: '(84) 99999-6666', email: 'roberto@email.com', tags: ['cliente'], lastContact: '1d' },
  { id: 7, name: 'Fernanda Cruz', phone: '(84) 99999-7777', email: 'fernanda@email.com', tags: ['enterprise'], lastContact: '1d' },
  { id: 8, name: 'Lucas Mendes', phone: '(84) 99999-8888', email: 'lucas@email.com', tags: ['lead'], lastContact: '2d' },
  { id: 9, name: 'Patrcia Nunes', phone: '(84) 99999-9999', email: 'patricia@email.com', tags: ['cliente','vip'], lastContact: '3d' },
  { id: 10, name: 'Diego Ferreira', phone: '(84) 99988-0000', email: 'diego@email.com', tags: ['inativo'], lastContact: '7d' },
];

const tagColors: Record<string, string> = {
  cliente: 'bg-blue-100 text-blue-700',
  vip: 'bg-yellow-100 text-yellow-700',
  lead: 'bg-green-100 text-green-700',
  pro: 'bg-purple-100 text-purple-700',
  enterprise: 'bg-indigo-100 text-indigo-700',
  inativo: 'bg-gray-100 text-gray-500',
};

export default function Contacts() {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contatos</h1>
          <p className="text-sm text-gray-500 mt-1">{contacts.length} contatos cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          <Plus className="w-4 h-4" /> Novo Contato
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[['Total', contacts.length, 'bg-blue-50 text-blue-600'],['Leads', contacts.filter(c=>c.tags.includes('lead')).length, 'bg-green-50 text-green-600'],['Clientes', contacts.filter(c=>c.tags.includes('cliente')).length, 'bg-purple-50 text-purple-600']].map(([l,v,cls]) => (
          <div key={String(l)} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`text-2xl font-bold ${String(cls).split(' ')[1]}`}>{String(v)}</div>
            <div className="text-sm text-gray-500">{String(l)}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Telefone</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Tags</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">ltimo Contato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{c.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                      <span className="text-sm font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{c.phone}</td>
                  <td className="p-4 text-sm text-gray-600">{c.email}</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {c.tags.map(t => <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[t] || 'bg-gray-100 text-gray-600'}`}>{t}</span>)}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{c.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
