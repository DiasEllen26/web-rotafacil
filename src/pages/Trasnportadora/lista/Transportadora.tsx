// pages/Trasnportadora/lista/Transportadora.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITrasnportadora } from "../../../types/ITrasnportadora";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { Loading } from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import Lista from "../../../components/Lista";
import {StyledButtonContainer, StyledCadastrarButton} from "../../../components/Lista/style"



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
			Swal.fire({
				icon: "error",
				title: "Erro",
				text: String(error)
			});
		}
	}



	useEffect(() => {
		getAllTransportadoras()
	}, [])

	const renderTransportadoraFields = (transportadora: ITrasnportadora) => [
    transportadora.nome,
    transportadora.endereco,
    transportadora.telefone,
    transportadora.sitio,
    transportadora.email,
  ];


	return (
		<>
			<Loading visible={isLoading} />
				<Lista
					items={transportadoras || []}
					onDelete={handleDelete}
					editPath="editar"
					renderFields={renderTransportadoraFields}
				/>
				<StyledButtonContainer>
					<StyledCadastrarButton
							onClick={() => {
								navigate('/transportadora/cadastrar')
							}}
						>
							Cadastrar
					</StyledCadastrarButton>
				</StyledButtonContainer>
		</>
	)
}
