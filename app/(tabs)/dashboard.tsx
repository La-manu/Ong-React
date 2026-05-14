// app/dashboard.tsx

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  useLocalSearchParams,
  router,
} from 'expo-router';

export default function DashboardScreen() {
  const { userName, voluntarioId } =
    useLocalSearchParams();

  function handleLogout() {
    router.replace('/home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* FUNDO */}
      <View style={styles.bolha1} />
      <View style={styles.bolha2} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            ONG Connect
          </Text>

          <Text style={styles.titulo}>
            Olá, {userName} 👋
          </Text>

          <Text style={styles.subtitulo}>
            Que bom ter você aqui para ajudar!
          </Text>
        </View>

        {/* CARD PERFIL */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>
            Seu Perfil
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              Voluntário
            </Text>

            <Text style={styles.valor}>
              {userName}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              ID do voluntário
            </Text>

            <Text style={styles.valor}>
              #{voluntarioId}
            </Text>
          </View>
        </View>

        {/* STATUS */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitulo}>
            Seu impacto 🌎
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.numero}>
                12
              </Text>

              <Text style={styles.textoStat}>
                Eventos
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.numero}>
                48h
              </Text>

              <Text style={styles.textoStat}>
                Voluntariado
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.numero}>
                320
              </Text>

              <Text style={styles.textoStat}>
                Pessoas ajudadas
              </Text>
            </View>
          </View>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.botao}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Text style={styles.textoBotao}>
            Sair
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  // HEADER

  header: {
    marginTop: 20,
    marginBottom: 34,
  },

  logo: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 18,
    letterSpacing: 1,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitulo: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
  },

  // CARD

  card: {
    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 24,
  },

  cardTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  infoBox: {
    marginBottom: 18,
  },

  label: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 6,
  },

  valor: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  // STATUS

  statusCard: {
    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 30,
  },

  statusTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 26,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stat: {
    alignItems: 'center',
    flex: 1,
  },

  numero: {
    color: '#38BDF8',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  textoStat: {
    color: '#CBD5E1',
    fontSize: 13,
    textAlign: 'center',
  },

  // BOTÃO

  botao: {
    backgroundColor: '#38BDF8',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#020617',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // FUNDO

  bolha1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#0EA5E9',
    top: -100,
    right: -70,
    opacity: 0.15,
  },

  bolha2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#22C55E',
    bottom: -60,
    left: -60,
    opacity: 0.12,
  },
});