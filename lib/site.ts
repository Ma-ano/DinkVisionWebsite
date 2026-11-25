export const businessEmail = "wrenlabsph@gmail.com";
export const facebook =
  "https://www.facebook.com/share/1JF4a8NTu8/?mibextid=wwXIfr";

// Use same-origin public paths or HTTPS video URLs. Still images are public paths.
export const media = {
  heroVideo: process.env.DINKVISION_HERO_VIDEO || "",
  replay: process.env.DINKVISION_REPLAY_VIDEO || "",
  rally: "/media/rally-poster.webp",
  tablet: "/media/tablet.webp",
  tabletApp: "/media/tablet-dinkvision-screen.png",
  stop: "/media/rally-poster.webp",
  phone: "/media/replay-phone.webp",
  camera: "/media/camera-dinkvision.png",
  admin: "",
};

export const guide = [
  [
    "Start at the tablet",
    "If your venue offers email delivery, enter your address. Then tap start recording.",
  ],
  ["Stop after play", "Tap stop on the same tablet so your match can upload."],
  [
    "Open your replay",
    "When email delivery is enabled, look for the replay link after upload.",
  ],
];
