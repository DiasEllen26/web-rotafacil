import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import {  GlobalStyle } from "./styles/global"
import Header from "./components/Navbar"
import { FormTest } from "./pages/FormTest"
import Login from "./pages/Login/Login"
import { useEffect, useState } from "react"
import { Transportadora } from "./pages/Trasnportadora/lista/Transportadora"
import { FormularioTransportadora } from "./pages/Trasnportadora/formulario/FormularioTransportadora"
import { Gestor } from "./pages/Gestor/lista/Gestor"
import { FormularioGestor } from "./pages/Gestor/formulario/FormularioGestor"
import Usuarios from "./pages/usuario/lista"
import Rotas from "./pages/Rota/lista"

function App() {

  const [showHeader, setShowHeader] = useState(true);

	useEffect(() => {
    const currentPath = window.location.pathname;
    setShowHeader(currentPath !== '/login');
  }, []);



  return (
    <>
		<GlobalStyle />
		{showHeader && <Header />}
		{/* <ContentWrapper> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/form" element={<FormTest />} />

				<Route path="/transportadora" element={<Transportadora />} />
				<Route path="/transportadora/:id/editar" element={<FormularioTransportadora />} />
				<Route path="/transportadora/cadastrar" element={<FormularioTransportadora />} />

				<Route path="/gestor" element={<Gestor />} />
				<Route path="/gestor/cadastrar" element={<FormularioGestor />} />
				<Route path="/gestor/:id/editar" element={<FormularioGestor/>} />

				<Route path="/usuario" element={<Usuarios />} />

				<Route path="/rota" element={<Rotas />} />
			</Routes>
		{/* </ContentWrapper> */}
    </>
  )
}

export default App
