import React, { useRef } from "react";

/**
 * HomeScreen
 * 
 * First screen the user sees.
 * Two options available, take a photo or upload from library.
 */
export default function HomeScreen({ onImageSelected }) {
  const cameraRef = useRef();
  const uploadRef = useRef();

  return (
    <div className="screen">
      <div style={{ textAlign: "center", padding: "40px 0 20px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          AccessibleDocs
        </h1>
        <p style={{ color: "#5a5040", fontSize: 15, lineHeight: 1.6 }}>
          Photograph any English document and get an instant Spanish translation.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Opens device camera */}
        <button
          className="btn btn-primary"
          onClick={() => cameraRef.current.click()}
        >
          📷 Take a Photo
        </button>

        {/* Opens file picker */}
        <button
          className="btn btn-secondary"
          onClick={() => uploadRef.current.click()}
        >
          🖼 Upload from Library
        </button>
      </div>

      <p style={{ 
        textAlign: "center", 
        fontSize: 12, 
        color: "#8a7a60",
        marginTop: 24 
      }}>
        Works best with clear, well lit photos of printed English text.
      </p>

      {/* Hidden inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => onImageSelected(e.target.files[0])}
      />
      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => onImageSelected(e.target.files[0])}
      />
    </div>
  );
}