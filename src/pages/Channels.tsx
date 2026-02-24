import { useState } from 'react';
import { Wifi, WifiOff, Plus, RefreshCw, Settings, QrCode } from 'lucide-react';

const channels = [
  { id: 1, name: 'WhatsApp Principal', type: 'whatsapp', number: '+55 84 99999-0001', status: 'conectado', msgs: 89, sync: '1min' },
  { id: 2, name: 'WhatsApp Suporte', type: 'whatsapp', number: '+55 84 99999-0002', status: 'conectado', msgs: 34, sync: '3min' },
  { id: 3, name: 'WhatsApp Campanhas', type: 'whatsapp', number: '+55 84 99999-0003', status: 'desconectado', msgs: 0, sync: '--' },
  { id: 4, name: 'Instagram DM', type: 'instagram', number: '@clinica_dapaz', status: 'em breve', msgs: 0, sync: '--' },
  { id: 5, name: 'Email', type: 'email', number: 'contato@clinica.com.br', status: 'em breve', msgs: 0, sync: '--' },
];

const statusStyle: Record<string, string> = {
  conectado: 'bg-green-100 text-green-700',
  desconectado: 'bg-red-100 text-red-700',
  'em breve': 'bg-gray-100 text-gray-500',
};

export default function Channels() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-gray-900">Canais</h1><p className="text-sm text-gray-500 mt-1">Gerencie suas conexes de atendimento</p></div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"><Plus className="w-4 h-4" /> Novo Canal</button>
      </div>

      <div className="grid gap-4">
        {channels.map(ch => (
          <div key={ch.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm ${ch.status === 'conectado' ? 'bg-green-500' : ch.status === 'desconectado' ? 'bg-red-400' : 'bg-gray-300'}`}>
              {ch.type === 'whatsapp' ? 'WA' : ch.type === 'instagram' ? 'IG' : 'EM'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-gray-900">{ch.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[ch.status]}`}>{ch.status}</span>
              </div>
              <div className="text-sm text-gray-400">{ch.number}</div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-center">
              <div><div className="text-sm font-bold text-gray-900">{ch.msgs}</div><div className="text-xs text-gray-400">Msgs hoje</div></div>
              <div><div className="text-sm font-bold text-gray-900">{ch.sync}</div><div className="text-xs text-gray-400">ltima sync</div></div>
            </div>
            <div className="flex gap-2">
              {ch.status === 'desconectado' && <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-200"><RefreshCw className="w-3 h-3" />Reconectar</button>}
              {ch.status === 'conectado' && <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200"><Settings className="w-3 h-3" />Configurar</button>}
              {ch.status === 'em breve' && <span className="text-xs text-gray-400 px-3 py-1.5">Em breve</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <QrCode className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Conectar novo WhatsApp</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Escaneie o QR Code com seu WhatsApp para conectar um novo nmero.</p>
        <ol className="text-sm text-gray-600 space-y-1 mb-4 list-decimal list-inside">
          <li>Abra o WhatsApp no seu celular</li>
          <li>V em Dispositivos conectados</li>
          <li>Toque em Conectar dispositivo</li>
          <li>Escaneie o QR Code abaixo</li>
        </ol>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"><QrCode className="w-4 h-4" />Gerar QR Code</button>
      </div>
    </div>
  );
}
