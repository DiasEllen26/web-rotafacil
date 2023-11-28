import banner from "../../imagens/home.jpeg"

export function Home(){
	return(
		<>
			<img src={banner} style={{
				width: "100%",
				height: "100dvh",
				overflowY: "hidden"
			}} />
		</>
	)
}