import { useNavigate } from "react-router-dom";
import { ButtonCadastrar, ContainerButton, ContainerContent } from "./style";
import { useEffect, useState } from "react";
import { type ITrasnportadora } from "../../../types/ITrasnportadora";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";



export function Transportadora(){
	const navigate = useNavigate()

	const [transportadoras, setTransportadoras] = useState<ITrasnportadora[]>()

	async function getAllTransportadoras(){
		const data = await getAllByCollection("transportadora") as unknown as ITrasnportadora[]
		setTransportadoras(data);
	}


	useEffect(() => {
		getAllTransportadoras()
	}, [])

	return (
		<>
				<ContainerContent>

					{transportadoras?.map( transportadora => (
						<div key={transportadora.id}>
							<h1>
								{transportadora.nome}
							</h1>
							<h2>
								{transportadora.endereco}
							</h2>
							<h2>
								{transportadora.telefone}
							</h2>
							<h2>
								{transportadora.sitio}
							</h2>
							<h2>
								{transportadora.sitio}
							</h2>
							<h2>
								{transportadora.email}
							</h2>
						</div>
					))}
				</ContainerContent>

				<ContainerButton>
					<ButtonCadastrar
							onClick={() => {
								navigate('/trasnportadora/cadastrar')
							}}
						>
							Cadastrar
					</ButtonCadastrar>
				</ContainerButton>



		</>
	)
}