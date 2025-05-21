import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NuevoCliente } from "./components/NuevoCliente"
import { EditarCliente } from "./components/EditarCliente"
import { ClienteLista } from "./components/ClienteLista"
import  Dashboard  from "./components/Dashboard"
import { UnidadesLista } from "./components/UnidadesLista"
import { EnviosLista } from "./components/EnviosLista"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Dashboard></Dashboard>}/>
        <Route path="/clientelista" element = {<ClienteLista></ClienteLista>}/>
        <Route path="/nuevocliente" element = {<NuevoCliente></NuevoCliente>}/>
        <Route path="/editarcliente/:id" element = {<EditarCliente></EditarCliente>}/>
        <Route path="/unidadeslista" element = {<UnidadesLista></UnidadesLista>}/>
        <Route path="/envioslista" element = {<EnviosLista></EnviosLista>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
