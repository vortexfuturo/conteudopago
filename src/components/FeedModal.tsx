import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Heart, MessageCircle, Share, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { feedPosts } from '../data/feedData';

interface FeedModalProps {
  initialIndex: number;
  onClose: () => void;
}

export function FeedModal({ initialIndex, onClose }: FeedModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [likes, setLikes] = useState<{[key: number]: number}>({});
  const [isLiked, setIsLiked] = useState<{[key: number]: boolean}>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPost = feedPosts[currentIndex];

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const initialLikes: {[key: number]: number} = {};
    feedPosts.forEach(post => {
      initialLikes[post.id] = Math.floor(Math.random() * 400) + 150;
    });
    setLikes(initialLikes);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < feedPosts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

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

  const handleLike = (postId: number) => {
    setIsLiked(prev => ({ ...prev, [postId]: !prev[postId] }));
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (isLiked[postId] ? -1 : 1)
    }));
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

  if (!currentPost) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999] overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-2">
          <img
            src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover ring-2 ring-pink-500"
          />
          <div className="font-semibold text-white text-sm drop-shadow-lg">larissasilva_</div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center space-x-1.5 text-white active:text-red-500 transition-colors bg-red-600 active:bg-red-700 rounded-full px-3 py-1.5 ring-2 ring-white shadow-lg shadow-red-500/50 flex-shrink-0"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span className="text-xs font-semibold">Sair</span>
        </button>
      </div>

      <div className="w-full h-full overflow-hidden relative bg-black flex items-center justify-center">
        {currentPost.type === 'video' ? (
          <video
            key={currentPost.id}
            src={currentPost.mediaUrl}
            className="min-w-full min-h-full max-w-full max-h-full object-contain"
            controls
            autoPlay
            muted={false}
            loop
            playsInline
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <img
            key={currentPost.id}
            src={currentPost.mediaUrl}
            alt={`Post ${currentPost.id}`}
            className="min-w-full min-h-full max-w-full max-h-full object-contain"
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

        {currentIndex < feedPosts.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-center justify-around mb-3">
          <button
            onClick={() => handleLike(currentPost.id)}
            className="text-white active:text-pink-500 transition-colors p-2"
          >
            <Heart className={`w-7 h-7 ${isLiked[currentPost.id] ? 'fill-current text-pink-500' : ''}`} />
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

        <div className="text-left">
          <div className="text-white font-semibold text-sm mb-1 drop-shadow-lg">
            {(likes[currentPost.id] || 0).toLocaleString('pt-BR')} curtidas
          </div>
          {currentPost.caption && (
            <div className="text-sm text-white drop-shadow-lg">
              <span className="font-semibold">larissasilva_ </span>
              {currentPost.caption}
            </div>
          )}
        </div>

        <div className="text-center text-white/60 text-xs mt-2 drop-shadow-lg">
          {currentIndex + 1} / {feedPosts.length}
        </div>
      </div>
    </div>
  );
}
