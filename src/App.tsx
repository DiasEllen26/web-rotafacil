import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Rotas } from "./pages/Rotas"
import { GlobalStyle } from "./styles/global"
import Header from "./components/Navbar"


function App() {

  return (
    <>
		<GlobalStyle />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/rotas" element={<Rotas />} />	
		</Routes>

		<Header />
    </>
  )
}

export default App
