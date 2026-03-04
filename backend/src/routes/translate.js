const express = require("express");
const router = express.Router();
const { extractText, translateText } = require("../services/translationService");

// POST /api/translate
// Receives an image, returns original and translated text (FIRST STEP)
router.post("/translate", async (req, res) => {
  try {
    const { image } = req.body;

    // Validate - make sure an image was sent
    if (!image) {
      return res.status(400).json({ 
        success: false, 
        error: "No image provided." 
      });
    }

    // Step 1 - Extract text from image
    const original = await extractText(image);

    if (!original || original.trim().length === 0) {
      return res.status(422).json({ 
        success: false, 
        error: "No text found in image." 
      });
    }

    // Step 2 - Translate extracted text to Spanish
    const translated = await translateText(original);

    // Return result to frontend (For user to receive)
    return res.json({
      success: true,
      original: original.trim(),
      translated: translated.trim(),
    });

  } catch (error) {
    console.error("Translation error:", error.message);
    return res.status(500).json({ 
      success: false, 
      error: "Translation failed. Please try again." 
    });
  }
});

module.exports = router;