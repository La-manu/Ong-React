import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (email.includes("@") && senha.length > 6) {
      console.log(`✅ Acesso autorizado para: ${email}`);
    } else {
      console.log("❌ Falha no login: Verifique os critérios de validação");
    }

    if (email.includes("@") && senha.length > 6) {
      console.log("✅ Acesso autorizado para:", email);
      // Futuramente: Navegar para a Home
    } else {
      console.log("❌ Falha no login: E-mail inválido ou senha muito curta.");
    }

    console.table({ email, senha });

    if (email.includes("@") && senha.length > 6) {
      console.log(`✅ Acesso autorizado para: ${email}`);
    } else {
      console.log("❌ Falha no login: Verifique os critérios de validação");
    }
  };

  const router = useRouter();
  const handlePress = () => {
    console.log("Botão clicado!");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Tela de Login</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}> Voltar para Home</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.helperText}>
        Logando como: {email || "seu@email.com"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2c70ff",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },

  button: {
    width: "100%",
    backgroundColor: "#4c61afff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3, // sombra Android
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  logo: {
    width: 120,
    height: 170,
    marginBottom: 30,
  },

  helperText: {
  width: "100%",
  fontSize: 14,
  color: "#555",
  marginBottom: 15,
},
});
