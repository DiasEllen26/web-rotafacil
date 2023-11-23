import { addDoc, collection, getDocs } from "firebase/firestore"
import { DataBase } from "../config/firebase/connection"
import { FormEvent, useEffect, useState } from "react"

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
		const data = await getDocs(userCollectionRef)
		const dataFormated = data.docs.map(doc => ({...doc.data(), id: doc.id}))
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

		const gestor = await addDoc(userCollectionRef, {
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
				<div>
					{users?.map( user => (
						<>

							<h1>
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