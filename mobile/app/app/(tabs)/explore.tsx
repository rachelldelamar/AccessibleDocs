import { ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AboutScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;
  const iconColor = Colors[colorScheme].icon;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <IconSymbol name="doc.text.magnifyingglass" size={40} color={tintColor} />
          <View style={styles.headerText}>
            <ThemedText type="title">About</ThemedText>
            <ThemedText style={{ color: iconColor }}>AccessibleDocs</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.intro}>
          AccessibleDocs is an intelligent translation platform that goes beyond converting text.
          After translation, you can tap any word to access definitions, context, and deeper
          meaning — transforming documents into interactive learning experiences that bridge
          language gaps.
        </ThemedText>

        {/* Feature collapsibles */}
        <Collapsible title="Interactive word exploration">
          <ThemedText>
            Every translated word is tappable. Tap a word to instantly see its{' '}
            <ThemedText type="defaultSemiBold">definition</ThemedText>,{' '}
            <ThemedText type="defaultSemiBold">example in context</ThemedText>, and{' '}
            <ThemedText type="defaultSemiBold">origin / etymology</ThemedText>.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Multi-language support">
          <ThemedText>
            Translate between many languages including Spanish, French, German, Japanese,
            Portuguese, and Chinese. Connect a translation API such as Google Translate or DeepL
            to unlock full translation capabilities.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Connecting a translation API">
          <ThemedText>
            To enable real translations, add your API key to a{' '}
            <ThemedText type="defaultSemiBold">.env</ThemedText> file at the project root and
            implement the{' '}
            <ThemedText type="defaultSemiBold">handleTranslate</ThemedText> function in{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>.
          </ThemedText>
          <ThemedText style={styles.codeBlock}>
            {'EXPO_PUBLIC_TRANSLATE_API_KEY=your_key_here'}
          </ThemedText>
        </Collapsible>

        <Collapsible title="Connecting a dictionary API">
          <ThemedText>
            Word definitions are served from a built-in sample set. To provide real definitions,
            connect a dictionary API (e.g. Merriam-Webster, Oxford, Free Dictionary API) inside{' '}
            <ThemedText type="defaultSemiBold">components/word-detail-modal.tsx</ThemedText>.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Dark mode support">
          <ThemedText>
            The app fully supports light and dark mode. Colors adapt automatically using the
            device&apos;s current color scheme.
          </ThemedText>
        </Collapsible>

      </ScrollView>
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
    gap: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  headerText: {
    gap: 2,
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  codeBlock: {
    fontFamily: 'monospace',
    fontSize: 13,
    marginTop: 6,
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(128,128,128,0.12)',
  },
});
