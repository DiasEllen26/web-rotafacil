import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IVeiculo } from "../../../types/IVeiculo";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ContentContainer, ListContainer } from "./style";
import { IRotas } from "../../../types/IRotas";

export default function Veiculos(){

	const navigate = useNavigate()

	const [veiculos, setVeiculos] = useState<IVeiculo[]>();
	const [rotas, setRotas] = useState<IRotas[]>();

	async function getAllVeiculos() {
		const [data, rotaData] = await Promise.all([
			getAllByCollection("veiculo") as unknown as IVeiculo[],
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
								<h2 key={rota.id}>{rota.localPartida + " " + rota.destino}</h2>
							))
						}
						<h2>{"Placa: " + veiculo.placa}</h2>
						<h2>{"Assentos: " + veiculo.assento}</h2>
					</div>
				))}
			</ListContainer>
		</ContentContainer>

		</>
	)
}