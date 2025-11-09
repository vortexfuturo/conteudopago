import React, { useState } from 'react';
import { Crown } from 'lucide-react';

declare global {
  interface Window {
    firePurchaseEvent?: (email: string) => Promise<void>;
  }
}

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOldPasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = [
      '142536', '147852', '369852', '258741', '963741', '741852',
      '852963', '456789', '789456', '321654', '654321', '159753',
      '357159', '951357', '753951'
    ];

    if (validPasswords.includes(password)) {
      const email = `user_${password}@privacy.local`;
      onLogin(email);
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="h-screen bg-white relative overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop)',
          filter: 'blur(8px)'
        }}
      />

      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 w-full max-w-md px-6 max-h-screen overflow-y-auto py-6">
        <div className="text-center mb-6">
          <div className="relative mx-auto w-28 h-28 mb-3">
            <img
              src="https://s3.chefexpress.site/vortex/perfil-modelonova.jpg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-pink-500 shadow-2xl shadow-pink-500/50"
            />
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-1.5">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-gray-800 text-2xl font-bold mb-1">Larissa Silva</h1>
          <p className="text-blue-600 text-base font-medium">@larissasilva_</p>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-pink-500/30 p-6 shadow-2xl">
          <div className="mb-4">
            <div className="bg-gradient-to-r from-pink-50 to-red-50 border-2 border-pink-400 rounded-xl p-4 mb-4 text-center">
              <p className="text-gray-800 text-sm font-medium leading-relaxed">
                Oi amor, clica aqui no botão abaixo para acessar meus conteúdos e me ver peladinha gozando pra você 🤤💦
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const email = 'guest@privacy.local';
                onLogin(email);
              }}
              className="relative w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm mb-3 animate-pulse"
            >
              ENTRAR AGORA
            </button>

            <details className="text-sm text-gray-600">
              <summary className="cursor-pointer text-pink-600 hover:text-pink-700 py-1">
                Tenho senha antiga (código numérico)
              </summary>
              <form onSubmit={handleOldPasswordLogin} className="mt-2 space-y-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite o código..."
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {error && (
                  <p className="text-red-600 text-sm text-center bg-red-100 rounded-lg p-2 border border-red-300">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
                >
                  Entrar com código
                </button>
              </form>
            </details>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Conteúdo exclusivo para maiores de 18 anos 🔞
          </p>
        </div>
      </div>
    </div>
  );
}
