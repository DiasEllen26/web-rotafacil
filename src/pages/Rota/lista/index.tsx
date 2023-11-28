import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ButtonCadastrar, ButtonDeletar, ContainerButton, ContentContainer, ListContainer } from "./style";
import formatarDataBrasileira from "../../../utils/dates/FormatarDataBrasileira";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { ITrasnportadora } from "../../../types/ITrasnportadora";
import { Loading } from "../../../components/Loading/Loading";
import Swal from "sweetalert2";


interface IRotaResponse {
	id: string;
	id_transportadora: {
		id: string
	};
	descricao: string;
	localPartida: string;
	destino: string;
	chegada: {
		seconds: number
	};
	saida: {
		seconds: number
	};

}

export default function Rotas(){

	const navigate = useNavigate()

	const [isLoading, setLoading] = useState<boolean>(true);


	const [rotas, setRotas] = useState<IRotaResponse[]>();
	const [transportadoras, setTransportadoras] = useState<ITrasnportadora[]>();

	async function getAllRotas() {
		const [data, transportadoraData] = await Promise.all([
			getAllByCollection('rota') as unknown as IRotaResponse[],
			getAllByCollection('transportadora') as unknown as ITrasnportadora[]
		])

		setRotas(data);
		setTransportadoras(transportadoraData);
		setLoading(false);
	}

	useEffect(()=>{
		getAllRotas();
	},[])

	async function handleDelete(id: string){
		try{
			setLoading(true)
			await deleteById("rota", id);
			const newRotas = rotas?.filter(rota => rota.id !== id);
			setRotas(newRotas);
			setLoading(false)
		}catch(error){
			Swal.fire({
				icon: "error",
				title: "Erro",
				text: String(error)
			});
		}
	}

	return (
		<>
			<Loading visible={isLoading} />
			<ContentContainer>
				<ListContainer>
					{rotas?.map( rota => (
						<div key={rota.id}>
							<h1>{rota.localPartida + " A " + rota.destino}</h1>
							<h2>{rota.descricao}</h2>
							<h2>{"Saida" + " " + formatarDataBrasileira(rota.saida.seconds)}</h2>
							<h2>{"Cheagada" + " " +formatarDataBrasileira(rota.chegada.seconds)}</h2>
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