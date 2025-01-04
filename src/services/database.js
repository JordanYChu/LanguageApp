import {db} from "../firebaseFuncs"
import { collection, query, addDoc, serverTimestamp, orderBy, limit, where, getDocs } from "firebase/firestore";

export const readEntries = async (uid, chatID, numEntries = 9) => {
  try{
    const q = query(
        collection(db, "messages"), 
        where("userID", "==", uid),
        where("ChatID", "==", chatID),
        orderBy("timeSent", "desc"), // Order by timeSent in descending order (most recent first)
        limit(numEntries)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)

    const entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });

    console.log("entries", entries);
    for (let i = 0 ; i<entries.length; i++){
      console.log(entries[i].timeSent)
    }
    return entries;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}

export const postMessage = async (data) => {
  try {
    // Reference to the specified collection
    const collectionRef = collection(db, "messages");

    // Add a new document with a generated ID
    const docRef = await addDoc(collectionRef, {
      ...data, // Spread the data passed to the function
      timeSent: serverTimestamp() // Add a server timestamp for when the document is created
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};



export const readChats = async (uid) => {
  try{
    const q = query(
        collection(db, "chats"), 
        where("UserID", "in", [uid, "DefaultChat"]),
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)

    const entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });

    console.log("entries", entries);
    return entries;
  } catch (error) {
    console.error("Error getting chats: ", error);
    return [];
  }
}

export const getChatInfo = async (uid, chatID) => {
  try {
    const userQuery = query(
      collection(db, "chats"),
      where("UserID", "==", uid),
      where("ChatID", "==", chatID)
    );

    const defaultQuery = query(
      collection(db, "chats"),
      where("UserID", "==", "DefaultChat"),
      where("ChatID", "==", chatID)
    );

    const [userSnapshot, defaultSnapshot] = await Promise.all([
      getDocs(userQuery),
      getDocs(defaultQuery)
    ]);

    const entries = [];
    userSnapshot.forEach((doc) => entries.push({ id: doc.id, ...doc.data() }));
    defaultSnapshot.forEach((doc) => entries.push({ id: doc.id, ...doc.data() }));

    console.log("entries", entries);
    return entries[0];
  } catch (error) {
    console.error("Error getting chats: ", error);
    return [];
  }
};

export const createChat = async (data) => {
  try {
    // Reference to the specified collection
    const collectionRef = collection(db, "chats");

    // Add a new document with a generated ID
    const docRef = await addDoc(collectionRef, {
      ...data 
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// // Usage Example
// const messageData = {
//   text: "Hello, world!",
//   uid: "user123",
//   photoURL: "https://example.com/photo.jpg"
// };