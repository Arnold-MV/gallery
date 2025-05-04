import axios, { type AxiosInstance } from "axios";
import type {
  PexelsCuratedParams,
  PexelsResponse,
  PexelsSearchParams,
} from "./pexelsService.types";

const pixelsClient: AxiosInstance = axios.create({
  baseURL: "https://api.pexels.com/v1/",
  headers: {
    Authorization: import.meta.env.VITE_PEXELS_API_KEY,
  },
});

/**
 * Busca imágenes según un término de búsqueda
 * @param query Término de búsqueda
 * @param page Número de página
 * @param perPage Resultados por página
 * @returns Resultados de la búsqueda
 */

export const searchImages = async (
  query: string,
  apiKey: string,
  page: number = 1,
  perPage: number = 15
): Promise<PexelsResponse> => {
  try {
    const response = await axios.get<PexelsResponse>(
      "https://api.pexels.com/v1/search",
      {
        params: { query, page, per_page: perPage },
        headers: { Authorization: apiKey },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al buscar imágenes:", error);
    throw error;
  }
};

/**
 * Obtiene una colección de imágenes populares/curadas
 * @param page Número de página
 * @param perPage Resultados por página
 * @returns Colección de imágenes populares
 */
export const getPopularImages = async (
  apiKey: string,
  page: number = 1,
  perPage: number = 15
): Promise<PexelsResponse> => {
  try {
    const response = await axios.get<PexelsResponse>(
      "https://api.pexels.com/v1/curated",
      {
        params: { page, per_page: perPage },
        headers: { Authorization: apiKey },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener imágenes populares:", error);
    throw error;
  }
};
