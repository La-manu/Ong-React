import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

type ONG = {
  id: string;
  nome: string;
  causa: string;
  descricao: string;
  imagem: string;
};

const ongs: ONG[] = [
  {
    id: '1',
    nome: 'Amor Animal',
    causa: 'Resgate de animais',
    descricao:
      'ONG dedicada ao resgate, tratamento e adoção responsável de animais abandonados.',

    imagem:
      'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  },

  {
    id: '2',
    nome: 'Educa Brasil',
    causa: 'Educação infantil',
    descricao:
      'Projeto social focado em levar educação gratuita para crianças em situação de vulnerabilidade.',

    imagem:
      'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
  },

  {
    id: '3',
    nome: 'Green Future',
    causa: 'Meio ambiente',
    descricao:
      'Movimento voltado para reflorestamento, reciclagem e conscientização ambiental.',

    imagem:
      'https://cdn-icons-png.flaticon.com/512/2909/2909763.png',
  },
];

export default function Explorar() {
  const [loading, setLoading] =
    useState(true);

  const [selectedONG, setSelectedONG] =
    useState<ONG | null>(null);

  const [modalVisible, setModalVisible] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleOpenModal(item: ONG) {
    setSelectedONG(item);
    setModalVisible(true);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#38BDF8"
        />

        <Text style={styles.loadingText}>
          Carregando ONGs...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Explorar ONGs 🌎
      </Text>

      <FlatList
        data={ongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              handleOpenModal(item)
            }
          >
            <Image
              source={{
                uri: item.imagem,
              }}
              style={styles.logo}
            />

            <View style={styles.info}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.causa}>
                {item.causa}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {selectedONG?.nome}
            </Text>

            <Text style={styles.modalCause}>
              {selectedONG?.causa}
            </Text>

            <Text style={styles.modalDescription}>
              {selectedONG?.descricao}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text style={styles.closeText}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  // LOADING

  loadingContainer: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#CBD5E1',
    marginTop: 16,
    fontSize: 16,
  },

  // CARD

  card: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#1E293B',

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 18,
  },

  info: {
    flex: 1,
  },

  nome: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  causa: {
    color: '#94A3B8',
    fontSize: 15,
  },

  // MODAL

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 24,

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  modalTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalCause: {
    color: '#38BDF8',
    fontSize: 16,
    marginBottom: 18,
  },

  modalDescription: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },

  closeButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  closeText: {
    color: '#020617',
    fontWeight: 'bold',
    fontSize: 16,
  },
});