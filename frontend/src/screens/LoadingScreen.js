import React from "react";

/**
 * LoadingScreen
 * 
 * Shown while the backend is processing the image. (Visual transition for user.)
 */
export default function LoadingScreen() {
  return (
    <div className="screen" style={{ 
      alignItems: "center", 
      justifyContent: "center",
      minHeight: "80vh",
      textAlign: "center",
    }}>
      {/* Spinner Image */}
      <div style={{
        width: 56,
        height: 56,
        border: "3px solid #e0d8c8",
        borderTop: "3px solid #2c4a2e",
        borderRadius: "50%",
        animation: "spin 0.9s linear infinite",
        marginBottom: 24,
      }} />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
        Translating…
      </h2>
      <p style={{ color: "#8a7a60", fontSize: 14 }}>
        Reading and translating your document
      </p>
    </div>
  );
}