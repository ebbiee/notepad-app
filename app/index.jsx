import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>📝</Text>
        </View>

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Welcome to</Text>
          <Text style={styles.appName}>Notepad</Text>

          <Text style={styles.subtitle}>
            Capture your thoughts, organize your ideas,
            and stay productive — anytime, anywhere.
          </Text>
        </View>

        <View style={styles.buttons}>
          <Link href="/login" asChild>
          <Pressable style={styles.loginButton}
          onPress={() => console.log("Login button pressed")}
          >
              <Text style={styles.loginText}>Log In</Text>
              <Text style={styles.arrow}>→</Text>
          </Pressable>
          </Link>
          
          <Link href="/register" asChild>
            <Pressable style={styles.registerButton}
            onPress={() => console.log("Register button pressed")}
            >
              <Text style={styles.registerText}>Register</Text>
              <Text style={styles.registerArrow}>→</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footer}>
          Start your journey with Notepad ♡
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  logoContainer: {
    width: 125,
    height: 125,
    borderRadius: 35,
    backgroundColor: "#EBEDFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontSize: 65,
  },

  headingContainer: {
    alignItems: "center",
    width: "100%",
  },

  heading: {
    fontSize: 34,
    fontWeight: "700",
    color: "#17213D",
  },

  appName: {
    fontSize: 42,
    fontWeight: "800",
    color: "#3847C5",
    marginTop: 2,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    color: "#737F9F",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 5,
  },

  buttons: {
    width: "100%",
    gap: 16,
  },

  loginButton: {
    backgroundColor: "#3847C5",
    paddingVertical: 19,
    paddingHorizontal: 22,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  arrow: {
    position: "absolute",
    right: 24,
    color: "#FFFFFF",
    fontSize: 25,
  },

  registerButton: {
    borderWidth: 1.5,
    borderColor: "#3847C5",
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  registerText: {
    color: "#3847C5",
    fontSize: 18,
    fontWeight: "700",
  },

  registerArrow: {
    position: "absolute",
    right: 24,
    color: "#3847C5",
    fontSize: 25,
  },

  footer: {
    color: "#818BA8",
    fontSize: 13,
    textAlign: "center",
  },
});
