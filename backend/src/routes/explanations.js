//Takes care of explanations.

const express = require("express");
const router = express.Router();
const https = require("https");

/**
 * makeHttpsRequest
 * Helper function to make HTTPS requests and return the response as a string.
 */
function makeHttpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    if (postData) req.write(postData);
    req.end();
  });
}

/**
 * translateWithDeepl
 * Translates text between languages using DeepL.
 * sourceLang: "ES" or "EN"
 * targetLang: "ES" or "EN"
 */
async function translateWithDeepl(text, sourceLang, targetLang) {
  const apiKey = process.env.DEEPL_API_KEY;
  const params = new URLSearchParams({
    text,
    target_lang: targetLang,
    source_lang: sourceLang,
  });
  const postData = params.toString();

  const options = {
    hostname: "api-free.deepl.com",
    path: "/v2/translate",
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const response = await makeHttpsRequest(options, postData);
  const parsed = JSON.parse(response);
  return parsed.translations?.[0]?.text || text;
}

/**
 * getEnglishDefinition
 * Looks up a word on the Free Dictionary API and returns
 * the part of speech and full definition in English.
 */
async function getEnglishDefinition(englishWord) {
  const options = {
    hostname: "api.dictionaryapi.dev",
    path: `/api/v2/entries/en/${encodeURIComponent(englishWord)}`,
    method: "GET",
  };

  const response = await makeHttpsRequest(options);
  const parsed = JSON.parse(response);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return null;
  }

  const meaning = parsed[0].meanings?.[0];
  const definition = meaning?.definitions?.[0];

  return {
    partOfSpeech: meaning?.partOfSpeech || null,
    definition: definition?.definition || null,
    example: definition?.example || null,
  };
}

/**
 * POST /api/explain
 * 
 * Full flow:
 * 1. Translate the tapped Spanish word to English using DeepL
 * 2. Look up the English word on Free Dictionary API
 * 3. Translate the full English definition back to Spanish using DeepL
 * 4. Return the Spanish definition to the frontend
 */
router.post("/explain", async (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ success: false, error: "No word provided." });
  }

  try {
    // Step 1: Translate Spanish word to English
    const englishWord = await translateWithDeepl(word, "ES", "EN");

    // Step 2: Look up the English word in the Free Dictionary
    const englishEntry = await getEnglishDefinition(englishWord.toLowerCase());

    if (!englishEntry || !englishEntry.definition) {
      return res.json({ success: false, error: "Palabra no encontrada." });
    }

    // Step 3: Translate the English definition to Spanish
    const spanishDefinition = await translateWithDeepl(
      englishEntry.definition,
      "EN",
      "ES"
    );

    // Step 4: Translate the example sentence to Spanish (if one exists)
    const spanishExample = englishEntry.example
      ? await translateWithDeepl(englishEntry.example, "EN", "ES")
      : null;

    res.json({
      success: true,
      word: word,
      partOfSpeech: englishEntry.partOfSpeech,
      definition: spanishDefinition,
      example: spanishExample,
    });

  } catch (err) {
    res.status(500).json({ success: false, error: "Error al buscar la definición." });
  }
});

module.exports = router;