import { useState } from 'react';
import { Plus, DollarSign, User, Clock } from 'lucide-react';

const cols = ['Novo Lead','Qualificado','Proposta','Negociao','Fechado'];
const initialCards: Record<string, any[]> = {
  'Novo Lead': [
    { id:1, company:'Clnica So Lucas', value:'R$ 2.500', agent:'Ana', time:'2h' },
    { id:2, company:'Studio Beleza+', value:'R$ 1.800', agent:'Joo', time:'5h' },
    { id:3, company:'Spa Renovar', value:'R$ 4.200', agent:'Maria', time:'1d' },
  ],
  'Qualificado': [
    { id:4, company:'Instituto Esttica Pro', value:'R$ 6.500', agent:'Pedro', time:'1d' },
    { id:5, company:'Clnica Bem Estar', value:'R$ 3.100', agent:'Ana', time:'2d' },
  ],
  'Proposta': [
    { id:6, company:'Centro Mdico Vida', value:'R$ 8.900', agent:'Joo', time:'3d' },
    { id:7, company:'Clnica Harmonia', value:'R$ 5.400', agent:'Maria', time:'3d' },
  ],
  'Negociao': [
    { id:8, company:'Spa Premium RN', value:'R$ 12.000', agent:'Pedro', time:'5d' },
    { id:9, company:'Esttica Total', value:'R$ 7.800', agent:'Ana', time:'6d' },
  ],
  'Fechado': [
    { id:10, company:'Clnica Dapaz', value:'R$ 15.000', agent:'Joo', time:'7d' },
    { id:11, company:'Beauty Center', value:'R$ 9.200', agent:'Maria', time:'10d' },
    { id:12, company:'Instituto Alpha', value:'R$ 11.500', agent:'Pedro', time:'12d' },
  ],
};

const colColors: Record<string, string> = {
  'Novo Lead':'border-t-blue-400','Qualificado':'border-t-yellow-400','Proposta':'border-t-orange-400','Negociao':'border-t-purple-400','Fechado':'border-t-green-400'
};

export default function Pipeline() {
  const [cards] = useState(initialCards);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Pipeline</h1><p className="text-sm text-gray-500 mt-1">Acompanhe seus negcios em andamento</p></div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4" />Novo Negcio</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {cols.map(col => (
          <div key={col} className="flex-shrink-0 w-64">
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 ${colColors[col]}`}>
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <span className="font-medium text-sm text-gray-900">{col}</span>
                <span className="w-5 h-5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center justify-center font-bold">{cards[col]?.length || 0}</span>
              </div>
              <div className="p-2 space-y-2 min-h-32">
                {(cards[col] || []).map(card => (
                  <div key={card.id} className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 border border-gray-100">
                    <div className="font-medium text-xs text-gray-900 mb-2">{card.company}</div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-green-500" />{card.value}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{card.agent}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-300 mt-1"><Clock className="w-3 h-3" />{card.time}</div>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <button className="w-full flex items-center justify-center gap-1 py-1.5 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><Plus className="w-3 h-3" />Adicionar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
