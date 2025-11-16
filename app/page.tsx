"use client";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFFDF7",
      padding: "2rem",
      color: "#2A2A2A",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
        TakeaChefHome.com
      </h1>

      <p style={{ marginTop: "1rem", fontSize: "1rem", maxWidth: "600px" }}>
        Welcome to the culinary marketplace demo.  
        The backend is connected and the Post-a-Lead page is live.  
        Use the link below to open the form:
      </p>
      
      <a 
        href="/post-a-lead"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.75rem 1.25rem",
          background: "#FF7A00",
          color: "white",
          borderRadius: "8px",
          fontWeight: "600",
          textDecoration: "none"
        }}
      >
        Go to Post a Lead
      </a>
    </div>
  );
}
