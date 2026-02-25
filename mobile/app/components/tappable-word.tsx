import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TappableWordProps {
  word: string;
  trailing?: string;
  onPress: (word: string) => void;
  isSelected?: boolean;
}

export function TappableWord({ word, trailing = '', onPress, isSelected = false }: TappableWordProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const tintColor = Colors[colorScheme].tint;
  const textColor = Colors[colorScheme].text;

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(word)}
        style={[styles.word, isSelected && { backgroundColor: tintColor + '33' }]}
        activeOpacity={0.6}>
        <Text
          style={[
            styles.wordText,
            {
              color: tintColor,
              borderBottomWidth: 1,
              borderBottomColor: tintColor + '88',
            },
          ]}>
          {word}
        </Text>
      </TouchableOpacity>
      {trailing ? <Text style={[styles.punctuation, { color: textColor }]}>{trailing}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  word: {
    borderRadius: 3,
    paddingHorizontal: 1,
  },
  wordText: {
    fontSize: 16,
    lineHeight: 26,
  },
  punctuation: {
    fontSize: 16,
    lineHeight: 26,
  },
});
