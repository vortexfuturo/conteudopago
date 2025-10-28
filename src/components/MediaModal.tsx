import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Heart, MessageCircle, Share, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { allVideos, allImages } from '../data/feedData';

interface MediaModalProps {
  initialIndex: number;
  isVideo: boolean;
  onClose: () => void;
}

export function MediaModal({ initialIndex, isVideo, onClose }: MediaModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mediaList = isVideo ? allVideos : allImages;
  const currentMedia = mediaList[currentIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < mediaList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, mediaList.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      goToNext();
    }

    if (touchStart - touchEnd < -100) {
      goToPrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowUp') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, onClose]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        goToNext();
      } else if (e.deltaY < 0) {
        goToPrevious();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [goToNext, goToPrevious]);

  if (!currentMedia) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999] flex flex-col overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between p-4 bg-black shadow-2xl border-b-2 border-red-500">
        <div className="flex items-center space-x-2">
          <img
            src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500"
          />
          <div>
            <div className="font-semibold text-white text-sm">larissasilva_</div>
            <div className="text-gray-400 text-xs">
              {currentIndex + 1} de {mediaList.length}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center space-x-2 text-white active:text-red-500 transition-colors bg-red-600 active:bg-red-700 rounded-full px-4 py-2 ring-2 ring-white shadow-lg shadow-red-500/50 flex-shrink-0"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
          <span className="text-sm font-semibold">Sair</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {currentMedia.type === 'video' ? (
          <video
            key={currentMedia.id}
            src={currentMedia.url}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <img
            key={currentMedia.id}
            src={currentMedia.url}
            alt={`Mídia ${currentMedia.id}`}
            className="w-full h-full object-contain"
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {currentIndex < mediaList.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
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

        <div className="text-center text-gray-400 text-sm mt-2">
          Deslize ou use as setas para navegar
        </div>
      </div>
    </div>
  );
}
