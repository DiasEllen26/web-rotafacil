import { BrowserRouter, Route, Routes } from "react-router-dom"
import {  GlobalStyle } from "./styles/global"
import Header from "./components/Navbar"
import Login from "./pages/Login/Login"
import { Transportadora } from "./pages/Trasnportadora/lista/Transportadora"
import { FormularioTransportadora } from "./pages/Trasnportadora/formulario/FormularioTransportadora"
import { Gestor } from "./pages/Gestor/lista/Gestor"
import { FormularioGestor } from "./pages/Gestor/formulario/FormularioGestor"
import { AuthProvider, useAuth } from "./context/AuthContext.tsx"
import  ProtectedRoute  from "./routes/ProtectedRoute.tsx"

import HeaderRoutes from "./routes/HeaderRoutes.tsx"
import Usuarios from "./pages/usuario/lista/index.tsx"
import RotaFormulario from "./pages/Rota/formulario/index.tsx"
import Veiculos from "./pages/Veiculo/lista/index.tsx"
import FormularioVeiculo from "./pages/Veiculo/formulario/FormularioVeiculo.tsx"
import Rotas from "./pages/Rota/lista/index.tsx"
import { Home } from "./pages/Home/Home.tsx"

function App() {

	const { isAuthenticated } = useAuth();

  return (
    <>
		<GlobalStyle />
		<AuthProvider>
			<BrowserRouter>
				<Routes>
				{isAuthenticated && <Header />}
					<Route element={<ProtectedRoute />}>
						<Route element={<HeaderRoutes />}>
							<Route path="/" element={<Home />} />
							<Route path="/transportadora" element={<Transportadora />} />
							<Route path="/transportadora/:id/editar" element={<FormularioTransportadora />} />
							<Route path="/transportadora/cadastrar" element={<FormularioTransportadora />} />

							<Route path="/gestor" element={<Gestor />} />
							<Route path="/gestor/cadastrar" element={<FormularioGestor />} />
							<Route path="/gestor/:id/editar" element={<FormularioGestor/>} />

							<Route path="/usuario" element={<Usuarios />} />

							<Route path="/rota" element={<Rotas />} />
							<Route path="/rota/cadastrar" element={<RotaFormulario />} />
							<Route path="/rota/:id/editar" element={<RotaFormulario />} />


							<Route path="/veiculo" element={<Veiculos />} />
							<Route path="/veiculo/cadastrar" element={<FormularioVeiculo />} />
							<Route path="/veiculo/:id/editar" element={<FormularioVeiculo />} />

					</Route>
				</Route>

				<Route path="/login" element={<Login />} />

				</Routes>
			</BrowserRouter>
    </AuthProvider>
		</>
  )
}

export default App
