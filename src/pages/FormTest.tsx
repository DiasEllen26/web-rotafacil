import { addDoc, collection, getDocs } from "firebase/firestore"
import { DataBase } from "../config/firebase/connection"
import { FormEvent, useEffect, useState } from "react"
import { getAllByCollection } from "../utils/firebase/getAllByCollection";
import { createDoc } from "../utils/firebase/createDoc";

interface IGestor {
	id: string;
  nome: string;
  email: string;
	login: string;
	senha: string;
}

export function FormTest(){
	const userCollectionRef = collection(DataBase, 'gestor')

	const [users, setUsers ] = useState<IGestor[]>()
	const getUsers = async ()=> {
		const dataFormated = await getAllByCollection('gestor');
		setUsers(dataFormated as IGestor[])
	}

	useEffect(()=>{
		getUsers()
	},[users])

	async function handleCreateUser(event: FormEvent<HTMLFormElement>){
		event.preventDefault();
		const target = event.target as any
		const nome = target.elements.nome.value;
		const email = target.elements.email.value;
		const login = target.elements.login.value;
		const senha = target.elements.senha.value;

		const gestor = await createDoc("gestor", {
			nome,
			email,
			login,
			senha
		}) as unknown as IGestor

		const usersArray = users
		usersArray?.push(gestor)
		setUsers(usersArray)

		console.log(gestor)
	}

	return(
		<>
				<div
					style={{
						marginLeft: "20dvw"
					}}
				>
					{users?.map( user => (
						<>
							<div
								key={user.id}
							>
								<h1 >
									{user.id}
									<br />
									{user.nome}
									<br />
									{user.email}
									<br />
									{user.login}
									<br />
									{user.senha}
								</h1>
							</div>
						</>
					))}

					<form onSubmit={handleCreateUser}>
						<input
								name="nome"
								placeholder="Nome"
							/>
						<br />
						<input
							name="login"
							placeholder="Login"
						/>
						<br />
						<input
							name="email"
							placeholder="email"
						/>
						<br />
						<input
							name="senha"
							placeholder="senha"
						/>
						<button type="submit">Enviar</button>
					</form>
				</div>
		</>
	)
}