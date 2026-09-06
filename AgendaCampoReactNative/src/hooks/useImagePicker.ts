import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export type ImgUpload = {
  uri: string;
  name: string;
  mimeType: string;
};

export function useImagePicker() {
  const [imagem, setImagem] = useState<ImgUpload | null>(null);

  // CÂMERA
  const tirarFoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para tirar fotos.",
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      const foto = resultado.assets[0];
      setImagem({
        uri: foto.uri,
        name: foto.fileName || `foto_${Date.now()}.jpg`,
        mimeType: foto.mimeType || "image/jpeg",
      });
    }
  };

  // GALERIA
  const escolherDaGaleria = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert("Permissão necessária", "Permita o acesso à galeria.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      const foto = resultado.assets[0];
      setImagem({
        uri: foto.uri,
        name: foto.fileName || `foto_${Date.now()}.jpg`,
        mimeType: foto.mimeType || "image/jpeg",
      });
    }
  };

  const selecionarOpcaoImagem = () => {
    Alert.alert("Selecionar Foto", "De onde você quer obter a foto?", [
      { text: "CÂMERA", onPress: tirarFoto },
      { text: "GALERIA", onPress: escolherDaGaleria },
      { text: "CANCELAR", style: "cancel" },
    ]);
  };

  return {
    imagem,
    setImagem,
    tirarFoto,
    escolherDaGaleria,
    selecionarOpcaoImagem,
  };
}
