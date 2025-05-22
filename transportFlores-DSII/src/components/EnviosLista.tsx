import {useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link} from "react-router-dom"
import Swal from "sweetalert2"
import type { IEnvios } from "../Interfaces/IEnvios"
import { Container, Row, Col, Table, Button } from "reactstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';

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
                   <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="m-0">Lista de Envios</h4>
                        <div className="d-flex gap-2">
                            <Link to="/" className="btn btn-secondary btn-sm shadow-sm">
                            <i className="bi bi-house-door me-2"></i> Inicio
                            </Link>
                            <Link to="/nuevoenvio" className="btn btn-success btn-sm shadow-sm">
                            <i className="bi bi-plus-circle me-2"></i> Nuevo Envio
                            </Link>
                        </div>
                    </div>

                   <Table bordered hover responsive className="align-middle text-center table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Ruta</th>
                                <th>Fecha Solicitud</th>
                                <th>Fecha entrega esperada</th>
                                <th>Estado</th>
                                <th>Mercancia</th>
                                <th>Peso total</th>
                                <th>Volumen</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {envios.map((item)=>(
                                <tr key={item.idEnvios!}>
                                    <td>{item.idCliente}</td>
                                    <td>{item.idRuta}</td>
                                    <td>{item.fechaSolicitud}</td>
                                    <td>{item.fechaEntregaEsperada}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.mercancia}</td>
                                    <td>{item.pesoTotal}</td>
                                    <td>{item.volumenTotal}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link className="btn btn-sm btn-primary" to={`/editarenvio/${item.idEnvios}`}>
                                            <i className="bi bi-pencil-square me-1"></i>
                                            </Link>
                                            <Button size="sm" color="danger" onClick={() => Eliminar(item.idEnvios!)}>
                                            <i className="bi bi-trash me-1"></i>
                                            </Button>
                                        </div>
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