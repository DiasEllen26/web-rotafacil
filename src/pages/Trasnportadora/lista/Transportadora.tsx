import { useNavigate } from "react-router-dom";
import { ButtonCadastrar, ContainerButton, ContainerContent } from "./style";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { type ITrasnportadora } from "../../../types/ITrasnportadora";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { Link } from "react-router-dom";



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

							<div>
								<Link to={`${transportadora.id}/editar/`}>
									<FaPencil />
								</Link>
							</div>
						</div>
					))}
				</ContainerContent>

				<ContainerButton>
					<ButtonCadastrar
							onClick={() => {
								navigate('/transportadora/cadastrar')
							}}
						>
							Cadastrar
					</ButtonCadastrar>
				</ContainerButton>



		</>
	)
}