import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function App() {
    const router = useRouter();
  const handlePress = () => {
    console.log("Botão clicado!");
  };
  return (
    <View style={styles.container}>
      
      <Image source={require("../assets/images/logoo.png")} style={styles.logo} />

      <View style={styles.header}>
        <Text style={styles.title}>ONG Connect</Text>
        <Text style={styles.subtitle}>
          Conectando pessoas a projetos sociais
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Encontrar ONGs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}> Ser Voluntário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Fazer Doação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Ver Eventos</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    marginBottom: 40,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2c70ff",
  },

  subtitle: {
    fontSize: 16,
    color: "#555555ff",
    marginTop: 5,
  },

  buttonsContainer: {
    width: "80%",
  },

  button: {
    backgroundColor: "#4c61afff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 120,
    height: 170,
    marginBottom: 30,
  },
});