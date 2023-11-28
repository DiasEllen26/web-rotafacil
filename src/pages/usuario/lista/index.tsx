import { useEffect, useState } from "react";
import { IUsuario } from "../../../types/IUsuario";
import { getAllByCollection } from "../../../utils/firebase/getAllByCollection";
import { ContentContainer, ListContainer } from "./style";
import { Loading } from "../../../components/Loading/Loading";

export default function Usuarios(){

	const [usuarios, setUsuarios] = useState<IUsuario[]>();

	const [isLoading, setLoading] = useState<boolean>(true);


	async function getAllUsuarios(){
		const data = await getAllByCollection("usuario") as unknown as IUsuario[];
		setUsuarios(data);
		setLoading(false)
	}

	useEffect(()=>{
		getAllUsuarios()
	},[])

	return(
		<>
			<Loading visible={isLoading} />
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