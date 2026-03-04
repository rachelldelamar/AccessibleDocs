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
// This will eventually call Google Vision or AWS Textract (Still haven't decided which)
async function extractText(base64Image) {

  // TODO: Replace this with choosen OCR provider call
  // ------------------------------------------------
  // const response = await googleVisionClient.detect(base64Image);
  // return response.text;
  // ------------------------------------------------

  // MOCK DATA - NEEDS TO BE REPLACED WITH MY REAL OCR PROVIDER
  return "Welcome to AccessibleDocs!";
}

// Step 2 - Translate English text to Spanish
// This will eventually call DeepL or Google Translate
async function translateText(englishText) {

  // TODO: Replace this with choosen translation provider call
  // ------------------------------------------------
  // const response = await deeplClient.translate(englishText, { to: "es" });
  // return response.translatedText;
  // ------------------------------------------------

  // MOCK DATA - NEEDS TO BE REPLACED WITH MY REAL TRANSLATION PROVIDER
  return "Welcome to AccessibleDocs!";
}

module.exports = { extractText, translateText };