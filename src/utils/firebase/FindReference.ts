import { doc, getDoc } from "firebase/firestore";
import { DataBase } from "../../config/firebase/connection";

export async function FindReference(collectionName: string, id: string){
	const ref = doc(DataBase, collectionName, id);

	const dataRef = await getDoc(ref)

	if(!dataRef.exists()){
		throw new Error("Dados não encontrados")
	}

	return ref
}