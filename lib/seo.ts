import type { Metadata } from "next";
import { businessEmail, wrenLabsUrl } from "./site";

const productionUrl = "https://dink-vision-website.vercel.app";
const publicUrl = new URL(process.env.DINKVISION_SITE_URL?.trim() || productionUrl);
if (
  publicUrl.protocol !== "https:" ||
  publicUrl.username ||
  publicUrl.password ||
  publicUrl.pathname !== "/" ||
  publicUrl.search ||
  publicUrl.hash
) {
  throw new Error("DINKVISION_SITE_URL must be an HTTPS origin without a path or credentials.");
}

export const siteUrl = publicUrl;
export const isPreview = process.env.VERCEL_ENV === "preview";
export const customInquiryPath = "/quote?inquiry=custom-application";

const pages = {
  "/": {
    title: "Pickleball Court Recording and Replay",
    description:
      "DinkVision records pickleball matches with a fixed courtside camera and tablet. See how players start a recording and watch their replay.",
  },
  "/for-court-owners": {
    title: "Pickleball Court Camera and Recording Setup",
    description:
      "See how DinkVision equips pickleball courts with fixed cameras and branded tablets, and how staff manage recording uploads and retention.",
  },
  "/about": {
    title: "About DinkVision and WrenLabs PH",
    description:
      "Meet WrenLabs PH, the team behind DinkVision pickleball recording, and explore its custom web, mobile, and business software services.",
  },
  "/app-showcase": {
    title: "Pickleball Recording App Walkthrough",
    description:
      "Explore six DinkVision app screens, from starting a pickleball recording and adding replay recipients to saving the finished match.",
  },
  "/upcoming-projects": {
    title: "Upcoming Projects from DinkVision and WrenLabs PH",
    description:
      "See concepts WrenLabs PH is exploring for DinkVision, including pickleball coaching, match review, and court and event management.",
  },
  "/players": {
    title: "How to Record and Replay Your Pickleball Match",
    description:
      "Learn how to start and stop recording on the courtside tablet, receive a replay link when enabled, and find a missing pickleball replay.",
  },
  "/quote": {
    title: "Request a Pickleball Recording Setup Quote",
    description:
      "Request a DinkVision quote tailored to your venue, number of pickleball courts, and existing camera and tablet equipment.",
  },
  "/privacy": {
    title: "Pickleball Recording and Privacy Notice",
    description:
      "Find out what to ask your venue about DinkVision recording access, replay delivery, and how long pickleball matches are kept.",
  },
};

export const indexablePaths = Object.keys(pages);

const customInquiry = {
  title: "Custom Application Inquiry for WrenLabs PH",
  description:
    "Tell WrenLabs PH about the website, app, or business system you want to build.",
};

export function pageMetadata(path: keyof typeof pages | typeof customInquiryPath): Metadata {
  const custom = path === customInquiryPath;
  const { title, description } = custom ? customInquiry : pages[path];
  const socialTitle = title.includes("DinkVision") ? title : title + " | DinkVision";
  const url = new URL(path, siteUrl);
  const image = {
    url: new URL("/media/hero-paddle.webp", siteUrl),
    width: 1672,
    height: 941,
    alt: "Pickleball paddle and yellow ball on a court",
  };

  return {
    title: title.includes("DinkVision") ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    ...(custom && { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      siteName: "DinkVision",
      title: socialTitle,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

const publisher = new URL("#organization", wrenLabsUrl).href;

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": publisher,
      name: "WrenLabs PH",
      url: wrenLabsUrl,
      email: businessEmail,
    },
    {
      "@type": "WebSite",
      "@id": new URL("#website", siteUrl).href,
      name: "DinkVision",
      url: siteUrl.href,
      description: pages["/"].description,
      inLanguage: "en",
      publisher: { "@id": publisher },
    },
    {
      "@type": "Service",
      name: "DinkVision",
      serviceType: "Pickleball court recording and replay",
      url: siteUrl.href,
      provider: { "@id": publisher },
      brand: {
        "@type": "Brand",
        name: "DinkVision",
        logo: new URL("/brand/dinkvision-logo-web.png", siteUrl).href,
      },
    },
  ],
};
