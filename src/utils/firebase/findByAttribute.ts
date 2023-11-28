import { collection, getDocs, query, where } from "@firebase/firestore";
import { DataBase } from "../../config/firebase/connection";

export async function findByAttribute(collectionName: string, attributeName: string, value: any): Promise<unknown>{
	const collectionRef = collection(DataBase, collectionName);

	const queryData =  query(collectionRef, where(attributeName, "==", value))

	const data = await getDocs(queryData)

	if(data.empty){
		return null
	}

	const result = data.docs[0].data()

	return result

}