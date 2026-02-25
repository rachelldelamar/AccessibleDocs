import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { TappableWord } from '@/components/tappable-word';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WordDetailModal } from '@/components/word-detail-modal';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Portuguese', 'Chinese'];

/** Splits a string into tokens preserving trailing punctuation separately. */
function tokenize(text: string): { word: string; trailing: string }[] {
  return text.split(/\s+/).flatMap((raw) => {
    if (!raw) return [];
    const match = raw.match(/^([^.,!?;:'"()[\]{}]+)([.,!?;:'"()[\]{}]*)$/);
    if (match) return [{ word: match[1], trailing: match[2] }];
    return [{ word: raw, trailing: '' }];
  });
}

export default function TranslateScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;
  const borderColor = Colors[colorScheme].icon;
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = Colors[colorScheme].text;

  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [translatedTokens, setTranslatedTokens] = useState<{ word: string; trailing: string }[] | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  function handleTranslate() {
    Keyboard.dismiss();
    if (!inputText.trim()) return;
    // In a production app, call a translation API here.
    // For now, tokenise the input text so users can explore the interactive features.
    setTranslatedTokens(tokenize(inputText.trim()));
  }

  function handleWordPress(word: string) {
    setSelectedWord(word);
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <ThemedText type="title" style={styles.heading}>
          AccessibleDocs
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: borderColor }]}>
          Translate documents and tap any word to explore its meaning.
        </ThemedText>

        {/* Input */}
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Enter text to translate
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor,
              color: textColor,
              backgroundColor: backgroundColor,
            },
          ]}
          multiline
          numberOfLines={5}
          placeholder="Paste or type your text here…"
          placeholderTextColor={borderColor}
          value={inputText}
          onChangeText={setInputText}
          textAlignVertical="top"
        />

        {/* Language selector */}
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Translate to
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.langRow}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => setTargetLanguage(lang)}
              style={[
                styles.langChip,
                {
                  borderColor: lang === targetLanguage ? tintColor : borderColor,
                  backgroundColor: lang === targetLanguage ? tintColor + '22' : 'transparent',
                },
              ]}>
              <ThemedText
                style={[
                  styles.langChipText,
                  { color: lang === targetLanguage ? tintColor : textColor },
                ]}>
                {lang}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Translate button */}
        <Pressable
          onPress={handleTranslate}
          style={[styles.translateButton, { backgroundColor: tintColor }]}>
          <ThemedText style={styles.translateButtonText}>Translate</ThemedText>
        </Pressable>

        {/* API note */}
        <View style={[styles.noteBanner, { borderColor: tintColor + '44', backgroundColor: tintColor + '11' }]}>
          <ThemedText style={[styles.noteText, { color: borderColor }]}>
            💡 Connect a translation API (e.g. Google Translate, DeepL) to enable real translations.
            Until then, your input text is displayed with interactive words.
          </ThemedText>
        </View>

        {/* Translated output */}
        {translatedTokens && (
          <View style={styles.outputSection}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Result ({targetLanguage}) — tap any word
            </ThemedText>
            <ThemedView style={[styles.outputBox, { borderColor }]}>
              <View style={styles.wordWrap}>
                {translatedTokens.map((token, i) => (
                  <TappableWord
                    key={i}
                    word={token.word}
                    trailing={token.trailing + ' '}
                    onPress={handleWordPress}
                    isSelected={selectedWord === token.word}
                  />
                ))}
              </View>
            </ThemedView>
          </View>
        )}
      </ScrollView>

      <WordDetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingTop: 60,
    gap: 12,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
  },
  langRow: {
    gap: 8,
    paddingVertical: 4,
  },
  langChip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  langChipText: {
    fontSize: 14,
  },
  translateButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  translateButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  noteBanner: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 18,
  },
  outputSection: {
    gap: 8,
    marginTop: 4,
  },
  outputBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  wordWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
});
