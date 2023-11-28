import { useEffect, useState } from "react";
import { IUsuario } from "../../../types/IUsuario";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { ContentContainer, ListContainer } from "./style";

export default function Usuarios(){

	const [usuarios, setUsuarios] = useState<IUsuario[]>();

	async function getAllUsuarios(){
		const data = await getAllByCollection("usuario") as unknown as IUsuario[];
		setUsuarios(data);
	}

	useEffect(()=>{
		getAllUsuarios()
	},[])

	return(
		<>
			<ContentContainer>
				<ListContainer>
					{usuarios?.map(usuario => (
						<div key={usuario.id}>
							<h1>{usuario.nome}</h1>
							<h2>{usuario.email}</h2>
							<h2>{usuario.telefone}</h2>
							<h2>{usuario.endereco}</h2>
						</div>
					))}
				</ListContainer>
			</ContentContainer>
		</>
	)
}