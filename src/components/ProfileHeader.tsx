import React, { useState } from 'react';
import { Instagram, Twitter, Music, DollarSign, MessageCircle, Settings, Crown, Copy, Check, X } from 'lucide-react';

interface ProfileHeaderProps {
  showFullBio: boolean;
  onToggleBio: () => void;
}

export function ProfileHeader({ showFullBio, onToggleBio }: ProfileHeaderProps) {
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixKey = '44988164843';
  const pixName = 'Vortex Futuro';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-black border-b border-gray-900">
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-pink-500 ring-offset-2"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-1.5">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-0 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-0.5">
                Larissa Silva
              </h2>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-gray-400 font-medium text-xs">@larissasilva_</p>
                <span className="px-1.5 py-0.5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-full">
                  VIP
                </span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-3 py-3">
          <div className="text-center">
            <div className="font-bold text-base text-white">73</div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
          <div className="text-center border-x border-gray-800">
            <div className="font-bold text-base text-white">2.4K</div>
            <div className="text-xs text-gray-400">Curtidas</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-base text-white">892</div>
            <div className="text-xs text-gray-400">Fãs</div>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-300 text-sm leading-relaxed">
            {showFullBio ? (
              <>
                Sou a Larissa, tenho 22 aninhos 😘✨ toda tímida de cara, mas bem safadinha quando me solto… adoro tirar fotinhas íntimas no meu quarto e mandar só pra quem me trata com carinho 💋
                <br /><br />
                Tô sempre online, gosto de conversar e trocar ideias quentes… se você me der atenção, eu te mando coisas que nunca mostrei pra ninguém 🔒🔥
              </>
            ) : (
              <>
                Sou a Larissa, tenho 22 aninhos 😘✨ toda tímida de cara, mas bem safadinha quando me solto… adoro tirar fotinhas íntimas no meu quarto e mandar só pra quem me trata com carinho 💋
              </>
            )}
          </p>
          <button
            onClick={onToggleBio}
            className="text-gray-400 text-sm font-medium mt-1 hover:text-gray-300 transition-colors"
          >
            {showFullBio ? 'Mostrar menos' : 'Ler mais'}
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-gray-900">
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white hover:scale-110 transition-transform"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 text-white hover:scale-110 transition-transform"
          >
            <Music className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setShowPixModal(true)}
            className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <DollarSign className="w-4 h-4" />
            <span>Enviar Mimo</span>
          </button>
          <button className="flex items-center justify-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>Mensagem</span>
          </button>
        </div>
      </div>

      {showPixModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Enviar Mimo 💝</h3>
              <button
                onClick={() => setShowPixModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 mb-6 border-2 border-pink-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-3">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{pixName}</h4>
                <p className="text-sm text-gray-600">Agência de conteúdo</p>
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-500 mb-2 font-medium">Chave PIX (Celular):</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-bold text-gray-900">(44) 98816-4843</span>
                </div>
              </div>

              <button
                onClick={handleCopyPix}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copiar Chave PIX</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 leading-relaxed">
                Depois de enviar, tire um print e mande para ganhar acesso a conteúdos exclusivos! 💕
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
