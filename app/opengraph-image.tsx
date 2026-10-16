import { ImageResponse } from "next/og";

export const alt = "Duncan D'Lima — Data Scientist & Applied AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060608",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#f4f4f6",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.15em",
              color: "#ff7a1a",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Duncan D&apos;Lima
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#888890",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Portfolio &middot; 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            From raw data to real-world systems.
          </div>
          <div style={{ fontSize: 28, color: "#9a9aa2", fontWeight: 300 }}>
            Machine learning, data engineering and applied AI.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 32,
          }}
        >
          <div style={{ fontSize: 18, color: "#888890" }}>
            CTO & Co-Founder, Tekkloom &middot; B.Tech Data Science, NMIMS (3.89 CGPA)
          </div>
          <div style={{ fontSize: 18, color: "#ff7a1a" }}>github.com/DunD514</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
