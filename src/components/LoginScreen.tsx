import React, { useState } from 'react';
import { Eye, EyeOff, Crown, UserPlus } from 'lucide-react';
import { registerUser, loginUser } from '../lib/supabase';

declare global {
  interface Window {
    firePurchaseEvent?: (email: string) => Promise<void>;
  }
}

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const [registerData, setRegisterData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join('.').replace(/\.(\d{2})$/, '-$1');
    }
    return value;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    const result = await registerUser(
      registerData.fullName,
      registerData.cpf,
      registerData.email,
      registerData.password
    );

    setLoading(false);

    if (result.success) {
      setSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
      setRegisterData({
        fullName: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setTimeout(() => {
        setShowRegisterForm(false);
        setSuccess('');
      }, 2000);
    } else {
      setError(result.error || 'Erro ao realizar cadastro');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginUser(loginData.email, loginData.password);
    setLoading(false);

    if (result.success && result.user) {
      if (typeof window.firePurchaseEvent === 'function') {
        await window.firePurchaseEvent(result.user.email);
      }
      onLogin(result.user.email);
    } else {
      setError(result.error || 'Erro ao realizar login');
    }
  };

  const handleOldPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = [
      '142536', '147852', '369852', '258741', '963741', '741852',
      '852963', '456789', '789456', '321654', '654321', '159753',
      '357159', '951357', '753951'
    ];

    if (validPasswords.includes(password)) {
      const email = `user_${password}@privacy.local`;
      if (typeof window.firePurchaseEvent === 'function') {
        await window.firePurchaseEvent(email);
      }
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
            {!showRegisterForm ? (
              <>
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-pink-50 to-red-50 border-2 border-pink-400 rounded-xl p-4 mb-4 text-center">
                    <p className="text-gray-800 text-sm font-medium leading-relaxed">
                      Oi amor clica aqui no botão abaixo para acessar meus conteúdos e me ver peladinha gozando pra você 🤤💦
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      const email = 'guest@privacy.local';
                      if (typeof window.firePurchaseEvent === 'function') {
                        await window.firePurchaseEvent(email);
                      }
                      onLogin(email);
                    }}
                    className="relative w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm mb-3 animate-pulse"
                  >
                    ENTRAR SEM CRIAR CONTA
                  </button>

                  <button
                    onClick={() => setShowRegisterForm(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 mb-3 text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>CRIAR CONTA NOVA</span>
                  </button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-500">ou entre com sua conta</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="E-mail"
                    required
                    className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="Senha"
                      required
                      className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm text-center bg-red-100 rounded-lg p-2 border border-red-300">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-red-600 hover:from-pink-600 hover:via-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'ENTRANDO...' : 'ENTRAR'}
                  </button>
                </form>

                <div className="mt-4 space-y-2">
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
                      <button
                        type="submit"
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
                      >
                        Entrar com código
                      </button>
                    </form>
                  </details>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-800 mb-1">Criar Nova Conta</h3>
                  <p className="text-sm text-gray-600">Preencha seus dados abaixo</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-2.5">
                  <input
                    type="text"
                    value={registerData.fullName}
                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                    placeholder="Nome completo"
                    required
                    className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  <input
                    type="text"
                    value={registerData.cpf}
                    onChange={(e) => setRegisterData({ ...registerData, cpf: formatCPF(e.target.value) })}
                    placeholder="CPF"
                    required
                    maxLength={14}
                    className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="E-mail"
                    required
                    className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="Senha (mínimo 6 caracteres)"
                      required
                      minLength={6}
                      className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="Confirmar senha"
                    required
                    minLength={6}
                    className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  {error && (
                    <p className="text-red-600 text-sm text-center bg-red-100 rounded-lg p-2 border border-red-300">
                      {error}
                    </p>
                  )}

                  {success && (
                    <p className="text-green-600 text-sm text-center bg-green-100 rounded-lg p-2 border border-green-300">
                      {success}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'CADASTRANDO...' : 'CRIAR CONTA'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowRegisterForm(false);
                      setError('');
                      setSuccess('');
                    }}
                    className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors text-sm"
                  >
                    Voltar para login
                  </button>
                </form>
              </>
            )}
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
