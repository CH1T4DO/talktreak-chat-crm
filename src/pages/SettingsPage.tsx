import { useState } from 'react';
import { Save, Bell, Shield, Globe, Building } from 'lucide-react';

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ newMsg: true, resolved: false, campaigns: true, system: true });
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-bold text-gray-900">Configuraes</h1><p className="text-sm text-gray-500 mt-1">Gerencie as preferncias do sistema</p></div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4"><Building className="w-5 h-5 text-blue-600" /><h2 className="font-semibold text-gray-900">Geral</h2></div>
        <div className="space-y-4">
          {[['Nome da Empresa','TalkTreak'],['Fuso Horrio','America/Recife (UTC-3)'],['Idioma','Portugus (Brasil)']].map(([l,v])=>(
            <div key={String(l)}>
              <label className="text-sm font-medium text-gray-700 block mb-1">{String(l)}</label>
              <input defaultValue={String(v)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-blue-600" /><h2 className="font-semibold text-gray-900">Notificaes</h2></div>
        <div className="space-y-3">
          {[['newMsg','Novas mensagens'],['resolved','Atendimentos resolvidos'],['campaigns','Campanhas finalizadas'],['system','Alertas do sistema']].map(([key,label])=>(
            <div key={String(key)} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{String(label)}</span>
              <button onClick={()=>setNotifs(n=>({...n,[String(key)]:!n[String(key) as keyof typeof n]}))} className={`w-11 h-6 rounded-full transition-colors ${notifs[String(key) as keyof typeof notifs] ? 'bg-blue-600' : 'bg-gray-200'} relative`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[String(key) as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-blue-600" /><h2 className="font-semibold text-gray-900">Segurana</h2></div>
        <div className="space-y-4">
          {['Senha atual','Nova senha','Confirmar nova senha'].map(l=>(
            <div key={l}><label className="text-sm font-medium text-gray-700 block mb-1">{l}</label>
            <input type="password" placeholder="" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" /></div>
          ))}
        </div>
      </div>

      <button onClick={save} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
        <Save className="w-4 h-4" />{saved ? 'Salvo!' : 'Salvar Configuraes'}
      </button>
    </div>
  );
}
