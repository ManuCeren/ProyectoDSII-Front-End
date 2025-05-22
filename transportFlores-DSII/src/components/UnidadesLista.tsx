import {useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link} from "react-router-dom"
import Swal from "sweetalert2"
import type { IUnidades } from "../Interfaces/IUnidades"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function UnidadesLista(){

    const [unidades, setUnidades] = useState<IUnidades[]>([]);
    const obtenerUnidades = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Unidades/Lista`);
            if (response.ok) {
                const data = await response.json();
                console.log("Unidades recibidos:", data); 
                setUnidades(data);
            } else {
                console.error("Error en la respuesta:", response.status);
            }
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }
    useEffect(()=>{
         obtenerUnidades()
    },[])
    
    const Eliminar = (id:number)=>{
            Swal.fire({
            title: "Estas seguro ?",
            text: "Eliminar Unidad!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetch(`${appsettings.apiUrl}Cliente/Eliminar/${id}`, {method:"DELETE"})
            if(response.ok)await obtenerUnidades()
        }
        });
    }
    
    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="m-0">Lista de Unidades</h4>
                        <div className="d-flex gap-2">
                            <Link to="/" className="btn btn-secondary btn-sm shadow-sm">
                            <i className="bi bi-house-door me-2"></i> Inicio
                            </Link>
                            <Link to="/nuevounidades" className="btn btn-success btn-sm shadow-sm">
                            <i className="bi bi-plus-circle me-2"></i> Nuevo Unidad
                            </Link>
                        </div>
                    </div>
                   <Table bordered hover responsive className="align-middle text-center table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Tipo Unidad</th>
                                <th>Placa</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Estado</th>
                                <th>Kilometraje Actual</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {unidades.map((item)=>(
                                <tr key={item.idUnidades}>
                                    <td>{item.tipoUnidad}</td>
                                    <td>{item.placa}</td>
                                    <td>{item.marca}</td>
                                    <td>{item.modelo}</td>
                                    <td>{item.año}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.kilometrajeActual}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link className="btn btn-sm btn-primary" to={`/editarunidades/${item.idUnidades}`}>
                                            <i className="bi bi-pencil-square me-1"></i>
                                            </Link>
                                            <Button size="sm" color="danger" onClick={() => Eliminar(item.idUnidades!)}>
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