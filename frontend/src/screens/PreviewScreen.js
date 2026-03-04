import React from "react";

/**
 * PreviewScreen
 * 
 * Shows the taken image before sending to backend.
 * User can confirm or retake the photo if they choose to.
 */
export default function PreviewScreen({ imageSrc, error, onTranslate, onRetake }) {
  return (
    <div className="screen">
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>
        Your Document
      </h2>

      {/* Gives an image preview */}
      <div style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e0d8c8",
      }}>
        <img
          src={imageSrc}
          alt="Captured document"
          style={{ width: "100%", display: "block", maxHeight: 380, objectFit: "cover" }}
        />
      </div>

      {/* Show error if last attempt did not work */}
      {error && (
        <div className="error-banner">
          ⚠ {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button className="btn btn-primary" onClick={onTranslate}>
          Translate to Spanish →
        </button>
        <button className="btn btn-secondary" onClick={onRetake}>
          Retake Photo
        </button>
      </div>
    </div>
  );
}