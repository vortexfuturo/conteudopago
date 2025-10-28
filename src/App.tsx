import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Crown, UserPlus } from 'lucide-react';
import { logPurchaseEvent, logInitiateCheckoutEvent, registerUser, loginUser } from './lib/supabase';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { ProfileHeader } from './components/ProfileHeader';
import { NavigationTabs } from './components/NavigationTabs';
import { FeedPost } from './components/FeedPost';
import { MediaModal } from './components/MediaModal';
import { BottomNavigation } from './components/BottomNavigation';
import { feedPosts } from './data/feedData';
import { LoginScreen } from './components/LoginScreen';
import { MediaGrid } from './components/MediaGrid';
import { LockedContent } from './components/LockedContent';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeMediaTab, setActiveMediaTab] = useState('videos');
  const [showFullBio, setShowFullBio] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState<{ index: number, isVideo: boolean } | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const initialLikes: {[key: number]: number} = {};
    feedPosts.forEach(post => {
      initialLikes[post.id] = Math.floor(Math.random() * 400) + 150;
    });
    setLikeCounts(initialLikes);
  }, []);

  useEffect(() => {
    window.logPurchaseToSupabase = logPurchaseEvent;
    window.logInitiateCheckoutToSupabase = logInitiateCheckoutEvent;

    if (typeof window.fireInitiateCheckoutEvent === 'function') {
      window.fireInitiateCheckoutEvent('visitor');
    }

    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  const handleUserLogin = async (email: string) => {
    if (typeof window.firePurchaseEvent === 'function') {
      await window.firePurchaseEvent(email);
    }
    setIsLoggedIn(true);
  };

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    const newLikeCounts = { ...likeCounts };

    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      newLikeCounts[postId] = newLikeCounts[postId] - 1;
    } else {
      newLikedPosts.add(postId);
      newLikeCounts[postId] = newLikeCounts[postId] + 1;
    }

    setLikedPosts(newLikedPosts);
    setLikeCounts(newLikeCounts);
  };

  const handleVideoDoubleClick = (postId: number, e: React.MouseEvent) => {
    e.preventDefault();
    handleLike(postId);
  };

  if (currentRoute === '/painel') {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminPanel onLogout={handleAdminLogout} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleUserLogin} />;
  }

  return (
    <div className="min-h-screen bg-black pb-16">
      <div className="bg-black border-b border-gray-800 sticky top-0 z-20">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent tracking-tight">
              Larissa Privacy
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-black">
        <ProfileHeader
          showFullBio={showFullBio}
          onToggleBio={() => setShowFullBio(!showFullBio)}
        />

        <NavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'feed' ? (
          <div className="bg-black">
            {feedPosts.map((post) => (
              <FeedPost
                key={post.id}
                postId={post.id}
                type={post.type}
                mediaUrl={post.mediaUrl}
                timeAgo={post.timeAgo}
                likes={likeCounts[post.id] || 0}
                comments={post.comments}
                caption={post.caption}
                isLiked={likedPosts.has(post.id)}
                onLike={() => handleLike(post.id)}
                onMediaClick={() => {}}
                onDoubleClick={
                  post.type === 'video'
                    ? (e) => handleVideoDoubleClick(post.id, e)
                    : () => handleLike(post.id)
                }
              />
            ))}
          </div>
        ) : activeTab === 'mídias' ? (
          <MediaGrid
            activeTab={activeMediaTab}
            onTabChange={setActiveMediaTab}
            onMediaClick={(index) => setFullscreenMedia({ index, isVideo: activeMediaTab === 'videos' })}
          />
        ) : (
          <LockedContent />
        )}

        {fullscreenMedia && (
          <MediaModal
            initialIndex={fullscreenMedia.index}
            isVideo={fullscreenMedia.isVideo}
            onClose={() => setFullscreenMedia(null)}
          />
        )}

        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
