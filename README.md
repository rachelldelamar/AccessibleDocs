# What is AccessibleDocs?
AccessibleDocs is meant to be an intelligent translation platform that goes beyond converting text. After translation, users can click any word to access definitions, context, and deeper meaning, transforming documents into interactive learning experiences that bridge language gaps.


## What It Does

Users photograph any English document such as a letter, article, menu, or form, and receive an instant Spanish translation. After translation, users can tap any word to access its definition, grammatical context, and usage examples, transforming static documents into interactive learning experiences, and making documentation more accessible for users.

## Features

- **Camera capture** — photograph any printed English document directly from the app
- **OCR (Optical Character Recognition)** — Google Cloud Vision reads and extracts text from photos
- **Instant translation** — full English to Spanish translation with this used of DeepL
- **Word tap** *(feature now being implemented)* — tap any Spanish word to see its definition, grammar, and usage examples

## Tech Stack

### Frontend
- **React** — JavaScript library for building the user interface
- **FileReader API** — built into the browser, converts the captured photo into a format the backend can read
- **Fetch API** — built into the browser, sends the image to the backend and receives the translation
- **Custom React Hooks** — manages all the app state (which screen to show, the image, the translation result)
- **CSS** — To style and layouts of the screens

### Backend
- **Node.js** — JavaScript runtime that powers the server
- **Express** — framework that creates the server and handles incoming requests from the frontend
- **dotenv** — securely loads API keys from the `.env` file so they are never exposed into the main branch
- **CORS** — allows the frontend running on port 3000 to communicate with the backend on port 3001
- **Google Cloud Vision API** — OCR service that reads and extracts text from the photographed document
- **DeepL API** — translation service that converts the extracted English text into Spanish

## How It Works
```
User takes or uploads a photo
      ↓
Frontend converts photo to base64 and sends it to backend
      ↓
Backend sends image to Google Cloud Vision and extracts English text
      ↓
Backend sends English text to DeepL and returns Spanish translation
      ↓
Backend sends { original, translated } back to frontend
      ↓
Frontend displays the Spanish translation to the user
```

## Project Structure
```
AccessibleDocs/
├── frontend/                    ← React app (what the user sees)
│   └── src/
│       ├── App.js               ← shows the screens
│       ├── hooks/
│       │   └── useTranslation.js  ← manages all state and logic
│       ├── screens/
│       │   ├── HomeScreen.js    ← camera and upload buttons
│       │   ├── PreviewScreen.js ← shows image before translating
│       │   ├── LoadingScreen.js ← Loading/spinner while backend works
│       │   └── ResultScreen.js  ← displays the Spanish translation
│       └── services/
│           └── api.js           ← the only file that talks to the backend
│
└── backend/                     ← Node/Express server
    └── src/
        ├── index.js             ← starts the Express server on port 3001
        ├── routes/
        │   └── translate.js     ← POST /api/translate endpoint
        └── services/
            └── translationService.js  ← OCR and translation logic lives here
```

## Branch Strategy
```
main          ← ready code only
dev           ← active development, frontend and backend combined here
feature/xxx   ← one branch per feature, merged into dev when done
```

## Getting Started

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:3001`

**Frontend:**
```bash
cd frontend
npm install
npm start
```
App runs on `http://localhost:3000`


## Current Status

- (Completed) Backend server running on Express
- (Completed) Frontend React app with camera capture
- (Completed) Full flow working end to end with mock data
- (Completed)Google Cloud Vision integration
- (Completed) DeepL integration
- (Completed) Word tap feature, tap any Spanish word for a full Spanish definition