import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Bookmark, Send } from 'lucide-react';

interface FeedPostProps {
  postId: number;
  type: 'video' | 'image';
  mediaUrl: string;
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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <article className="bg-black border-b border-gray-900 mb-4">
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center space-x-3">
          <img
            src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
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

      <div className="relative cursor-pointer" onClick={type === 'video' ? handleVideoClick : undefined}>
        {type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full aspect-square object-cover bg-gray-900"
              muted
              loop
              playsInline
              onDoubleClick={onDoubleClick}
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 transition-transform hover:scale-110">
                  <Play className="w-12 h-12 text-white fill-current" />
                </div>
              </div>
            )}
          </>
        ) : (
          <img
            src={mediaUrl}
            alt="Post"
            className="w-full aspect-square object-cover bg-gray-900"
            onDoubleClick={onDoubleClick}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

        {isLiked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-24 h-24 text-white fill-current drop-shadow-2xl animate-ping" />
          </div>
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

          <button className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
            Ver todos os {comments} comentários
          </button>
        </div>
      </div>
    </article>
  );
}
