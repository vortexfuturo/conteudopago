import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Bookmark, Send, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeedPostProps {
  postId: number;
  type: 'video' | 'image' | 'carousel';
  mediaUrl: string | string[];
  timeAgo: string;
  likes: number;
  comments: number;
  caption?: string;
  isLiked: boolean;
  onLike: () => void;
  onMediaClick: () => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
}

export function FeedPost({
  postId,
  type,
  mediaUrl,
  timeAgo,
  likes,
  comments,
  caption,
  isLiked,
  onLike,
  onMediaClick,
  onDoubleClick
}: FeedPostProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <article className="bg-black border-b border-gray-900 mb-4">
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center space-x-3">
          <img
            src="https://s3.chefexpress.site/vortex/perfil-modelonova.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm text-white">larissasilva_</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-gray-400 text-xs">{timeAgo}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="relative cursor-pointer" onClick={type === 'video' ? onMediaClick : onMediaClick}>
        {type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={typeof mediaUrl === 'string' ? mediaUrl : ''}
              className="w-full aspect-square object-cover bg-gray-900"
              muted
              loop
              playsInline
              onDoubleClick={onDoubleClick}
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 transition-transform hover:scale-110">
                <Play className="w-12 h-12 text-white fill-current" />
              </div>
            </div>
          </>
        ) : type === 'carousel' && Array.isArray(mediaUrl) ? (
          <>
            <div className="relative w-full aspect-square bg-gray-900 overflow-hidden">
              <img
                src={mediaUrl[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onDoubleClick={onDoubleClick}
                onContextMenu={(e) => e.preventDefault()}
              />

              {currentImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(prev => prev - 1);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {currentImageIndex < mediaUrl.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(prev => prev + 1);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {mediaUrl.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <img
            src={typeof mediaUrl === 'string' ? mediaUrl : ''}
            alt="Post"
            className="w-full aspect-square object-cover bg-gray-900"
            onDoubleClick={onDoubleClick}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

      </div>

      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={onLike}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <Heart
                className={`w-7 h-7 ${isLiked ? 'text-red-500 fill-current' : 'text-white'} transition-colors`}
              />
            </button>
            <button className="hover:scale-110 transition-transform active:scale-95">
              <MessageCircle className="w-7 h-7 text-white" />
            </button>
            <button className="hover:scale-110 transition-transform active:scale-95">
              <Send className="w-7 h-7 text-white" />
            </button>
          </div>
          <button className="hover:scale-110 transition-transform active:scale-95">
            <Bookmark className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="space-y-1.5">
          <button className="font-semibold text-sm text-white">
            {likes.toLocaleString('pt-BR')} curtidas
          </button>

          {caption && (
            <div className="text-sm">
              <span className="font-semibold text-white">larissasilva_ </span>
              <span className="text-gray-300">{caption}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
