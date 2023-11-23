import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Rotas } from "./pages/Rotas"
import { ThemeProvider } from "styled-components"
import { FormTest } from "./pages/FormTest"

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
					<Route path="/form" element={<FormTest />} />
				</Routes>
			</ThemeProvider>
    </>
  )
}

export default App
