import { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { IRotas } from "../../../types/IRotas";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ButtonCadastrar, ButtonDeletar, ContainerButton, ContentContainer, ListContainer } from "./style";
import formatarDataBrasileira from "../../../utils/dates/FormatarDataBrasileira";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { ITrasnportadora } from "../../../types/ITrasnportadora";

export default function Rotas(){

	const navigate = useNavigate()

	const [rotas, setRotas] = useState<IRotas[]>();
	const [transportadoras, setTransportadoras] = useState<ITrasnportadora[]>();

	async function getAllRotas() {
		const [data, transportadoraData] = await Promise.all([
			getAllByCollection('rota') as unknown as IRotas[],
			getAllByCollection('transportadora') as unknown as ITrasnportadora[]
		])

		setRotas(data);
		setTransportadoras(transportadoraData);
	}

	useEffect(()=>{
		getAllRotas();
	},[])

	async function handleDelete(id: string){
		try{
			await deleteById("rota", id);
			const newRotas = rotas?.filter(rota => rota.id !== id);
			setRotas(newRotas);
		}catch(error){
			window.alert(error);
		}
	}

	return (
		<>
			<ContentContainer>
				<ListContainer>
					{rotas?.map( rota => (
						<div key={rota.id}>
							<h1>{rota.localPartida + " A " + rota.destino}</h1>
							<h2>{rota.descricao}</h2>
							<h2>{"Saida" + " " + formatarDataBrasileira(rota.saida)}</h2>
							<h2>{"Cheagada" + " " +formatarDataBrasileira(rota.chegada)}</h2>
							{transportadoras
								?.filter((transportadora) => transportadora.id === rota.id_transportadora.id)
								.map((matchingTransportadora) => (
									<h2 key={matchingTransportadora.id}>{matchingTransportadora.nome}</h2>
								))}
							<div>
								<Link to={`${rota.id}/editar/`}>
									<FaPencil />
								</Link>
							</div>
							<div>
								<ButtonDeletar
									onClick={()=> handleDelete(rota.id)}
								>
									<FaRegTrashCan />
								</ButtonDeletar>
							</div>
						</div>
					))}
				</ListContainer>
			</ContentContainer>


			<ContainerButton>
					<ButtonCadastrar
						onClick={() => {
							navigate('/rota/cadastrar');
						}}
					>
						Cadastrar
					</ButtonCadastrar>
				</ContainerButton>

		</>
	)
}