import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";

const notepad = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FC" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.navbar}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>≡</Text>
          </View>

          <Text style={styles.appName}>Notepad</Text>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>E</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}> Pinned</Text>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.pinnedCard}>
          <Text style={styles.noteTitle}>
            Welcome to your Notepad
          </Text>

          <Text style={styles.noteDescription}>
            Keep your important notes here. You can pin
            notes for quick access.
          </Text>

          <Text style={styles.noteDate}> Oct 11, 2026</Text>
        </View>

        {/* Notes Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Project Ideas</Text>
          <Text style={styles.noteDescription}>
            Build a simple notepad app with login and dashboard...
          </Text>
          <Text style={styles.noteDate}> Oct 10, 2026</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Study Plan</Text>
          <Text style={styles.noteDescription}>
            Finish React Native course and work on my projects...
          </Text>
          <Text style={styles.noteDate}> Oct 8, 2026</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Random Thoughts</Text>
          <Text style={styles.noteDescription}>
            Better days are coming. Keep going!
          </Text>
          <Text style={styles.noteDate}> Oct 5, 2026</Text>
        </View>

      </ScrollView>

      
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Text style={styles.activeLabel}>Notepad</Text>
        </View>

        <View style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </View>
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
};

export default notepad;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FC",
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

  arrow: {
    fontSize: 30,
    color: "#64708B",
  },

  pinnedCard: {
    backgroundColor: "#FFF8E5",
    borderWidth: 1,
    borderColor: "#FFE5A0",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  noteCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF2",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171B2D",
    marginBottom: 10,
  },

  noteDescription: {
    fontSize: 14,
    color: "#69758F",
    lineHeight: 22,
    marginBottom: 16,
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

  activeIcon: {
    fontSize: 27,
    color: "#293DAA",
  },

  activeLabel: {
    fontSize: 11,
    color: "#293DAA",
    fontWeight: "bold",
    marginTop: 3,
  },

  profileIcon: {
    fontSize: 28,
    color: "#69758F",
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
    alignItems: "center",
    justifyContent: "center",
    // marginTop: -30,
    elevation: 5,
  }
});