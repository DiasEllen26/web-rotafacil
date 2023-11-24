import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Rotas } from "./pages/Rotas"
import { ContentWrapper, GlobalStyle } from "./styles/global"
import Header from "./components/Navbar"
import { FormTest } from "./pages/FormTest"


function App() {

  return (
    <>
		<GlobalStyle />
		<Header />
		<ContentWrapper>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rotas" element={<Rotas />} />
				<Route path="/form" element={<FormTest />} />
			</Routes>
		</ContentWrapper>
    </>
  )
}

export default App
