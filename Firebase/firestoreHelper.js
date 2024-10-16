import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
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

export async function deleteAll(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
            deleteFromDB(doc.id, collectionName);
        });
    } catch (err) {
        console.log("delete all", err);
    }
}