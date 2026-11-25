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
} from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleRegister() {
    if (!email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (!email.trim().includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Password too short",
        "Your password must contain at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", "Please check your passwords.");
      return;
    }

    signUpWithEmail();
  }

  async function signUpWithEmail() {
    const redirectTo = Linking.createURL("/auth/callback");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) {
        Alert.alert("Registration failed", error.message);
        return;
      }

      if (data.session) {
        // Email confirmation is off, so the user is already logged in
        router.replace("/notepad");
      } else {
        // Email confirmation is on
        Alert.alert(
          "Check your email",
          "We sent you a confirmation link. Confirm your email, then log in.",
          [{ text: "OK", onPress: () => router.replace("/login") }],
        );
      }
    } catch (err) {
      console.log("Register error:", err);
      Alert.alert(
        "Something went wrong",
        err?.message ?? "Unable to register right now. Please try again.",
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

          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>
            Start organizing your thoughts today.
          </Text>

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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#6B7280"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Creating account..." : "Create Account"}
              </Text>
              {!loading && <Text style={styles.buttonArrow}>→</Text>}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text style={styles.linkText}>Log In</Text>
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
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 28,
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
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
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
  buttonDisabled: {
    opacity: 0.6,
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
    marginTop: 24,
    padding: 8,
  },
  backText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
