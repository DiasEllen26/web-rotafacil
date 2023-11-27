import {  doc, getDoc } from "firebase/firestore";
import { DataBase } from "../../config/firebase/connection";

export async function findById(collectionName: string, id: string){
	const userCollectionRef = doc(DataBase,collectionName, id);

	const data = await getDoc(userCollectionRef);

	console.log(data.data())

	if(data.exists()){
		return data.data();
	}

	throw new Error("Dados não encontrados.");

}