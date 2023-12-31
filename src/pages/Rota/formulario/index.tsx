import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../utils/firebase/findById";
import { ITrasnportadora } from "../../../types/ITrasnportadora";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import Swal from "sweetalert2";
import { createDoc } from "../../../utils/firebase/createDoc";
import { FindReference } from "../../../utils/firebase/FindReference";
import { updateDocById } from "../../../utils/firebase/updateDocById";
import { ButtonEnviarFormulario, ContainerContent, Formulario, InputFormulario } from "../../../components/Formulario";
import { SelectTransportadora } from "./style";
import { Loading } from "../../../components/Loading/Loading";

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

export default function RotaFormulario(){
	const [isLoading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate()

	const { id } = useParams();

	const [descricao,  setDescricao] = useState<string>("");
	const [localPartida, setLocalPartida ] = useState<string>("");
	const [destino, setDestino] = useState<string>("");
	const [chegada, setChegada ] = useState<Date>(new Date());
	const [saida, setSaida ] = useState<Date>(new Date());


	const [isCreating, setCreating] = useState<boolean>(true);


	const [transportadoras, setTransportadoras] = useState<ITrasnportadora[]>();

	const [transportadoraSelected, setTransportadoraSelected] = useState<string>();

	useEffect(()=>{
		setLoading(true)
		encontrarTransportadoras()

		if(id){
			setLoading(true)
			definirRotaExistente(id);
			setCreating(false)
		}

	},[])

	async function encontrarTransportadoras(){
		const transportadoras = await getAllByCollection("transportadora") as unknown as ITrasnportadora[];
		setTransportadoras(transportadoras)
		if(!id){
			setLoading(false)
		}
	}

	async function  definirRotaExistente(id: string){
		const { chegada, descricao, destino, localPartida, saida  } = await findById("rota",id) as unknown as IRotaResponse;

		// const transportadoraData = transportadoras?.find( transportadora => transportadora.id === id)		setTransportadoraSelected(id_transportadora.id)
		setDescricao(descricao);
		setLocalPartida(localPartida);
		setDestino(destino);
		setChegada(new Date(chegada.seconds * 1000));
		setSaida(new Date(saida.seconds * 1000))
		setLoading(false)
	}

	const handleSelecaoTransportadora = (event: any) => {
    setTransportadoraSelected(event.target.value);
  };

	async function cadastrarOuEditarRota(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if(!descricao || !localPartida || !destino || !saida || !chegada || !transportadoraSelected){
			Swal.fire({
				icon: "error",
				title: "Dados inválidos",
				text: "Dados faltando serem preenchidos.",
			});
			return
		}

		if(isCreating){
			const data = {
				descricao,
				localPartida,
				destino,
				saida,
				chegada,
				id_transportadora: await FindReference("transportadora", transportadoraSelected)
			}
			setLoading(true);
			await createDoc("rota", data)
			setLoading(false);
			navigate('/rota')
			return
		}

		if(!id){
			return
		}

		const data = {
			descricao,
			localPartida,
			destino,
			saida,
			chegada,
			id_transportadora: await FindReference("transportadora", transportadoraSelected)
		}
		setLoading(true);
		await updateDocById('rota',id,data);
		setLoading(false);
		navigate('/rota')
		return
	}

	return(
		<>
		<Loading visible={isLoading} />
		<ContainerContent>
			<Formulario onSubmit={cadastrarOuEditarRota}>
				<label>Descrição</label>
				<InputFormulario
						name="descricao"
						type="text"
						value={descricao}
						onChange={e => setDescricao(e.target.value)}
					/>
				<label >Local de partida</label>
				<InputFormulario
						name="localPartida"
						type="text"
						value={localPartida}
						onChange={e => setLocalPartida(e.target.value)}
					/>
					<label>Destino</label>
					<InputFormulario
						name="destino"
						type="text"
						value={destino}
						onChange={e => setDestino(e.target.value)}
					/>
					<label>Horario Saída</label>
					<InputFormulario
						name="saida"
						type="time"
						value={saida.toLocaleTimeString('pr-br', { hour: 'numeric', minute: 'numeric', hour12: false })}
  					onChange={e => setSaida(new Date(`2023-11-28T${e.target.value}:00`))}
					/>
					<label htmlFor="">Chegada</label>
					<InputFormulario
						name="chegada"
						type="time"
						value={chegada.toLocaleTimeString('pr-br', { hour: 'numeric', minute: 'numeric', hour12: false })}
  					onChange={e => setChegada(new Date(`2023-11-28T${e.target.value}:00`))}
					/>

					<label>Transportadora</label>
					<SelectTransportadora
						id="transportadora"
						name="transportadora"
						value={transportadoraSelected}
						onChange={handleSelecaoTransportadora}
					>
						{transportadoras?.map((transportadora, index) => (
							<option key={index} value={transportadora.id}>
								{transportadora.nome}
							</option>
						))}
					</SelectTransportadora>

					<br />
					<br />


				<ButtonEnviarFormulario>
					{isCreating ? "Cadastrar": "Atualizar"}
				</ButtonEnviarFormulario>

			</Formulario>
		</ContainerContent>

		</>
	)
}