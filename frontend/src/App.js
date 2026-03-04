import React from 'react';
import { useTranslation } from './hooks/useTranslation';
import HomeScreen from './screens/HomeScreen';
import PreviewScreen from './screens/PreviewScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultScreen from './screens/ResultScreen';

function App() {
  const translation = useTranslation();

  return (
    <div className="app">
      {translation.stage === 'idle' && (
        <HomeScreen onImageSelected={translation.handleImageSelected} />
      )}
      {translation.stage === 'preview' && (
        <PreviewScreen
          imageSrc={translation.imageSrc}
          error={translation.error}
          onTranslate={translation.handleTranslate}
          onRetake={translation.handleReset}
        />
      )}
      {translation.stage === 'loading' && (
        <LoadingScreen />
      )}
      {translation.stage === 'result' && (
        <ResultScreen
          imageSrc={translation.imageSrc}
          original={translation.original}
          translated={translation.translated}
          onReset={translation.handleReset}
        />
      )}
    </div>
  );
}

export default App;