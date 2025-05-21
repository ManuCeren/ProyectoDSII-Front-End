import { type ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import type { ICliente } from "../Interfaces/ICliente" 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const initialCliente = {
    idClientes: 0,
    nombreCliente:"",
    direccion:"",
    telefono: "",
    email:"",
    tipoCliente: ""

}
export function EditarCliente(){
    const {id} = useParams<{id:string}>()
    const [cliente, setCliente]= useState<ICliente>(initialCliente)
    const navigate=useNavigate()

    useEffect(()=>{
        const obtenerCliente = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Cliente/Obtener/${id}`)
            if(response.ok){
                const data= await response.json();
                setCliente(data);
            }
        }

        obtenerCliente()
    },[])

        const inputChangevalue = (event: ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setCliente({...cliente,[inputName]:inputValue})
    }
    
    const guardar= async()=>{
            const response = await fetch(`${appsettings.apiUrl}Cliente/Editar`,{
                method: 'PUT',
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
                    text: "No se pudo editar el cliente",
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
                    <h4>Editar Cliente</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type ="text" name="nombreCliente" onChange={inputChangevalue} value={cliente.nombreCliente}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Direccion</Label>
                            <Input type ="text" name="direccion" onChange={inputChangevalue} value={cliente.direccion}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Telefono</Label>
                            <Input type ="text" name="telefono" onChange={inputChangevalue} value={cliente.telefono}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type ="text" name="email" onChange={inputChangevalue} value={cliente.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo Cliente</Label>
                            <Input type ="text" name="tipoCliente" onChange={inputChangevalue} value={cliente.tipoCliente}/>
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )

}