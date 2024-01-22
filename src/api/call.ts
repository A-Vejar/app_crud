import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

/**
 * Agrega la ruta base de las apis y los headers necesarios para todos los
 * endpoints
 */
export const instanciaAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/** Realiza la renovacion del token si vencio */
instanciaAxios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Simplificar objeto de respuesta.
    response.data = response.data.data ? response.data.data : response.data;
    return response;
  },
  (error: Error): Error => {
    throw error;
  }
);
