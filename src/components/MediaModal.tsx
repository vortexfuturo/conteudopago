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
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-md">
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
          className="text-white hover:text-gray-300 transition-colors bg-black/50 backdrop-blur-sm rounded-full p-2"
        >
          <X className="w-6 h-6" />
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
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Fullscreen"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="p-4 bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-md mx-auto">
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
      </div>
    </div>
  );
}
