import { useState } from 'react';
import { Camera, Save } from 'lucide-react';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1><p className="text-sm text-gray-500 mt-1">Gerencie suas informaes pessoais</p></div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">AD</div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-lg">Administrador</div>
            <div className="text-sm text-gray-500">admin@talktreak.com</div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[['Nome','Administrador'],['Sobrenome','Sistema'],['Email','admin@talktreak.com'],['Telefone','(84) 99999-0000'],['Empresa','TalkTreak'],['Cargo','Administrador']].map(([l,v])=>(
            <div key={String(l)}>
              <label className="text-sm font-medium text-gray-700 block mb-1">{String(l)}</label>
              <input defaultValue={String(v)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={save} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
        <Save className="w-4 h-4" />{saved ? 'Salvo!' : 'Salvar Perfil'}
      </button>
    </div>
  );
}
