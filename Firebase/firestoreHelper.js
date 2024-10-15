import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {db} from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    console.log(db);
    try {
        await addDoc(collection(db, collectionName), data);
    } catch (err) {
        console.log("writ to db", err);
    }
}

/*delete a document from the database*/
export async function deleteFromDB(id, collectionName) {
    try {
        await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
        console.log("delete from", err);
    }
}