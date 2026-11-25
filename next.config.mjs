const mediaOrigins = new Set();
for (const source of [
  process.env.DINKVISION_HERO_VIDEO,
  process.env.DINKVISION_REPLAY_VIDEO,
]) {
  if (!source || !URL.canParse(source)) continue;
  const url = new URL(source);
  if (url.protocol === "https:" && !url.username && !url.password) {
    mediaOrigins.add(url.origin);
  }
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Static App Router pages include inline bootstrap scripts and styles.
      "script-src 'self' 'unsafe-inline'",
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      ["media-src 'self'", ...mediaOrigins].join(" "),
      "object-src 'none'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'none'",
      "form-action 'self'",
    ].join("; "),
  });
}

/** @type {import("next").NextConfig} */
export default {
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
