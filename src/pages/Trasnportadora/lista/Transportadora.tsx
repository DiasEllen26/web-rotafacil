import { useNavigate } from "react-router-dom";
import { ButtonCadastrar, ButtonDeletar, ContainerButton, ContainerContent } from "./style";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { type ITrasnportadora } from "../../../types/ITrasnportadora";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { Link } from "react-router-dom";
import { deleteById } from "../../../utils/firebase/deleteById";
import { Loading } from "../../../components/Loading/Loading";



export function Transportadora(){
	const navigate = useNavigate()

	const [isLoading, setLoading] = useState<boolean>(true);


	const [transportadoras, setTransportadoras] = useState<ITrasnportadora[]>()

	async function getAllTransportadoras(){
		const data = await getAllByCollection("transportadora") as unknown as ITrasnportadora[]
		setTransportadoras(data);
		setLoading(false)
	}

	async function handleDelete(id: string){
    try{
			setLoading(true)
			await deleteById("transportadora", id);
			const newTransportadoras = transportadoras?.filter(transportadora => transportadora.id !== id);
			setTransportadoras(newTransportadoras);
			setLoading(false)
		}catch(error){
			window.alert(error);
		}
	}


	useEffect(() => {
		getAllTransportadoras()
	}, [])

	return (
		<>
			<Loading visible={isLoading} />
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

							<div>
								<ButtonDeletar
									onClick={()=> handleDelete(transportadora.id)}
								>
									<FaRegTrashCan />
								</ButtonDeletar>
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