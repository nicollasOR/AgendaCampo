import { useState } from "react";
import { ImgUpload } from "./useImagePicker";

export function useImage() {
  const [imagem, setImagem] = useState<ImgUpload | null>(null);

  const getImagemUrl = (
    img?: ImgUpload | string | null,
  ): string | undefined => {
    if (!img) return undefined;

    const path = typeof img === "object" ? img.uri : img;
    if (!path) return undefined;

    if (
      path.startsWith("file:") ||
      path.startsWith("http") ||
      path.startsWith("data:") ||
      path.startsWith("content:")
    ) {
      return path;
    }

    // const baseUrl = (process.env.EXPO_PUBLIC_API_URL)
    const baseUrl = "http://10.0.2.2:5100"
      .replace(/\/$/, "")
      .replace(/\/api\/?$/, "");

    const pathTratado = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${pathTratado}`;
  };

  return {
    getImagemUrl,
    imagemUrl: getImagemUrl(imagem),
  };
}
