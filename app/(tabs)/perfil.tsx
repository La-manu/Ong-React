// app/(tabs)/perfil.tsx

import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';

import {
  useLocalSearchParams,
} from 'expo-router';

export default function Perfil() {
  const {
    userName,
    voluntarioId,
  } = useLocalSearchParams();

  const [modalVisible, setModalVisible] =
    useState(false);

  const [interesse, setInteresse] =
    useState('Educação 📚');

  function selecionarInteresse(
    valor: string
  ) {
    setInteresse(valor);
    setModalVisible(false);

    console.log(
      '✅ Interesse escolhido:',
      valor
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* FUNDO */}
      <View style={styles.bolha1} />
      <View style={styles.bolha2} />

      <View style={styles.content}>
        {/* HEADER */}

        <Text style={styles.logo}>
          ONG Connect
        </Text>

        <Text style={styles.title}>
          Perfil 👤
        </Text>

        {/* CARD */}

        <View style={styles.card}>
          {/* AVATAR */}

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {String(
                userName || 'U'
              )
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          {/* NOME */}

          <Text style={styles.userName}>
            {userName || 'Usuário'}
          </Text>

          {/* ID */}

          <Text style={styles.userId}>
            ID #{voluntarioId || '000'}
          </Text>

          {/* INFO */}

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Interesse atual
            </Text>

            <Text style={styles.infoValue}>
              {interesse}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>
              Status
            </Text>

            <Text style={styles.infoValue}>
              Voluntário ativo 💙
            </Text>
          </View>

          {/* BOTÃO */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.button}
            onPress={() =>
              setModalVisible(true)
            }
          >
            <Text style={styles.buttonText}>
              Editar Interesses
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Escolha sua causa ❤️
            </Text>

            {/* EDUCAÇÃO */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                selecionarInteresse(
                  'Educação 📚'
                );
              }}
            >
              <Text style={styles.optionText}>
                Educação 📚
              </Text>
            </TouchableOpacity>

            {/* MEIO AMBIENTE */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                selecionarInteresse(
                  'Meio Ambiente 🌱'
                );
              }}
            >
              <Text style={styles.optionText}>
                Meio Ambiente 🌱
              </Text>
            </TouchableOpacity>

            {/* SAÚDE */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                selecionarInteresse(
                  'Saúde 🏥'
                );
              }}
            >
              <Text style={styles.optionText}>
                Saúde 🏥
              </Text>
            </TouchableOpacity>

            {/* CANCELAR */}

            <TouchableOpacity
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text style={styles.cancel}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  justifyContent: 'center',
  paddingHorizontal: 24,

  paddingBottom: 120,
},

  // HEADER

  logo: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  // CARD

  card: {
    backgroundColor: '#0F172A',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#1E293B',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  // AVATAR

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#38BDF8',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 18,
  },

  avatarText: {
    color: '#020617',
    fontSize: 38,
    fontWeight: 'bold',
  },

  // USER

  userName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  userId: {
    color: '#94A3B8',
    fontSize: 15,
    marginBottom: 28,
  },

  // INFO

  infoCard: {
    width: '100%',
    backgroundColor: '#111827',
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
  },

  infoLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 6,
  },

  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // BUTTON

  button: {
    width: '100%',
    backgroundColor: '#38BDF8',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // MODAL

  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.7)',

    justifyContent: 'center',
    alignItems: 'center',

    padding: 24,
  },

  modal: {
    width: '100%',
    maxWidth: 400,

    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 24,

    borderWidth: 1,
    borderColor: '#1E293B',
  },

  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },

  option: {
    backgroundColor: '#111827',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },

  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  cancel: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },

  // FUNDO

  bolha1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#0EA5E9',
    top: -100,
    right: -80,
    opacity: 0.15,
  },

  bolha2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#22C55E',
    bottom: -80,
    left: -70,
    opacity: 0.12,
  },
});