import React, {
  useEffect,
  useState,
  useRef,
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
  Alert,
  Platform,
  Dimensions,
} from 'react-native';

import { Accelerometer } from 'expo-sensors';
import * as ImagePicker from 'expo-image-picker';

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
    descricao: 'ONG dedicada ao resgate, tratamento e adoção responsável de animais abandonados.',
    imagem: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  },
  {
    id: '2',
    nome: 'Educa Brasil',
    causa: 'Educação infantil',
    descricao: 'Projeto social focado em levar educação gratuita para crianças em situação de vulnerabilidade.',
    imagem: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
  },
  {
    id: '3',
    nome: 'Green Future',
    causa: 'Meio ambiente',
    descricao: 'Movimento voltado para reflorestamento, reciclagem e conscientização ambiental.',
    imagem: 'https://cdn-icons-png.flaticon.com/512/2909/2909763.png',
  },
];

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 76) / 3; // Calcula o tamanho para caber 3 fotos por linha na grade

export default function Explorar() {
  const [loading, setLoading] = useState(true);
  const [selectedONG, setSelectedONG] = useState<ONG | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // 2. Armazenamento: Array de imagens
  const [images, setImages] = useState<string[]>([]);

  // Estados para controle da Webcam (Web Fallback)
  const [webcamVisible, setWebcamVisible] = useState(false);
  const videoRef = useRef<any>(null);
  const streamRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 4. Interação Física: O acelerômetro mede o movimento -> Chacoalhou? -> Esvazia o Array images
  useEffect(() => {
    if (Platform.OS === 'web') return;

    Accelerometer.setUpdateInterval(150);
    let lastTime = Date.now();

    const subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;
      const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);
      
      if (totalForce > 2.2 && Date.now() - lastTime > 2000) {
        lastTime = Date.now();
        
        // Esvazia o array de imagens capturadas ao chacoalhar
        setImages([]);
        
        Alert.alert('Galeria Limpa! 🧹', 'O movimento limpou todas as fotos capturadas.');
      }
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // Lógica de suporte para Webcam na Web
  async function startWebcam() {
    setWebcamVisible(true);
    setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        alert("Não foi possível acessar a webcam no navegador.");
        setWebcamVisible(false);
      }
    }, 100);
  }

  function captureWebcamPhoto() {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        // Adiciona a URI da imagem capturada no array
        setImages((prevImages) => [...prevImages, dataUrl]);
        stopWebcam();
      }
    }
  }

  function stopWebcam() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: any) => track.stop());
    }
    setWebcamVisible(false);
  }

  // 1. Captura: O usuário clica -> Aciona a Câmera
  async function handleTakePhotos() {
    if (Platform.OS === 'web') {
      startWebcam();
      return;
    }

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      // Adiciona a nova URI no array images via setImages
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  }

  // 1. Captura: O usuário clica -> Aciona a Galeria
  async function handlePickImage() {
    if (Platform.OS !== 'web') {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      // Adiciona a nova URI no array images via setImages
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  }

  function handleOpenModal(item: ONG) {
    setSelectedONG(item);
    setModalVisible(true);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Carregando ONGs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ongs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Explorar ONGs 🌎</Text>
            
            {/* SEÇÃO DO FORMULÁRIO DE CADASTRO COM GRADE DE FOTOS */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Cadastrar Nova Causa</Text>
              
              {/* 3. Exibição: Desenha os componentes <Image /> em grade */}
              {images.length > 0 ? (
                <View style={styles.gridContainer}>
                  {images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.gridImage} />
                  ))}
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>Nenhuma imagem capturada</Text>
                  {Platform.OS !== 'web' && (
                    <Text style={styles.placeholderHint}>(Chacoalhe o celular para limpar tudo)</Text>
                  )}
                </View>
              )}

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.pickerButton} onPress={handleTakePhotos}>
                  <Text style={styles.pickerButtonText}>📸 Câmera</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pickerButton} onPress={handlePickImage}>
                  <Text style={styles.pickerButtonText}>🖼️ Galeria</Text>
                </TouchableOpacity>
              </View>

              {images.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={() => setImages([])}>
                  <Text style={styles.clearButtonText}>Limpar Todas</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.subtitle}>Causas Ativas</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => handleOpenModal(item)}
          >
            <Image source={{ uri: item.imagem }} style={styles.logo} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.causa}>{item.causa}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* MODAL DA WEBCAM (EXCLUSIVO PARA A WEB) */}
      {Platform.OS === 'web' && (
        <Modal visible={webcamVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalCard, { alignItems: 'center' }]}>
              <Text style={styles.modalTitle}>Tirar Foto</Text>
              <video 
                ref={videoRef} 
                style={{ width: '100%', maxHeight: 300, borderRadius: 16, backgroundColor: '#000', marginBottom: 20 }}
                playsInline
              />
              <View style={[styles.buttonRow, { width: '100%' }]}>
                <TouchableOpacity style={[styles.closeButton, { flex: 1, backgroundColor: '#EF4444', marginRight: 10 }]} onPress={stopWebcam}>
                  <Text style={[styles.closeText, { color: '#fff' }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.closeButton, { flex: 1 }]} onPress={captureWebcamPhoto}>
                  <Text style={styles.closeText}>Capturar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* MODAL DETALHES DA ONG */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedONG?.nome}</Text>
            <Text style={styles.modalCause}>{selectedONG?.causa}</Text>
            <Text style={styles.modalDescription}>{selectedONG?.descricao}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
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
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  formTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  imagePlaceholder: {
    height: 150,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#475569',
  },
  placeholderText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  placeholderHint: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  // ESTILOS DA GRADE DE IMAGENS
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  gridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#1E293B',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  pickerButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  pickerButtonText: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearButton: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 4,
  },
  clearButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
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
    shadowOffset: { width: 0, height: 4 },
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minWidth: 300,
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