export interface IVistaEnvio {
  idEnvios: number;
  fechaSolicitud: string;
  fechaEntregaEsperada: string;
  estado: string;
  mercancia: string;
  peso: number;
  volumen: number;
  cliente: string;
  origen: string;
  destino: string;
  costo: number;
}