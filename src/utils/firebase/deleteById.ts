import { deleteDoc, doc } from "firebase/firestore";
import { DataBase } from "../../config/firebase/connection";

export async function deleteById(collectionName: string ,id: string): Promise<void> {
	const docRefference = doc(DataBase, collectionName, id);
	await deleteDoc(docRefference);
}