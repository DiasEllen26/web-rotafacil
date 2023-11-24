import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Rotas } from "./pages/Rotas"
import { ContentWrapper, GlobalStyle } from "./styles/global"
import Header from "./components/Navbar"
import { FormTest } from "./pages/FormTest"
import Login from "./pages/Login/Login"
import { useEffect, useState } from "react"


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
				<Route path="/rotas" element={<Rotas />} />
				<Route path="/form" element={<FormTest />} />
			</Routes>
		{/* </ContentWrapper> */}
    </>
  )
}

export default App
