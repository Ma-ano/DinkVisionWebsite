import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isPreview ? {} : { sitemap: new URL("/sitemap.xml", siteUrl).href }),
  };
}
