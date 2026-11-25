import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";

// Used for both new notes (no id) and editing (id passed from the notepad screen)
export default function NotePage() {
  const { id } = useLocalSearchParams();
  const editingId = id ? String(id) : null;

  const [loadingNote, setLoadingNote] = useState(!!editingId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editingId) return;

    async function loadNote() {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", editingId)
        .maybeSingle();

      if (error) {
        Alert.alert("Could not load note", error.message);
      } else if (data) {
        setTitle(data.title);
        setContent(data.content);
        setPinned(data.pinned);
      }
      setLoadingNote(false);
    }

    loadNote();
  }, [editingId]);

  async function saveNote() {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle && !cleanContent) {
      Alert.alert("Empty note", "Write a title or some text before saving.");
      return;
    }

    setSaving(true);

    // user_id is filled in automatically by the table default (auth.uid())
    const result = editingId
      ? await supabase
          .from("notes")
          .update({
            title: cleanTitle,
            content: cleanContent,
            pinned,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId)
      : await supabase.from("notes").insert({
          title: cleanTitle,
          content: cleanContent,
          pinned,
        });

    setSaving(false);

    if (result.error) {
      Alert.alert("Could not save", result.error.message);
      return;
    }

    router.back();
  }

  function confirmDelete() {
    Alert.alert("Delete note", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("notes")
            .delete()
            .eq("id", editingId);

          if (error) {
            Alert.alert("Could not delete", error.message);
            return;
          }
          router.back();
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          {editingId ? "Edit note" : "New note"}
        </Text>

        <Pressable onPress={saveNote} disabled={saving || loadingNote} hitSlop={10}>
          {saving ? (
            <ActivityIndicator color="#293DAA" />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </Pressable>
      </View>

      {loadingNote ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#293DAA" />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="Start writing..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />

            <Pressable
              style={styles.pinToggle}
              onPress={() => setPinned(!pinned)}
            >
              <Text style={styles.pinToggleText}>
                {pinned ? "Pinned ✓" : "Pin this note"}
              </Text>
            </Pressable>

            {editingId && (
              <Pressable style={styles.deleteButton} onPress={confirmDelete}>
                <Text style={styles.deleteText}>Delete note</Text>
              </Pressable>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9EBF2",
    backgroundColor: "#FFFFFF",
  },
  backText: {
    fontSize: 16,
    color: "#69758F",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#171B2D",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#293DAA",
  },
  body: {
    padding: 20,
    paddingBottom: 40,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#171B2D",
    paddingVertical: 8,
    marginBottom: 12,
  },
  contentInput: {
    fontSize: 16,
    color: "#171B2D",
    lineHeight: 24,
    minHeight: 300,
    paddingVertical: 8,
  },
  pinToggle: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7EAF2",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  pinToggleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#293DAA",
  },
  deleteButton: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  deleteText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#DC2626",
  },
});
