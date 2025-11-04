import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_BASE = 'https://agentic-87e29b64.vercel.app';

export default function App() {
  const [content, setContent] = useState('');
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setQuiz(null);
    try {
      const res = await fetch(`${API_BASE}/api/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionContent: content, numQuestions: 5 }),
      });
      const j = await res.json();
      setQuiz(j);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>EduPortal Mobile</Text>
        <Text style={styles.subtitle}>AI Quiz Generator</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Paste session notes here..."
          value={content}
          onChangeText={setContent}
        />
        <Button title={loading ? 'Generating...' : 'Generate Quiz'} onPress={generate} disabled={!content || loading} />
        {quiz?.questions?.map((q: any, i: number) => (
          <View key={i} style={styles.card}>
            <Text style={styles.q}>Q{i + 1}. {q.question}</Text>
            {q.options.map((opt: string, j: number) => (
              <Text key={j} style={styles.opt}>? {opt}</Text>
            ))}
            <Text style={styles.ans}>Answer: option {q.answerIndex + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 4, marginBottom: 8, fontSize: 14, color: '#555' },
  input: { minHeight: 120, borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  card: { marginTop: 12, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  q: { fontWeight: '600', marginBottom: 6 },
  opt: { fontSize: 14, color: '#333' },
  ans: { marginTop: 6, color: '#065f46' },
});
