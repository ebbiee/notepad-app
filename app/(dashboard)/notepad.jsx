import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { supabase } from "../../lib/supabase";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Notepad() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("pinned", { ascending: false })
      .order("updated_at", { ascending: false });

    if (error) {
      Alert.alert("Could not load notes", error.message);
    } else {
      setNotes(data ?? []);
    }
    setLoading(false);
  }, []);

  // Check the user is logged in
  useEffect(() => {
    let active = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      if (!session) {
        router.replace("/login");
        return;
      }
      setEmail(session.user.email ?? "");
    }

    checkSession();
    return () => {
      active = false;
    };
  }, []);

  // Reload notes every time this screen comes into focus,
  // so changes made on the note page show up when you come back
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes]),
  );

  function openNewNote() {
    router.push("/note");
  }

  function openNote(note) {
    router.push({ pathname: "/note", params: { id: note.id } });
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  function confirmSignOut() {
    Alert.alert("Log out", "Do you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: signOut },
    ]);
  }

  const pinnedNotes = notes.filter((n) => n.pinned);
  const otherNotes = notes.filter((n) => !n.pinned);

  function renderNote(note, isPinned) {
    return (
      <Pressable
        key={note.id}
        onPress={() => openNote(note)}
        style={({ pressed }) => [
          isPinned ? styles.pinnedCard : styles.noteCard,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.noteTitle} numberOfLines={1}>
          {note.title || "Untitled"}
        </Text>
        {!!note.content && (
          <Text style={styles.noteDescription} numberOfLines={2}>
            {note.content}
          </Text>
        )}
        <Text style={styles.noteDate}>{formatDate(note.updated_at)}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FC" />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#293DAA" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.navbar}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>≡</Text>
            </View>

            <Text style={styles.appName}>Notepad</Text>

            <Pressable onPress={confirmSignOut} style={styles.avatar}>
              <Text style={styles.avatarText}>
                {email ? email[0].toUpperCase() : "?"}
              </Text>
            </Pressable>
          </View>

          {notes.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptyText}>
                Tap the + button below to write your first note.
              </Text>
            </View>
          )}

          {pinnedNotes.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Pinned</Text>
              </View>
              {pinnedNotes.map((note) => renderNote(note, true))}
            </>
          )}

          {otherNotes.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Notes</Text>
              </View>
              {otherNotes.map((note) => renderNote(note, false))}
            </>
          )}
        </ScrollView>
      )}

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Text style={styles.activeLabel}>Notepad</Text>
        </View>

        <Pressable
          onPress={openNewNote}
          style={({ pressed }) => [
            styles.addButton,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.addText}>+</Text>
        </Pressable>

        <View style={styles.navItem}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profileImage}
          />
          <Text style={styles.navLabel}>Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 22,
    marginBottom: 32,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#F5B82E",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#171B2D",
    marginLeft: 12,
    flex: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E2E7F5",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#29365D",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#171B2D",
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171B2D",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#69758F",
    textAlign: "center",
  },
  pinnedCard: {
    backgroundColor: "#FFF8E5",
    borderWidth: 1,
    borderColor: "#FFE5A0",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF2",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  cardPressed: {
    opacity: 0.85,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171B2D",
    marginBottom: 8,
  },
  noteDescription: {
    fontSize: 14,
    color: "#69758F",
    lineHeight: 22,
    marginBottom: 12,
  },
  noteDate: {
    fontSize: 13,
    color: "#64708B",
  },
  bottomNav: {
    height: 75,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9EBF2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeLabel: {
    fontSize: 11,
    color: "#293DAA",
    fontWeight: "bold",
    marginTop: 3,
  },
  navLabel: {
    fontSize: 11,
    color: "#69758F",
    marginTop: 3,
  },
  addButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#293DAA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    elevation: 5,
  },
  addText: {
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: "300",
    marginTop: -3,
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    elevation: 5,
  },
});
