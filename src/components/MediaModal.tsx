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
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="flex items-center space-x-3">
          <img
            src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-500"
          />
          <div>
            <div className="font-semibold text-white text-sm">larissasilva_</div>
            <div className="text-gray-400 text-xs">Online</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-500 transition-all duration-200 bg-red-600/20 hover:bg-red-600/40 backdrop-blur-sm rounded-full p-3 ring-2 ring-red-500/50 hover:ring-red-500 transform hover:scale-110"
        >
          <X className="w-7 h-7 stroke-[3]" />
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

      <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex items-center justify-between max-w-md mx-auto mb-3">
          <button className="text-white hover:text-pink-500 transition-colors">
            <Heart className="w-7 h-7" />
          </button>
          <button className="text-white hover:text-blue-500 transition-colors">
            <MessageCircle className="w-7 h-7" />
          </button>
          <button className="text-white hover:text-green-500 transition-colors">
            <Share className="w-7 h-7" />
          </button>
          <button className="text-white hover:text-yellow-500 transition-colors">
            <Bookmark className="w-7 h-7" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          FECHAR
        </button>
      </div>
    </div>
  );
}
