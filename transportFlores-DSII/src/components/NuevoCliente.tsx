import { type ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import type { ICliente } from "../Interfaces/ICliente" 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const initialCliente = {
    nombreCliente:"",
    direccion:"",
    telefono: "",
    email:"",
    tipoCliente: ""

}

export function NuevoCliente(){
    const [cliente,setCliente] = useState<ICliente>(initialCliente);
    const navigate = useNavigate();

    const inputChangevalue = (event: ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setCliente({...cliente,[inputName]:inputValue})
    }

    const guardar= async()=>{
        const response = await fetch(`${appsettings.apiUrl}Cliente/Nuevo`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(cliente)
        })
        if(response.ok){
           navigate("/") 
        }else{
            Swal.fire({
                title: "Error!",
                text: "No se pudo guardar el empleado",
                icon: "warning"
            });
        }
    }
     const volver=()=>{
        navigate("/")
    }
    
    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Nuevo Cliente</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type ="text" name="nombre" onChange={inputChangevalue} value={cliente.nombreCliente}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Direccion</Label>
                            <Input type ="text" name="nombre" onChange={inputChangevalue} value={cliente.direccion}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Telefono</Label>
                            <Input type ="text" name="nombre" onChange={inputChangevalue} value={cliente.telefono}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type ="text" name="correo" onChange={inputChangevalue} value={cliente.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo Cliente</Label>
                            <Input type ="number" name="sueldo" onChange={inputChangevalue} value={cliente.tipoCliente}/>
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )

}