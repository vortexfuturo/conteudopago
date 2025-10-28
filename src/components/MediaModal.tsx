import React, { useEffect } from 'react';
import { X, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

interface MediaModalProps {
  type: 'video' | 'image';
  mediaUrl: string | null;
  onClose: () => void;
}

export function MediaModal({ type, mediaUrl, onClose }: MediaModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mediaUrl) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col overflow-hidden touch-none">
      <div className="flex items-center justify-between p-4 bg-black shadow-2xl border-b-2 border-red-500">
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
          className="text-white active:text-red-500 transition-colors bg-red-600 active:bg-red-700 rounded-full p-3 ring-2 ring-white shadow-lg shadow-red-500/50 flex-shrink-0"
        >
          <X className="w-9 h-9 stroke-[3.5]" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
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

      <div className="p-4 bg-black shadow-2xl border-t-2 border-red-500">
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
