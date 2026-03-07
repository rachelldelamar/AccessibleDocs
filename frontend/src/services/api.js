/**
 * api.js
 * 
 * The only file in the frontend that will connect to my backend.
 * All screens go through here, nothing will be fetched directly.
 */

const BASE_URL = "http://localhost:3001/api";

export async function translateImage(base64Image) {
  const response = await fetch(`${BASE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Translation failed.");
  }

  return {
    original: data.original,
    translated: data.translated,
  };
}

// Messenger between the frontend and backend for word lookups.
export async function explainWord(word) {
  // Send the tapped word to our backend which looks it up on Wiktionary
  const response = await fetch(`${BASE_URL}/explain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Could not find definition.");
  }

  return {
    word: data.word,
    partOfSpeech: data.partOfSpeech,
    definition: data.definition,
    example: data.example,
    language: data.language,
  };
}