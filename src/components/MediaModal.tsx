import React from 'react';
import { X, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

interface MediaModalProps {
  type: 'video' | 'image';
  mediaUrl: string | null;
  onClose: () => void;
}

export function MediaModal({ type, mediaUrl, onClose }: MediaModalProps) {
  if (!mediaUrl) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-3 bg-black shadow-lg relative z-10">
        <div className="flex items-center space-x-2">
          <img
            src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500"
          />
          <div>
            <div className="font-semibold text-white text-sm">larissasilva_</div>
            <div className="text-gray-400 text-xs">Online</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white active:text-red-500 transition-colors bg-red-600/30 active:bg-red-600/50 backdrop-blur-sm rounded-full p-2.5 ring-2 ring-red-500 shadow-lg shadow-red-500/50"
        >
          <X className="w-8 h-8 stroke-[3]" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {type === 'video' ? (
          <video
            src={mediaUrl}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Fullscreen"
            className="w-full h-full object-contain"
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
      </div>

      <div className="p-3 pb-safe bg-black shadow-2xl relative z-10">
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 active:from-red-700 active:to-red-600 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-red-500/50 mb-3"
        >
          FECHAR
        </button>
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="text-white active:text-pink-500 transition-colors p-2">
            <Heart className="w-7 h-7" />
          </button>
          <button className="text-white active:text-blue-500 transition-colors p-2">
            <MessageCircle className="w-7 h-7" />
          </button>
          <button className="text-white active:text-green-500 transition-colors p-2">
            <Share className="w-7 h-7" />
          </button>
          <button className="text-white active:text-yellow-500 transition-colors p-2">
            <Bookmark className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
