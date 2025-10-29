export interface PostData {
  id: number;
  type: 'video' | 'image' | 'carousel';
  mediaUrl: string | string[];
  timeAgo: string;
  caption?: string;
  comments: number;
}

export interface MediaItem {
  id: number;
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
}

const timeAgoOptions = ['1 hora', '2 horas', '3 horas', '5 horas', '8 horas', '12 horas', '1 dia', '2 dias', '3 dias', '5 dias', '1 semana'];
const captions = ['Momento especial só pra vocês 💋', 'Vídeo novo pra vocês 🔥', 'Conteúdo exclusivo 💕', 'Final de semana chegando 🎉', 'Memórias lindas 🌟'];

const generateFeedPosts = (): PostData[] => {
  const posts: PostData[] = [];
  let postId = 1;
  let videoIndex = 1;
  let imageIndex = 1;

  for (let cycle = 0; cycle < 16; cycle++) {
    if (videoIndex <= 81) {
      posts.push({
        id: postId++,
        type: 'video',
        mediaUrl: `https://s3.chefexpress.site/vortex/video-midia${videoIndex.toString().padStart(2, '0')}.mp4`,
        timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
        caption: Math.random() > 0.7 ? captions[Math.floor(Math.random() * captions.length)] : undefined,
        comments: Math.floor(Math.random() * 60) + 15
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
        comments: Math.floor(Math.random() * 60) + 15
      });
    }
  }

  return posts;
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
