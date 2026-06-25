import { ImageResponse } from "next/og";

export const alt = "Mohamed Design — Logo & Brand Identity Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(41,87,255,0.35), transparent 55%)",
          color: "#F2F1EC",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 18, height: 18, background: "#2957FF" }} />
          MOHAMED DESIGN
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -2,
            maxWidth: 920,
          }}
        >
          Logo & Brand Identity Systems
        </div>
        <div style={{ fontSize: 26, color: "#82807B" }}>mohameddesign.com</div>
      </div>
    ),
    { ...size },
  );
}
