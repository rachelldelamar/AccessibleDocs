//Takes care of explanations

const express = require("express");
const router = express.Router();
const https = require("https");

// Helper to strip HTML tags from Wiktionary definitions
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

router.post("/explain", async (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ success: false, error: "No word given." });
  }

  const options = {
    hostname: "en.wiktionary.org",
    path: `/api/rest_v1/page/definition/${encodeURIComponent(word)}`,
    method: "GET",
    headers: { "User-Agent": "AccessibleDocs/1.0" },
  };

  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => { data += chunk; });
    response.on("end", () => {
      try {
        const parsed = JSON.parse(data);

        // Look for Spanish definition first, fall back to English
        const spanish = parsed["es"];
        const english = parsed["en"];
        const entry = spanish || english;

        if (!entry || entry.length === 0) {
          return res.json({ success: false, error: "Word not found." });
        }

        const meaning = entry[0];
        const definition = meaning?.definitions?.[0];

        res.json({
          success: true,
          word: word,
          language: spanish ? "Spanish" : "English",
          partOfSpeech: meaning?.partOfSpeech || null,
          definition: definition?.definition ? stripHtml(definition.definition) : null,
          example: definition?.example ? stripHtml(definition.example) : null,
        });
      } catch (err) {
        res.status(500).json({ success: false, error: "Failed to parse dictionary response." });
      }
    });
  });

  request.on("error", (err) => {
    res.status(500).json({ success: false, error: err.message });
  });

  request.end();
});

module.exports = router;