import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NuevoCliente } from "./components/NuevoCliente"
import { EditarCliente } from "./components/EditarCliente"
import { ClienteLista } from "./components/ClienteLista"
import  Dashboard  from "./components/Dashboard"
import { UnidadesLista } from "./components/UnidadesLista"
import { EnviosLista } from "./components/EnviosLista"
import { NuevoEnvio } from "./components/NuevoEnvio"
import { EditarEnvio } from "./components/EditarEnvio"
import { NuevoUnidades } from "./components/NuevoUnidades"
import { EditarUnidades } from "./components/EditarUnidades"
import AdminLayout from "./layout/AdminLayout";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}></Route>
        <Route path="/" element = {<Dashboard></Dashboard>}/>
        <Route path="/clientelista" element = {<ClienteLista></ClienteLista>}/>
        <Route path="/nuevocliente" element = {<NuevoCliente></NuevoCliente>}/>
        <Route path="/editarcliente/:id" element = {<EditarCliente></EditarCliente>}/>
        <Route path="/unidadeslista" element = {<UnidadesLista></UnidadesLista>}/>
        <Route path="/envioslista" element = {<EnviosLista></EnviosLista>}/>
        <Route path="/nuevoenvio" element = {<NuevoEnvio></NuevoEnvio>}/>
        <Route path="/editarenvio/:id" element = {<EditarEnvio></EditarEnvio>}/>
        <Route path="/nuevounidades" element = {<NuevoUnidades></NuevoUnidades>}/>
        <Route path="/editarunidades/:id" element = {<EditarUnidades></EditarUnidades>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
