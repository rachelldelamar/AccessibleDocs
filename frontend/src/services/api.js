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
