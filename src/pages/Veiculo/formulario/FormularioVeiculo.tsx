import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRotas } from "../../../types/IRotas";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { findById } from "../../../utils/firebase/findById";
import Swal from "sweetalert2";
import { FindReference } from "../../../utils/firebase/FindReference";
import { createDoc } from "../../../utils/firebase/createDoc";
import { updateDocById } from "../../../utils/firebase/updateDocById";
import { ButtonEnviarFormulario, ContainerContent, Formulario, InputFormulario } from "../../../components/Formulario";
import { SelectRota } from "./style";
import { Loading } from "../../../components/Loading/Loading";

interface IVeiculoResponse {
	id: string;
	descricao: string;
	assento: number;
	placa: string;
	id_rota: {
		id: string
	}
}

export default function FormularioVeiculo(){

	const navigate = useNavigate()

	const { id } = useParams();

	const [rotas, setRotas] = useState<IRotas[]>();

	const [isCreating, setCreating] = useState<boolean>(true);

	const [assento, setAssento] = useState<number>();
	const [descricao, setDescricao] = useState<string>("");
	const [placa, setPlaca] = useState<string>("");
	const [rotaSelected, setRotaSelected] = useState<string>("");


	const [isLoading, setLoading] = useState<boolean>(false);


	useEffect(()=>{
		encontrarRotas()

		if(id){
			setLoading(true)
			definirVeiculoExistente(id);
			setCreating(false)
		}

	},[])

	async function definirVeiculoExistente(id: string){
		const { assento, descricao, placa, id_rota} = await findById("veiculo", id) as IVeiculoResponse;

		setDescricao(descricao);
		setAssento(assento);
		setPlaca(placa);
		setRotaSelected(id_rota.id);
		setLoading(false)
	}

	async function encontrarRotas(){
		setLoading(true)
		const rotas = await getAllByCollection("rota") as unknown as IRotas[];
		setRotas(rotas)
		if(!id){
			setLoading(false)
		}

	}

	function handleSelecaoRota(event: any){
		setRotaSelected(event.target.value);
	}

	async function cadastrarOuEditarVeiculo(event: FormEvent<HTMLFormElement>){
		event.preventDefault()

		if(!descricao || !assento || !placa || !rotaSelected){
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
				assento,
				placa,
				id_rota: await FindReference('rota', rotaSelected)
			}
			setLoading(true);
			await createDoc("veiculo", data);
			setLoading(false);
			navigate('/veiculo')
			return
		}

		if(!id){
			return
		}

		const data = {
			descricao,
			assento,
			placa,
			id_rota: await FindReference('rota', rotaSelected)
		}
		setLoading(true);
		await updateDocById('veiculo',id,data);
		setLoading(false);
		navigate('/veiculo')
		return

	}

	return(
		<>
			<Loading visible={isLoading} />
			<ContainerContent>
				<Formulario onSubmit={cadastrarOuEditarVeiculo}>
					<label>Descrição</label>
					<InputFormulario
						name="descricao"
						type="text"
						value={descricao}
						onChange={e => setDescricao(e.target.value)}

					/>
					<label>Assento</label>
					<InputFormulario
						name="assent"
						type="number"
						value={assento}
						onChange={e => {
							const inputValue = +e.target.value;
							if (inputValue >= 0 ) {
								setAssento(inputValue);
							}
						}}

					/>
					<label>Placa</label>
					<InputFormulario
						name="placa"
						type="text"
						value={placa}
						onChange={e => setPlaca(e.target.value)}

					/>

					<label>Rotas</label>
					<SelectRota
						id="rotaList"
						name="rota"
						value={rotaSelected}
						onChange={handleSelecaoRota}
					>
						{rotas?.map((rota, index) => (
							<option key={index} value={rota.id}>
								{rota.localPartida + " A " + rota.destino}
							</option>
						))}
					</SelectRota>
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