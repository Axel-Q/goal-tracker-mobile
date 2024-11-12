import {
    addDoc, collection, deleteDoc, doc, getDocs, setDoc, query, where, getDoc
} from "firebase/firestore";
import {auth, db} from "./firebaseSetup";

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

/*
* updateDoc only updates existing fields. If the field doesn't exist, it won't add it to the document.
*
* In this case, since we're adding a new field that doesn't exist yet in the document,
* we should use setDoc with {merge: true} instead of updateDoc
* */
export async function addWarning(goalId) {
    try {
        const goalRef = doc(db, "goals", goalId);
        await setDoc(goalRef, {
            warning: true,
        }, {merge: true});
        console.log("Warning added successfully");
    } catch (err) {
        console.log("error in add warning", err);
    }
}

export async function writeWithIdToDB(data, collectionName, id) {
    try {
        await setDoc(doc(db, collectionName, id), data, {merge: true});
    } catch (err) {
        console.log("write to db ", err);
    }
}

export async function getADoc(collectionName, id) {
    try {
        const docSnap = await getDoc(doc(db, collectionName, id));
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (err) {
        console.log("write to db ", err);
    }
}

export async function getAllDocs(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        let newArray = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((docSnapshot) => {
                newArray.push(docSnapshot.data());
            });
            console.log("array from readDocs", newArray);
        }
        return newArray;
    } catch (err) {
        console.log(err);
    }
}