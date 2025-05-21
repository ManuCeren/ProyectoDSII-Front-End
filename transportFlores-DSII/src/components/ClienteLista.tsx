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
            console.log("Clientes recibidos:", data); // 👈
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
                   <h4>Lista clientes</h4>
                   <hr />
                   <Link className="btn btn-success mb-3" to="/nuevocliente">Nuevo Cliente</Link>
                   <Table bordered>
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
                                        <Link className="btn btn-primary me-2" to={`/editarcliente/${item.idClientes}`} >Editar</Link>
                                        <Button color="danger" onClick={()=>{Eliminar(item.idClientes!)}}>
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