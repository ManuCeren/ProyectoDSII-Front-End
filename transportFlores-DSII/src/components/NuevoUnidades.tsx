import { type ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import type { IUnidades } from "../Interfaces/IUnidades" 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const initialUnidades ={

    idUnidades: 0,
    tipoUnidad: "",
    placa: "",
    marca: "",
    modelo: "",
    año: 0,
    estado: "",
    kilometrajeActual: 0
}
export function NuevoUnidades(){
    const [unidad,setUnidad] = useState<IUnidades>(initialUnidades);
    const navigate = useNavigate();
    
    const inputChangevalue = (event: ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
    
         setUnidad({...unidad,[inputName]:inputValue})
     }
    
    const guardar= async()=>{
        const response = await fetch(`${appsettings.apiUrl}Unidades/Nuevo`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(unidad)
        })
        if(response.ok){
            navigate("/") 
        }else{
            Swal.fire({
                title: "Error!",
                text: "No se pudo guardar la unidad",
                icon: "warning"
            });
        }
    }
        const volver=()=>{
        navigate("/")
    }
    const listar=()=>{
        navigate("/unidadeslista")
    }
    return(
         <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                    <h4>Nueva Unidad</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Tipo Unidad</Label>
                            <Input type ="text" name="tipoUnidad" onChange={inputChangevalue} value={unidad.tipoUnidad}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Placa</Label>
                            <Input type ="text" name="placa" onChange={inputChangevalue} value={unidad.placa}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Marca</Label>
                            <Input type ="text" name="marca" onChange={inputChangevalue} value={unidad.marca}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Modelo</Label>
                            <Input type ="text" name="modelo" onChange={inputChangevalue} value={unidad.modelo}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Año</Label>
                            <Input type ="number" name="año" onChange={inputChangevalue} value={unidad.año}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Estado</Label>
                            <Input type ="text" name="estado" onChange={inputChangevalue} value={unidad.estado}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Kilometraje Actual</Label>
                            <Input type ="number" name="kilometrajeActual" onChange={inputChangevalue} value={unidad.kilometrajeActual}/>
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