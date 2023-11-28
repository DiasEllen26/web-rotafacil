import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Rotas } from "./pages/Rotas"
import {  GlobalStyle } from "./styles/global"
import Header from "./components/Navbar"
import { FormTest } from "./pages/FormTest"
import Login from "./pages/Login/Login"
import { Transportadora } from "./pages/Trasnportadora/lista/Transportadora"
import { FormularioTransportadora } from "./pages/Trasnportadora/formulario/FormularioTransportadora"
import { Gestor } from "./pages/Gestor/lista/Gestor"
import { FormularioGestor } from "./pages/Gestor/formulario/FormularioGestor"
import { AuthProvider, useAuth } from "./context/AuthContext.tsx"
import  ProtectedRoute  from "./routes/ProtectedRoute.tsx"
import { useState } from "react"
import { IGestor } from "./types/IGestor.ts"

function App() {

	const { isAuthenticated } = useAuth();

	const [gestor, setGestor] = useState<IGestor>()

	const gestorData = localStorage.getItem('gestor');

		if(gestorData){
			setGestor(JSON.parse(gestorData))
		}


  return (
    <>
		<GlobalStyle />
		<AuthProvider>
		{isAuthenticated && <Header />}
			<BrowserRouter>
				<Routes>
				<Route element={<ProtectedRoute />}>

					<Route path="/" element={<Home />} />
					<Route path="/rotas" element={<Rotas />} />
					<Route path="/form" element={<FormTest />} />

					<Route path="/transportadora" element={<Transportadora />} />
					<Route path="/transportadora/:id/editar" element={<FormularioTransportadora />} />
					<Route path="/transportadora/cadastrar" element={<FormularioTransportadora />} />

					<Route path="/gestor" element={<Gestor />} />
					<Route path="/gestor/cadastrar" element={<FormularioGestor />} />
					<Route path="/gestor/:id/editar" element={<FormularioGestor/>} />

					</Route>



					<Route path="/login" element={<Login />} />



				</Routes>
			</BrowserRouter>
    </AuthProvider>
		</>
  )
}

export default App
