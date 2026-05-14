// app/index.tsx

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

import { router } from 'expo-router';

export default function HomeScreen() {
  function handleProjetos() {
    console.log('📁 Abrindo projetos...');
  }

  function handleLogin() {
    router.push('/login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* BOLHAS */}
      <View style={styles.bolha1} />
      <View style={styles.bolha2} />

      <View style={styles.content}>
        {/* TOPO */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Image
              source={require('../assets/images/logoo.png')}
              style={styles.logoImage}
            />
          </View>

          <Text style={styles.logoText}>
            ONG Connect
          </Text>
        </View>

        {/* CENTRO */}
        <View style={styles.hero}>
          <Text style={styles.titulo}>
            Pequenas ações {'\n'}
            transformam {'\n'}
            grandes vidas ✨
          </Text>

          <Text style={styles.descricao}>
            Conectamos voluntários, doações e
            projetos sociais para gerar impacto
            real na comunidade.
          </Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <Text style={styles.cardNumero}>
              +120
            </Text>

            <Text style={styles.cardTexto}>
              Projetos ativos
            </Text>
          </View>

          <View style={styles.linha} />

          <View style={styles.cardItem}>
            <Text style={styles.cardNumero}>
              +3K
            </Text>

            <Text style={styles.cardTexto}>
              Voluntários
            </Text>
          </View>

          <View style={styles.linha} />

          <View style={styles.cardItem}>
            <Text style={styles.cardNumero}>
              15
            </Text>

            <Text style={styles.cardTexto}>
              Cidades
            </Text>
          </View>
        </View>

        {/* BOTÕES */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.botaoPrincipal}
            onPress={handleProjetos}
            activeOpacity={0.85}
          >
            <Text style={styles.textoBotao}>
              Conhecer Projetos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.botaoSecundario}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-evenly',
  },

  // HEADER

  header: {
    alignItems: 'center',
    marginTop: 10,
  },

  logoBox: {
    width: 110,
    height: 110,
    borderRadius: 35,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 18,
  },

  logoImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },

  logoText: {
    color: '#38BDF8',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // HERO

  hero: {
    alignItems: 'center',
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 20,
  },

  descricao: {
    color: '#CBD5E1',
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 8,
  },

  // CARD

  card: {
    backgroundColor: '#0F172A',
    borderRadius: 28,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },

  cardItem: {
    alignItems: 'center',
    flex: 1,
  },

  cardNumero: {
    color: '#38BDF8',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  cardTexto: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },

  linha: {
    width: 1,
    height: 45,
    backgroundColor: '#1E293B',
  },

  // FOOTER

  footer: {
    marginBottom: 20,
  },

  botaoPrincipal: {
    backgroundColor: '#38BDF8',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 18,
  },

  textoBotao: {
    color: '#020617',
    fontSize: 18,
    fontWeight: 'bold',
  },

  botaoSecundario: {
    color: '#CBD5E1',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  // BOLHAS

  bolha1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#0EA5E9',
    top: -100,
    right: -70,
    opacity: 0.18,
  },

  bolha2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#22C55E',
    bottom: -60,
    left: -60,
    opacity: 0.15,
  },
});