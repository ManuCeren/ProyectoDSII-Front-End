import { type ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import type { IEnvios } from "../Interfaces/IEnvios" 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const initialEnvios = {
    idEnvios: 0,
    idCliente: 0,
    idRuta: 0,
    fechaSolicitud: "",
    fechaEntregaEsperada: "",
    estado: "",
    mercancia: "",
    pesoTotal: 0,
    volumenTotal: 0

}

export function EditarEnvio(){
    const {id} = useParams<{id:string}>()
    const [envio, setEnvio]= useState<IEnvios>(initialEnvios)
    const navigate=useNavigate()

    useEffect(()=>{
        const obtenerEnvio = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Envio/Obtener/${id}`)
            if(response.ok){
                const data= await response.json();
                setEnvio(data);
            }
        }

        obtenerEnvio()
    },[])

        const inputChangevalue = (event: ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setEnvio({...envio,[inputName]:inputValue})
    }
    
    const guardar= async()=>{
        const response = await fetch(`${appsettings.apiUrl}Envio/Editar`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(envio)
        })
        if(response.ok){
            navigate("/") 
        }else{
            Swal.fire({
                title: "Error!",
                text: "No se pudo editar el envio",
                icon: "warning"
            });
        }
    }
    const volver=()=>{
        navigate("/")
    }
    const listar=()=>{
        navigate("/envioslista")
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Editar Envio</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Cliente</Label>
                            <Input type ="number" name="idCliente" onChange={inputChangevalue} value={envio.idCliente}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Ruta</Label>
                            <Input type ="number" name="idRuta" onChange={inputChangevalue} value={envio.idRuta}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha Solicitud</Label>
                            <Input type ="text" name="fechaSolicitud" onChange={inputChangevalue} value={envio.fechaSolicitud}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha Entrega Esperada</Label>
                            <Input type ="text" name="fechaEntregaEsperada" onChange={inputChangevalue} value={envio.fechaEntregaEsperada}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Estado</Label>
                            <Input type ="text" name="estado" onChange={inputChangevalue} value={envio.estado}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Mercancia</Label>
                            <Input type ="text" name="mercancia" onChange={inputChangevalue} value={envio.mercancia}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Peso Total</Label>
                            <Input type ="number" name="idRuta" onChange={inputChangevalue} value={envio.pesoTotal}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Volumen Total</Label>
                            <Input type ="number" name="idRuta" onChange={inputChangevalue} value={envio.volumenTotal}/>
                        </FormGroup>
                    </Form>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button color="primary" onClick={guardar}>
                            <i className="bi bi-save me-1"></i> Guardar
                        </Button>

                        <Button color="info" onClick={listar}>
                            <i className="bi bi-card-list me-1"></i> Volver
                        </Button>

                        <Button color="secondary" onClick={volver}>
                            <i className="bi bi-house-door me-1"></i> Inicio
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}