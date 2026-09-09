import { ip } from "@/src/service/api";

export function useImage() {
  const getImagemUrl = (
    img?: any,
    usuarioId?: string | number,
  ): string | undefined => {
    // 1. Se veio um objeto de imagem selecionada (ex: useImagePicker / Expo ImagePicker)
    if (img && typeof img === "object") {
      const uri = img.uri || (img.assets && img.assets[0]?.uri);
      if (uri) return uri;
    }

    // 2. Se veio uma string (URI local de dispositivo ou URL da Web)
    if (typeof img === "string" && img.trim() !== "") {
      const cleanImg = img.trim();

      // URIs locais do dispositivo ou URLs completas
      if (
        cleanImg.startsWith("file:") ||
        cleanImg.startsWith("content:") ||
        cleanImg.startsWith("data:") ||
        cleanImg.startsWith("http")
      ) {
        return cleanImg;
      }

      // Se veio um caminho relativo ex: "/api/Usuario/img/123"
      const pathTratado = cleanImg.startsWith("/") ? cleanImg : `/${cleanImg}`;
      return `http://${ip}:5100${pathTratado}`;
    }

    // 3. Fallback: Buscar pelo ID do usuário na API
    if (usuarioId) {
      return `http://${ip}:5100/api/Usuario/img/${usuarioId}`;
    }

    return undefined;
  };

  return { getImagemUrl };
}
