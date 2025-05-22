import {useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link} from "react-router-dom"
import Swal from "sweetalert2"
import type { ICliente } from "../Interfaces/ICliente"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function ClienteLista(){

    const [clientes, setClientes] = useState<ICliente[]>([]);
    const obtenerClientes = async () => {
    try {
        const response = await fetch(`${appsettings.apiUrl}Cliente/Lista`);
        if (response.ok) {
            const data = await response.json();
            console.log("Clientes recibidos:", data); 
            setClientes(data);
        } else {
            console.error("Error en la respuesta:", response.status);
        }
    } catch (error) {
        console.error("Error al obtener clientes:", error);
    }
}
useEffect(()=>{
     obtenerClientes()
},[])

    const Eliminar = (id:number)=>{
            Swal.fire({
            title: "Estas seguro ?",
            text: "Eliminar cliente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetch(`${appsettings.apiUrl}Cliente/Eliminar/${id}`, {method:"DELETE"})
            if(response.ok)await obtenerClientes()
        }
        });
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="m-0">Lista de Clientes</h4>
                        <div className="d-flex gap-2">
                            <Link to="/" className="btn btn-secondary btn-sm shadow-sm">
                            <i className="bi bi-house-door me-2"></i> Inicio
                            </Link>
                            <Link to="/nuevocliente" className="btn btn-success btn-sm shadow-sm">
                            <i className="bi bi-plus-circle me-2"></i> Nuevo Cliente
                            </Link>
                        </div>
                    </div>
                   <Table bordered hover responsive className="align-middle text-center table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th>Tipo Cliente</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((item)=>(
                                <tr key={item.idClientes}>
                                    <td>{item.nombreCliente}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.telefono}</td>
                                    <td>{item.email}</td>
                                    <td>{item.tipoCliente}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link className="btn btn-sm btn-primary" to={`/editarcliente/${item.idClientes}`}>
                                            <i className="bi bi-pencil-square me-1"></i>
                                            </Link>
                                            <Button size="sm" color="danger" onClick={() => Eliminar(item.idClientes!)}>
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