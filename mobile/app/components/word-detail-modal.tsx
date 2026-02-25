import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Small set of sample definitions for demonstration purposes.
// In a production app this would come from a dictionary API.
const SAMPLE_DEFINITIONS: Record<string, { definition: string; example: string; origin: string }> = {
  translation: {
    definition: 'The process of converting text from one language into another.',
    example: 'The translation of the document took several hours.',
    origin: 'From Latin "translatio", meaning a carrying across.',
  },
  language: {
    definition: 'A system of communication used by a particular community.',
    example: 'She speaks three languages fluently.',
    origin: 'From Latin "lingua", meaning tongue.',
  },
  document: {
    definition: 'A piece of written, printed, or electronic material that provides information.',
    example: 'Please sign the document before submitting it.',
    origin: 'From Latin "documentum", meaning lesson or proof.',
  },
  word: {
    definition: 'A single unit of language that carries meaning and can be spoken or written.',
    example: 'She chose every word carefully.',
    origin: 'From Old English "word", meaning speech or utterance.',
  },
  meaning: {
    definition: 'What something is intended to express or represent.',
    example: 'The meaning of the poem was open to interpretation.',
    origin: 'From Old English "mænan", to intend or signify.',
  },
  context: {
    definition:
      'The circumstances surrounding an event or statement that clarify its full significance.',
    example: 'You need to understand the context before judging.',
    origin: 'From Latin "contextus", meaning connection.',
  },
  bridge: {
    definition:
      'A structure or concept connecting two separate things, allowing passage between them.',
    example: 'The new policy acts as a bridge between the two departments.',
    origin: 'From Old English "brycg", meaning bridge.',
  },
  learn: {
    definition: 'To gain knowledge or skills through study, experience, or being taught.',
    example: 'Children learn best through play.',
    origin: 'From Old English "leornian", meaning to get knowledge.',
  },
};

function getWordDetails(word: string) {
  const key = word.toLowerCase().replace(/[^a-z]/g, '');
  return (
    SAMPLE_DEFINITIONS[key] ?? {
      definition:
        'Connect a dictionary API to display definitions for this word in real time.',
      example: `"${word}" used in a sentence.`,
      origin: 'Etymology data requires a dictionary API integration.',
    }
  );
}

interface WordDetailModalProps {
  word: string | null;
  onClose: () => void;
}

export function WordDetailModal({ word, onClose }: WordDetailModalProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;

  if (!word) return null;

  const details = getWordDetails(word);

  return (
    <Modal
      visible={!!word}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <ThemedView style={styles.sheet}>
        <View style={[styles.handle, { backgroundColor: tintColor + '44' }]} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedText type="title" style={styles.wordTitle}>
            {word}
          </ThemedText>

          <Section title="Definition" tintColor={tintColor}>
            <ThemedText>{details.definition}</ThemedText>
          </Section>

          <Section title="Example" tintColor={tintColor}>
            <ThemedText style={styles.italic}>{details.example}</ThemedText>
          </Section>

          <Section title="Origin" tintColor={tintColor}>
            <ThemedText>{details.origin}</ThemedText>
          </Section>
        </ScrollView>

        <Pressable onPress={onClose} style={[styles.closeButton, { borderColor: tintColor }]}>
          <ThemedText style={[styles.closeText, { color: tintColor }]}>Close</ThemedText>
        </Pressable>
      </ThemedView>
    </Modal>
  );
}

function Section({
  title,
  children,
  tintColor,
}: {
  title: string;
  children: React.ReactNode;
  tintColor: string;
}) {
  return (
    <View style={styles.section}>
      <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: tintColor }]}>
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  wordTitle: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    gap: 4,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  italic: {
    fontStyle: 'italic',
  },
  closeButton: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
