export type VideoClip = {
  title: string;
  poster: string;
  src: string;
  captions?: string;
};

// Optional captions are English WebVTT files.
export const videoClips: VideoClip[] = [
  {
    title: "iPlay · Nov 12 · Clip 3",
    poster: "/media/clips/iplay-nov12-03.webp",
    src: "/media/clips/iplay-nov12-03.mp4",
  },
  {
    title: "iPlay · Nov 12 · Rally 9",
    poster: "/media/clips/iplay-nov12-09.webp",
    src: "/media/clips/iplay-nov12-09.mp4",
  },
  {
    title: "iPlay · Nov 19 · Rally 27",
    poster: "/media/clips/iplay-nov19-27.webp",
    src: "/media/clips/iplay-nov19-27.mp4",
  },
  {
    title: "Dink Garage · Clip 1",
    poster: "/media/clips/dink-garage-01.webp",
    src: "/media/clips/dink-garage-01.mp4",
  },
];
