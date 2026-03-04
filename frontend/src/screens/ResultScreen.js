import React, { useState } from "react";

/**
 * ResultScreen
 * 
 * Shows the Spanish translation and the original English text.
 */
export default function ResultScreen({ imageSrc, original, translated, onReset }) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="screen">
      
      {/* Header with thumbnail */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12 
      }}>
        <img
          src={imageSrc}
          alt=""
          style={{
            width: 56,
            height: 56,
            objectFit: "cover",
            borderRadius: 10,
            border: "1px solid #e0d8c8",
          }}
        />
        <div>
          <div style={{ fontSize: 11, color: "#8a7a60", letterSpacing: "0.1em" }}>
            TRANSLATION
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#2c4a2e" }}>
            🇪🇸 Spanish
          </div>
        </div>
      </div>

      {/* Translated text */}
      <div style={{
        background: "#fffdf9",
        border: "1px solid #e0d8c8",
        borderRadius: 12,
        padding: "20px 22px",
      }}>
        <p style={{ 
          fontSize: 16, 
          lineHeight: 1.8, 
          margin: 0,
          color: "#1e2e1f",
        }}>
          {translated}
        </p>
      </div>

      {/* Collapsible original English */}
      <div style={{
        background: "#fffdf9",
        border: "1px solid #e0d8c8",
        borderRadius: 12,
        padding: "16px 22px",
      }}>
        <button
          onClick={() => setShowOriginal((v) => !v)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "Georgia, serif",
            fontSize: 13,
            color: "#8a7a60",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>🇺🇸 Show original English</span>
          <span>{showOriginal ? "−" : "+"}</span>
        </button>

        {showOriginal && (
          <p style={{
            fontSize: 14,
            lineHeight: 1.8,
            marginTop: 14,
            color: "#5a5040",
            fontStyle: "italic",
          }}>
            {original}
          </p>
        )}
      </div>

      {/* Reset button */}
      <button className="btn btn-primary" onClick={onReset}>
        📷 Translate Another Document
      </button>
    </div>
  );
}