import { DataBase } from "../../config/firebase/connection";
import { collection, doc, updateDoc } from "firebase/firestore";

export async function updateDocById(collectionName: string, id: string, data: {}){
	const collectionRef = collection(DataBase, collectionName);
  const documentRef = doc(collectionRef, id);

	try{
		await updateDoc(documentRef, data)
	}catch(error){
		throw new Error("Falha ao atualizar tente novamente.")
	}
}