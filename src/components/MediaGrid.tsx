import React from 'react';
import { Play, Camera } from 'lucide-react';
import { allVideos, allImages } from '../data/feedData';

interface MediaGridProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMediaClick: (index: number) => void;
}

export function MediaGrid({ activeTab, onTabChange, onMediaClick }: MediaGridProps) {
  const currentMedia = activeTab === 'videos' ? allVideos : allImages;

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
        <div className="grid grid-cols-3 gap-1">
          {currentMedia.map((media, index) => (
            <div
              key={media.id}
              className={`relative overflow-hidden bg-gray-900 cursor-pointer hover:opacity-80 transition-opacity ${
                media.type === 'video' ? 'aspect-[9/16]' : 'aspect-square'
              }`}
              onClick={() => onMediaClick(index)}
            >
              {media.type === 'video' ? (
                <>
                  <video
                    src={media.url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 text-white text-xs font-semibold bg-black/70 px-1.5 py-0.5 rounded pointer-events-none">
                    {Math.floor(Math.random() * 3) + 1}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                  </div>
                </>
              ) : (
                <img
                  src={media.url}
                  alt={`Foto ${media.id}`}
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
