export interface PostData {
  id: number;
  type: 'video' | 'image';
  mediaUrl: string;
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

export const feedPosts: PostData[] = Array.from({ length: 81 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    type: 'video',
    mediaUrl: `https://s3.chefexpress.site/vortex/video-midia${id.toString().padStart(2, '0')}.mp4`,
    timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
    caption: Math.random() > 0.7 ? captions[Math.floor(Math.random() * captions.length)] : undefined,
    comments: Math.floor(Math.random() * 60) + 15
  };
});

export const allVideos: MediaItem[] = Array.from({ length: 81 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    type: 'video',
    url: `https://s3.chefexpress.site/vortex/video-midia${id.toString().padStart(2, '0')}.mp4`
  };
});

export const allImages: MediaItem[] = [
  { id: 1, type: 'image', url: 'https://s3.chefexpress.site/vortex/imagem1.jpeg' },
  { id: 2, type: 'image', url: 'https://s3.chefexpress.site/vortex/imagem2.jpeg' },
  { id: 3, type: 'image', url: 'https://s3.chefexpress.site/vortex/imagem3.jpeg' },
  { id: 4, type: 'image', url: 'https://s3.chefexpress.site/vortex/imagem1.jpeg' }
];
