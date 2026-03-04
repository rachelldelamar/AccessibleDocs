 const https = require("https");
 /**
 * translationService.js

 * 
 * This is where the OCR and translation logic is located.
 * Right now it returns mock data so it can tested before adding an API key.
 * 
 * I will replace the mock data inside when I pick the OCR and provider
 * each function with a real API call.
 */

// Step 1 - Extract text from image
// Step 1 - Extract text from image using Google Cloud Vision
async function extractText(base64Image) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;

    if (!apiKey) {
      reject(new Error("GOOGLE_VISION_API_KEY is missing from .env file"));
      return;
    }

    // Remove the data URL prefix if present
    // e.g. "data:image/jpeg;base64,/9j/..." → "/9j/..."
    const base64Data = base64Image.includes(",")
      ? base64Image.split(",")[1]
      : base64Image;

    const requestBody = JSON.stringify({
      requests: [
        {
          image: { content: base64Data },
          features: [{ type: "TEXT_DETECTION" }],
        },
      ],
    });

    const options = {
      hostname: "vision.googleapis.com",
      path: `/v1/images:annotate?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          const text = parsed.responses?.[0]?.fullTextAnnotation?.text;
          if (text) {
            resolve(text.trim());
          } else {
            reject(new Error("No text found in image"));
          }
        } catch (err) {
          reject(new Error("Failed to parse Vision API response"));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(requestBody);
    req.end();
  });
}

// Step 2 - Translates English text to Spanish using DeepL
async function translateText(englishText) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
      reject(new Error("DEEPL_API_KEY is missing from .env file"));
      return;
    }

    const params = new URLSearchParams({
      text: englishText,
      target_lang: "ES",
      source_lang: "EN",
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

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.translations && parsed.translations[0]) {
            resolve(parsed.translations[0].text);
          } else {
            reject(new Error("No translation returned from DeepL"));
          }
        } catch (err) {
          reject(new Error("Failed to parse DeepL response"));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}
module.exports = { extractText, translateText };