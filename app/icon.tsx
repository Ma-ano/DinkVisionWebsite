import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), "public/brand/dinkvision-logo-web.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#001f49",
          borderRadius: 18,
        }}
      >
        {/* ImageResponse renders the logo directly during favicon generation. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"data:image/png;base64," + logo.toString("base64")}
          width={88}
          height={29}
          alt=""
        />
      </div>
    ),
    size,
  );
}
