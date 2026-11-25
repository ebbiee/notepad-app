import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert("Login failed", error.message);
        return;
      }

      router.replace("/notepad");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Connection error",
        "Unable to log in right now. Check your internet connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>N</Text>
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to access your notes.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#6B7280"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                loading && { opacity: 0.7 },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Log In</Text>
                  <Text style={styles.buttonArrow}>→</Text>
                </>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/register" asChild>
              <Pressable>
                <Text style={styles.linkText}>Register</Text>
              </Pressable>
            </Link>
          </View>

          <Link href="/" asChild>
            <Pressable style={styles.backButton}>
              <Text style={styles.backText}>← Back to welcome</Text>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 36,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  logoText: {
    color: "#2563EB",
    fontSize: 28,
    fontWeight: "800",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 32,
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 4,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  button: {
    height: 54,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#1D4ED8",
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
  linkText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 28,
    padding: 8,
  },
  backText: {
    color: "#6B7280",
    fontSize: 14,
  },
});