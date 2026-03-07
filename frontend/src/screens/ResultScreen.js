import React, { useState } from "react";
import { explainWord } from "../services/api";

function WordPopup({ word, data, loading, error, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✕</button>
        <h2 style={styles.popupWord}>{word}</h2>
        {loading && <p style={styles.popupText}>Looking up...</p>}
        {error && <p style={styles.popupError}>{error}</p>}
        {data && (
          <>
            <p style={styles.popupPos}>{data.partOfSpeech}</p>
            <p style={styles.popupDefinition}>{data.definition}</p>
            {data.example && (
              <p style={styles.popupExample}>"{data.example}"</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ResultScreen({ original, translated, onReset }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [wordLoading, setWordLoading] = useState(false);
  const [wordError, setWordError] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleWordTap = async (word) => {
    // Clean punctuation from word
    const cleanWord = word.replace(/[^a-záéíóúüñ]/gi, "").toLowerCase();
    if (!cleanWord) return;

    setSelectedWord(cleanWord);
    setWordData(null);
    setWordError(null);
    setWordLoading(true);

    try {
      const result = await explainWord(cleanWord);
      setWordData(result);
    } catch (err) {
      setWordError("Could not find definition.");
    } finally {
      setWordLoading(false);
    }
  };

  const handleClosePopup = () => {
    setSelectedWord(null);
    setWordData(null);
    setWordError(null);
  };

  const words = translated ? translated.split(/(\s+)/) : [];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AccessibleDocs</h1>
      <p style={styles.subtitle}>Tap any word to look it up</p>

      <div style={styles.translatedBox}>
        <p style={styles.label}>Spanish Translation</p>
        <div style={styles.wordContainer}>
          {words.map((word, index) =>
            word.trim() ? (
              <span
                key={index}
                style={styles.tappableWord}
                onClick={() => handleWordTap(word)}
              >
                {word}
              </span>
            ) : (
              <span key={index}>{word}</span>
            )
          )}
        </div>
      </div>

      <button
        style={styles.toggleButton}
        onClick={() => setShowOriginal(!showOriginal)}
      >
        {showOriginal ? "Hide Original" : "Show Original English"}
      </button>

      {showOriginal && (
        <div style={styles.originalBox}>
          <p style={styles.label}>Original English</p>
          <p style={styles.originalText}>{original}</p>
        </div>
      )}

      <button style={styles.resetButton} onClick={onReset}>
        Translate Another Document
      </button>

      {selectedWord && (
        <WordPopup
          word={selectedWord}
          data={wordData}
          loading={wordLoading}
          error={wordError}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "20px",
    fontSize: "14px",
  },
  translatedBox: {
    backgroundColor: "#f0f7ff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
  },
  label: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  wordContainer: {
    fontSize: "18px",
    lineHeight: "2",
  },
  tappableWord: {
    cursor: "pointer",
    borderRadius: "4px",
    padding: "2px 4px",
    display: "inline-block",
    transition: "background-color 0.2s",
    backgroundColor: "transparent",
  },
  toggleButton: {
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    marginBottom: "12px",
    fontSize: "14px",
  },
  originalBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
  },
  originalText: {
    fontSize: "16px",
    lineHeight: "1.6",
  },
  resetButton: {
    backgroundColor: "#007AFF",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 24px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "320px",
    width: "90%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
  },
  popupWord: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "4px",
    marginTop: "0",
  },
  popupPos: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  popupText: {
    color: "#666",
  },
  popupError: {
    color: "#cc0000",
  },
  popupDefinition: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  popupExample: {
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic",
    marginTop: "8px",
  },
};

export default ResultScreen;