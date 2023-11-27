import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type IGestor } from "../../../types/IGestor";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import {  ButtonCadastrar, ButtonDeletar, ContainerButton, ContentContainer, ListContainer } from "./style";
import { Link } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { deleteById } from "../../../utils/firebase/deleteById";

export function Gestor(){

	const navigate = useNavigate()


	const [gestores, setGestores] = useState<IGestor[]>();

	async function getAllGestores() {
		const data = await getAllByCollection("gestor") as unknown as IGestor[];
		setGestores(data);
	}

	useEffect(()=>{
		getAllGestores();
	},[])

	async function handleDelete(id: string){
		try{
			await deleteById("gestor", id);
			const newGestores = gestores?.filter(gestor => gestor.id !== id);
			setGestores(newGestores);
		}catch(error){
			window.alert(error);
		}
	}

	return (
		<>
			<ContentContainer>
				<ListContainer>
					{gestores?.map(gestor => (
						<div
							key={gestor.id}
						>
							<h1>{gestor.nome}</h1>
							<h2>{gestor.email}</h2>
							<div>
								<Link to={`${gestor.id}/editar/`}>
									<FaPencil />
								</Link>
							</div>
							<div>
								<ButtonDeletar
									onClick={()=> handleDelete(gestor.id)}
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
							navigate('/gestor/cadastrar');
						}}
					>
						Cadastrar
					</ButtonCadastrar>
				</ContainerButton>

		</>
	)
}