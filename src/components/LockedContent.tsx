import React from 'react';
import { Lock } from 'lucide-react';

export function LockedContent() {
  return (
    <div className="bg-black min-h-[50vh] flex items-center justify-center p-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
          <Lock className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Conteúdo Bloqueado</h3>
        <p className="text-gray-400 mb-4 max-w-md text-sm">
          Este recurso está temporariamente indisponível. Em breve você terá acesso a ainda mais conteúdo exclusivo!
        </p>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500 font-medium">
            🔒 Aguarde novidades incríveis chegando em breve
          </p>
        </div>
      </div>
    </div>
  );
}
