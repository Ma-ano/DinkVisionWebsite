export type ShowcaseChapter = {
  image: string;
  label: string;
  heading: string;
  description: string;
  alt: string;
};

export const chapters: ShowcaseChapter[] = [
  {
    image: "/media/app-showcase/5.53/landscape-01-welcome.png",
    label: "01 / GET STARTED",
    heading: "Your court. Your moment.",
    description: "Tap the courtside tablet to begin your recording journey.",
    alt: "DinkVision welcome screen with Your game. On replay. and Tap anywhere to start.",
  },
  {
    image: "/media/app-showcase/5.53/landscape-03-four-recipients.png",
    label: "02 / ADD YOUR PLAYERS",
    heading: "One match. Shared with your squad.",
    description: "Add up to four email addresses to receive the replay.",
    alt: "Record your match screen with Court 01 and four demo email addresses.",
  },
  {
    image: "/media/app-showcase/5.53/landscape-05-confirmation.png",
    label: "03 / CONFIRM & RECORD",
    heading: "Ready for the next rally?",
    description:
      "Review your court and replay recipients, then confirm to start recording.",
    alt: "Review emails screen showing the court, replay recipients, and Start recording button.",
  },
  {
    image: "/media/app-showcase/5.53/landscape-08-recording.png",
    label: "04 / STAY IN THE GAME",
    heading: "You play. DinkVision records.",
    description: "Focus on your match while DinkVision captures the action.",
    alt: "Recording match screen showing the time elapsed, recording limit, and Stop recording button.",
  },
  {
    image: "/media/app-showcase/5.53/landscape-09-finalizing.png",
    label: "05 / SAVE YOUR MATCH",
    heading: "Keep the moment.",
    description: "After recording stops, DinkVision prepares your saved video.",
    alt: "Finalizing screen displaying Saving your replay safely and Preparing saved video.",
  },
  {
    image: "/media/app-showcase/5.53/landscape-10-completion.png",
    label: "06 / BACK TO THE COURT",
    heading: "Match saved. Next game.",
    description:
      "Your video is saved, and the upload continues in the background.",
    alt: "Welcome screen after recording with confirmation that the video is saved and upload continues in the background.",
  },
];
