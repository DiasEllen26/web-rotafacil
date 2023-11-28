import { addDoc, collection } from "firebase/firestore";
import { DataBase } from "../../config/firebase/connection";

export async function createDoc(collectionName: string, data: Object){
	const userCollectionRef = collection(DataBase, collectionName)
	const dataReponse = await addDoc(userCollectionRef, data);
	return dataReponse
}