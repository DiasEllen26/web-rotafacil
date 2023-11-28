import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRotas } from "../../../types/IRotas";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { deleteById } from "../../../utils/firebase/deleteById";
import { ButtonCadastrar, ButtonDeletar, ContainerButton, ContentContainer, ListContainer } from "./style";
import formatarDataBrasileira from "../../../utils/dates/FormatarDataBrasileira";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

export default function Rotas(){

	const navigate = useNavigate()

	const [rotas, setRotas] = useState<IRotas[]>();


	async function getAllRotas() {
		const data = await getAllByCollection('rota') as unknown as IRotas[];
		console.log(data)
		setRotas(data);
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