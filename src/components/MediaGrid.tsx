import React from 'react';
import { Play, Camera } from 'lucide-react';

interface MediaGridProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMediaClick: (type: 'video' | 'image', url: string) => void;
}

export function MediaGrid({ activeTab, onTabChange, onMediaClick }: MediaGridProps) {
  const videos = Array.from({ length: 15 }, (_, i) => i + 1);
  const images = [
    'https://s3.chefexpress.site/vortex/imagem1.jpeg',
    'https://s3.chefexpress.site/vortex/imagem2.jpeg',
    'https://s3.chefexpress.site/vortex/imagem3.jpeg',
    'https://s3.chefexpress.site/vortex/imagem1.jpeg'
  ];

  return (
    <div className="bg-black">
      <div className="border-b border-gray-900 px-3 py-3">
        <div className="flex space-x-3">
          <button
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
            onClick={() => onTabChange('videos')}
          >
            <Play className="w-4 h-4" />
            <span>Vídeos</span>
          </button>
          <button
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === 'fotos'
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
            onClick={() => onTabChange('fotos')}
          >
            <Camera className="w-4 h-4" />
            <span>Fotos</span>
          </button>
        </div>
      </div>

      <div className="px-1 py-2">
        {activeTab === 'videos' ? (
          <div className="grid grid-cols-3 gap-1">
            {videos.map((num) => (
              <div
                key={num}
                className="relative overflow-hidden aspect-[9/16] bg-gray-900"
              >
                <video
                  src={`https://s3.chefexpress.site/vortex/arquivo${num}.mp4`}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 text-white text-xs font-semibold bg-black/70 px-1.5 py-0.5 rounded">
                  {Math.floor(Math.random() * 3) + 1}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden aspect-square bg-gray-900"
              >
                <img
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
