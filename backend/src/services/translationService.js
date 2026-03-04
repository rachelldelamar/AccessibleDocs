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
//I am using Google Vision, this will still be mock data until its done being set up
async function extractText(base64Image) {

  // TODO: Replace this with choosen OCR provider call
 
  return "Welcome to AccessibleDocs!";
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