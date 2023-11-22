import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Rotas } from "./pages/Rotas"
import { Login } from "./pages/Login"
import { ThemeProvider } from "styled-components"

function App() {

	const theme = {
		primary : "",
		secondary: "",
		background: "",
		text: "",
		white: "#fff"
	}

  return (
    <>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/rotas" element={<Rotas />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</ThemeProvider>
    </>
  )
}

export default App
