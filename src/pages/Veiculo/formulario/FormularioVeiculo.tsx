import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRotas } from "../../../types/IRotas";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { findById } from "../../../utils/firebase/findById";
import { IVeiculo } from "../../../types/IVeiculo";
import { ButtonEnviarFormulario, ContentContainer, Formulario, InputFormulario, SelectRota } from "./style";
import Swal from "sweetalert2";
import { FindReference } from "../../../utils/firebase/FindReference";
import { createDoc } from "../../../utils/firebase/createDoc";

export default function FormularioVeiculo(){

	const navigate = useNavigate()

	const { id } = useParams();

	const [rotas, setRotas] = useState<IRotas[]>();

	const [isCreating, setCreating] = useState<boolean>(true);

	const [assento, setAssento] = useState<number>();
	const [descricao, setDescricao] = useState<string>("");
	const [placa, setPlaca] = useState<string>("");
	const [rotaSelected, setRotaSelected] = useState<string>("");



	useEffect(()=>{
		encontrarRotas()

		if(id){
			definirVeiculoExistente(id);
			setCreating(false)
		}

	},[])

	async function definirVeiculoExistente(id: string){
		const { assento, descricao, placa, id_rota} = await findById("veiculo", id) as IVeiculo;

		setDescricao(descricao);
		setAssento(assento);
		setPlaca(placa);
		setRotaSelected(id_rota.id);
	}

	async function encontrarRotas(){
		const rotas = await getAllByCollection("rota") as unknown as IRotas[];
		setRotas(rotas)
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
			await createDoc("veiculo", data);
			navigate('/veiculo')
			return
		}
	}

	return(
		<>
			<ContentContainer>
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
			</ContentContainer>

		</>
	)
}