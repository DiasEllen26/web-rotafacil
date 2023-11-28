import { collection, getDocs } from "firebase/firestore"
import { DataBase } from "../../config/firebase/connection"

export async function getAllByCollection(collectionName: string){
	const userCollectionRef = collection(DataBase, collectionName)

	const data = await getDocs(userCollectionRef)

	const dataFormated = data.docs.map(doc => ({...doc.data(), id: doc.id}))

	return dataFormated
}