import React from "react";

/**
 * HomeScreen
 * 
 * The first screen users see when they open the app.
 * Contains the app logo, title, description, and two buttons:
 * - Take a Photo (opens camera directly)
 * - Upload from Library (opens photo library)
 */
function HomeScreen({ onImageSelected }) {

  // When a file is selected from either input, pass it up to App.js
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <div style={styles.container}>

      {/* App logo and branding */}
      <div style={styles.logoContainer}>
        <div style={styles.logo}>
          <span style={styles.logoText}>AD</span>
        </div>
        <h1 style={styles.title}>AccessibleDocs</h1>
        <p style={styles.subtitle}>
          Photograph any English document and get an instant Spanish translation.
        </p>
      </div>

      {/* Main action buttons */}
      <div style={styles.buttonContainer}>

        {/* Primary button - opens camera directly */}
        <button style={styles.primaryButton} onClick={() => document.getElementById("camera-input").click()}>
           Take a Photo
        </button>

        {/* Secondary button - opens photo library */}
        <button style={styles.secondaryButton} onClick={() => document.getElementById("file-input").click()}>
          Upload from Library
        </button>

        {/* Camera input - capture="environment" opens rear camera directly */}
        <input
          id="camera-input"
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* File input - opens photo library only */}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Feature highlights */}
      <div style={styles.features}>
        <div style={styles.feature}>
          <span style={styles.featureIcon}></span>
          <span style={styles.featureText}>Reads text from photos</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}></span>
          <span style={styles.featureText}>Translates to Spanish</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}></span>
          <span style={styles.featureText}>Tap words for definitions</span>
        </div>
      </div>

      <p style={styles.hint}>Works best with clear, well lit photos of printed English text.</p>
    </div>
  );
}

const GREEN = "#2E7D32";
const GREEN_LIGHT = "#E8F5E9";
const GREEN_DARK = "#1B5E20";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#FAFAFA",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "40px",
  },
 logo: {
    width: "80px",
    height: "80px",
    backgroundColor: GREEN,
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px auto",
    boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
  },
  logoText: {
    color: "white",
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: GREEN_DARK,
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    maxWidth: "320px",
    lineHeight: "1.5",
    margin: "0 auto",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "40px",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: GREEN,
    color: "white",
    border: "none",
    borderRadius: "14px",
    padding: "18px 24px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "12px",
    boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "white",
    color: GREEN,
    border: `2px solid ${GREEN}`,
    borderRadius: "14px",
    padding: "16px 24px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "12px",
  },
  features: {
    display: "flex",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: GREEN_LIGHT,
    borderRadius: "12px",
    padding: "16px",
    width: "100px",
    gap: "8px",
  },
  featureIcon: {
    fontSize: "24px",
  },
  featureText: {
    fontSize: "12px",
    color: GREEN_DARK,
    textAlign: "center",
    fontWeight: "500",
  },
  hint: {
    fontSize: "12px",
    color: "#999",
    textAlign: "center",
  },
};

export default HomeScreen;