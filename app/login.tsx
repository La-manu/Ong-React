// app/login.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
  if (
    email.includes('@') &&
    senha.length > 6
  ) {
    console.log(
      '✅ Acesso autorizado para:',
      email
    );

    router.push({
      pathname: '/(tabs)/perfil',

      params: {
        userName: email,
        voluntarioId: Math.floor(
          Math.random() * 1000
        ).toString(),
      },
    });
  } else {
    console.log(
      '❌ Falha no login'
    );
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#1E293B',
    color: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#38BDF8',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#020617',
    fontWeight: 'bold',
    fontSize: 18,
  },
});