import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ButtonCadastrar, ContainerButton } from "./style";
import { IRotas } from "../../../types/IRotas";
import { Loading } from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import Lista from "../../../components/Lista";

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

	const [isLoading, setLoading] = useState<boolean>(true);

	async function getAllVeiculos() {
		const [data, rotaData] = await Promise.all([
			getAllByCollection("veiculo") as unknown as IVeiculoResponse[],
			getAllByCollection('rota') as unknown as IRotas[]
		])
		console.log(data)
		setVeiculos(data);
		setRotas(rotaData)
		setLoading(false)
	}

	useEffect(()=>{
		getAllVeiculos();
	},[])

	async function handleDelete(id: string){
		try{
			setLoading(true)
			await deleteById("veiculo", id);
			const newVeiculos = veiculos?.filter(veiculo => veiculo.id !== id);
			setVeiculos(newVeiculos);
			setLoading(false)
		}catch(error){
			Swal.fire({
				icon: "error",
				title: "Erro",
				text: String(error)
			});
		}
	}


	const renderVeiculosFields = (veiculo: IVeiculoResponse) => [
		<>
			<div key={veiculo.id}
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "30px",
					justifyContent: "center",
					alignItems: "baseline"
				}}
			>
						<h2>{veiculo.descricao}</h2>
						{rotas
							?.filter(rota => rota.id === veiculo.id_rota.id)
							.map( rota => (
								<h2 key={rota.id}>{rota.localPartida + " A " + rota.destino}</h2>
							))
						}
						<h2>{"Placa: " + veiculo.placa}</h2>
						<h2>{"Assentos: " + veiculo.assento}</h2>
					</div>
		</>
	]

	return(
		<>
		<Loading visible={isLoading} />

				<Lista
					items={veiculos || []}
					onDelete={handleDelete}
					editPath="editar"
					renderFields={renderVeiculosFields}
				/>


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