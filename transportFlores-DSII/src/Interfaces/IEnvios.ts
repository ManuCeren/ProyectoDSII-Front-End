export interface IEnvios{
    idEnvios?: number,
    idCliente: number,
    idRuta: number,
    fechaSolicitud: string,
    fechaEntregaEsperada: string,
    estado: string,
    mercancia: string,
    pesoTotal: number,
    volumentotal: number

}