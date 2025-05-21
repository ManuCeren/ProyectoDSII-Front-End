import {useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link} from "react-router-dom"
import Swal from "sweetalert2"
import type { IEnvios } from "../Interfaces/IEnvios"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function EnviosLista(){

    const [envios, setEnvios] = useState<IEnvios[]>([]);
        const obtenerEnvios = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Envio/Lista`);
            if (response.ok) {
                const data = await response.json();
                console.log("Envios recibidos:", data); // 👈
                setEnvios(data);
            } else {
                console.error("Error en la respuesta:", response.status);
            }
        } catch (error) {
            console.error("Error al obtener envios:", error);
        }
    }
    useEffect(()=>{
            obtenerEnvios()
        },[])
    
        const Eliminar = (id:number)=>{
                Swal.fire({
                title: "Estas seguro ?",
                text: "Eliminar envio!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!"
            }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Envio/Eliminar/${id}`, {method:"DELETE"})
                if(response.ok)await obtenerEnvios()
            }
            });
        }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                   <h4>Lista envios</h4>
                   <hr />
                   <Link className="btn btn-success mb-3" to="/nuevoenvio">Nuevo Envio</Link>
                   <Table bordered>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Ruta</th>
                                <th>Fecha Solicitud</th>
                                <th>Fecha entrega esperada</th>
                                <th>Estado</th>
                                <th>Mercancia</th>
                                <th>Peso total</th>
                                <th>Volumen total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {envios.map((item)=>(
                                <tr key={item.estado}>
                                    <td>{item.idCliente}</td>
                                    <td>{item.idRuta}</td>
                                    <td>{item.fechaSolicitud}</td>
                                    <td>{item.fechaEntregaEsperada}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.mercancia}</td>
                                    <td>{item.pesoTotal}</td>
                                    <td>{item.volumentotal}</td>
                                    <td>
                                        <Link className="btn btn-primary me-2" to={`/editarenvio/${item.idEnvios}`} >Editar</Link>
                                        <Button color="danger" onClick={()=>{Eliminar(item.idEnvios!)}}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                   </Table>
                </Col>
            </Row>
        </Container>
    )
}