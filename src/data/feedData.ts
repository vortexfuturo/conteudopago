export interface PostData {
  id: number;
  type: 'video' | 'image' | 'carousel';
  mediaUrl: string | string[];
  timeAgo: string;
  caption?: string;
  comments: number;
  loadPriority?: number;
}

export interface MediaItem {
  id: number;
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
}

const timeAgoOptions = ['1 hora', '2 horas', '3 horas', '5 horas', '8 horas', '12 horas', '1 dia', '2 dias', '3 dias', '5 dias', '1 semana'];
const captions = ['Momento especial só pra vocês 💋', 'Vídeo novo pra vocês 🔥', 'Conteúdo exclusivo 💕', 'Final de semana chegando 🎉', 'Memórias lindas 🌟'];

const slowLoadingUrls = [
  'https://s3.chefexpress.site/vortex/video-midia12.mp4',
  'https://s3.chefexpress.site/vortex/video-midia34.mp4',
  'https://s3.chefexpress.site/vortex/video-midia56.mp4',
  'https://s3.chefexpress.site/vortex/midia45.jpeg',
  'https://s3.chefexpress.site/vortex/midia67.jpeg',
  'https://s3.chefexpress.site/vortex/midia89.jpeg'
];

const isSlowLoading = (url: string | string[]): boolean => {
  if (typeof url === 'string') {
    return slowLoadingUrls.some(slow => url.includes(slow));
  }
  return url.some(u => slowLoadingUrls.some(slow => u.includes(slow)));
};

const generateFeedPosts = (): PostData[] => {
  const posts: PostData[] = [];
  let postId = 1;
  let videoIndex = 1;
  let imageIndex = 1;

  for (let cycle = 0; cycle < 16; cycle++) {
    if (videoIndex <= 81) {
      const mediaUrl = `https://s3.chefexpress.site/vortex/video-midia${videoIndex.toString().padStart(2, '0')}.mp4`;
      posts.push({
        id: postId++,
        type: 'video',
        mediaUrl,
        timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
        caption: Math.random() > 0.7 ? captions[Math.floor(Math.random() * captions.length)] : undefined,
        comments: Math.floor(Math.random() * 60) + 15,
        loadPriority: isSlowLoading(mediaUrl) ? 1000 : postId
      });
      videoIndex++;
    }

    const carouselImages: string[] = [];
    for (let i = 0; i < 5 && imageIndex <= 99; i++) {
      carouselImages.push(`https://s3.chefexpress.site/vortex/midia${imageIndex.toString().padStart(2, '0')}.jpeg`);
      imageIndex++;
    }

    if (carouselImages.length > 0) {
      posts.push({
        id: postId++,
        type: 'carousel',
        mediaUrl: carouselImages,
        timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
        caption: Math.random() > 0.7 ? captions[Math.floor(Math.random() * captions.length)] : undefined,
        comments: Math.floor(Math.random() * 60) + 15,
        loadPriority: isSlowLoading(carouselImages) ? 1000 : postId
      });
    }
  }

  return posts.sort((a, b) => (a.loadPriority || 0) - (b.loadPriority || 0));
};

export const feedPosts: PostData[] = generateFeedPosts();

export const allVideos: MediaItem[] = Array.from({ length: 81 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    type: 'video',
    url: `https://s3.chefexpress.site/vortex/video-midia${id.toString().padStart(2, '0')}.mp4`
  };
});

export const allImages: MediaItem[] = Array.from({ length: 99 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    type: 'image',
    url: `https://s3.chefexpress.site/vortex/midia${id.toString().padStart(2, '0')}.jpeg`
  };
});
