// src/hooks/useEnvios.ts

import { useState, useEffect } from 'react';
import type { IVistaEnvio } from '../Interfaces/IVistaEnvio'; // Importa la interfaz IVistaEnvio

interface UseEnviosResult {
  envios: IVistaEnvio[];
  totalEnvios: number;
  ultimosEnvios: IVistaEnvio[];
  loading: boolean;
  error: string | null;
}

export const useEnvios = (): UseEnviosResult => {
  const [envios, setEnvios] = useState<IVistaEnvio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:5226/api'; // O la URL base de tu backend
  const ENVIO_API_ENDPOINT = `${API_BASE_URL}/Envio/VistaDetallada`; // <-- Ajusta este endpoint si es diferente

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(ENVIO_API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} from ${ENVIO_API_ENDPOINT}`);
        }
        const data: IVistaEnvio[] = await response.json();
        setEnvios(data);
      } catch (err: any) {
        console.error("Error fetching shipments:", err);
        setError(`No se pudieron cargar los envíos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchEnvios();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  const totalEnvios = envios.length;
  // Ordena por fechaSolicitud descendente y toma los 5 últimos
  const ultimosEnvios = [...envios]
    .sort((a, b) => new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime())
    .slice(0, 5); // Obtén los 5 últimos

  return { envios, totalEnvios, ultimosEnvios, loading, error };
};