import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ButtonCadastrar, ButtonDeletar, ContainerButton, ContentContainer, ListContainer } from "./style";
import { IRotas } from "../../../types/IRotas";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

interface IVeiculoResponse {
	id: string;
	descricao: string;
	assento: number;
	placa: string;
	id_rota: {
		id: string
	}
}

export default function Veiculos(){

	const navigate = useNavigate()

	const [veiculos, setVeiculos] = useState<IVeiculoResponse[]>();
	const [rotas, setRotas] = useState<IRotas[]>();

	async function getAllVeiculos() {
		const [data, rotaData] = await Promise.all([
			getAllByCollection("veiculo") as unknown as IVeiculoResponse[],
			getAllByCollection('rota') as unknown as IRotas[]
		])
		console.log(data)
		setVeiculos(data);
		setRotas(rotaData)
	}

	useEffect(()=>{
		getAllVeiculos();
	},[])

	async function handleDelete(id: string){
		try{
			await deleteById("veiculo", id);
			const newVeiculos = veiculos?.filter(veiculo => veiculo.id !== id);
			setVeiculos(newVeiculos);
		}catch(error){
			window.alert(error);
		}
	}


	return(
		<>
		<ContentContainer>
			<ListContainer>
				{veiculos?.map(veiculo => (
					<div key={veiculo.id}>
						<h1>{veiculo.descricao}</h1>
						{rotas
							?.filter(rota => rota.id === veiculo.id_rota.id)
							.map( rota => (
								<h2 key={rota.id}>{rota.localPartida + " A " + rota.destino}</h2>
							))
						}
						<h2>{"Placa: " + veiculo.placa}</h2>
						<h2>{"Assentos: " + veiculo.assento}</h2>
						<div>
								<Link to={`${veiculo.id}/editar/`}>
									<FaPencil />
								</Link>
							</div>
							<div>
								<ButtonDeletar
									onClick={()=> handleDelete(veiculo.id)}
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
					navigate('/veiculo/cadastrar');
				}}
			>
				Cadastrar
			</ButtonCadastrar>
		</ContainerButton>

		</>
	)
}