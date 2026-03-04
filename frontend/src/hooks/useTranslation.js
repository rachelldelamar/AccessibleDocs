/**
 * useTranslation.js
 * 
 * Manages all the state and logic for the translation flow.
 * Screens will just call these functions and read these values.
 */

import { useState } from "react";
import { translateImage } from "../services/api";

export function useTranslation() {
  const [stage, setStage] = useState("idle");
  const [imageSrc, setImageSrc] = useState(null);
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [error, setError] = useState(null);

  // Called when user picks or takes an image
  function handleImageSelected(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setError(null);
      setStage("preview");
    };
    reader.readAsDataURL(file);
  }

  // Called when user confirms and hits Translate
  async function handleTranslate() {
    setStage("loading");
    setError(null);
    try {
      const result = await translateImage(imageSrc);
      setOriginal(result.original);
      setTranslated(result.translated);
      setStage("result");
    } catch (err) {
      setError(err.message);
      setStage("preview");
    }
  }

  // Resets everything back to the beginning
  function handleReset() {
    setStage("idle");
    setImageSrc(null);
    setOriginal("");
    setTranslated("");
    setError(null);
  }

  return {
    stage,
    imageSrc,
    original,
    translated,
    error,
    handleImageSelected,
    handleTranslate,
    handleReset,
  };
}
