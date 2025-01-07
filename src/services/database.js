import {db} from "../firebaseFuncs"
import { collection, query, addDoc, serverTimestamp, orderBy, limit, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

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

export const deleteMessages = async (uid, chatID) => {
  try {
    const q = query(
      collection(db, "messages"),
      where("userID", "==", uid),
      where("ChatID", "==", chatID)
    );
    
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    
    await Promise.all(deletePromises);
    console.log("Successfully deleted messages for chat:", chatID);
    return true;
  } catch (error) {
    console.error("Error deleting messages: ", error);
    return false;
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



/* =============== Flashcard code below =================== */


export const getDecks = async (uid) => {
  try {
    const q = query(
      collection(db, "decks"), 
      where("userID", "in", [uid, "DefaultChat"])
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

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
};

export const getFlashcards = async (uid, deckID) => {
  try{
    const q = query(
        collection(db, "flashcards"), 
        where("userID", "==", uid),
        where("deck", "==", deckID),
        orderBy("timeSent", "desc"), // Order by timeSent in descending order (most recent first)
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
export const addDeck = async (data) => {
  try {
    const collectionRef = collection(db, "decks");
    const docRef = await addDoc(collectionRef, {
      ...data
    });
    console.log("Deck added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding deck: ", e);
  }
};

export const addCard = async (data) => {
  try {
    const collectionRef = collection(db, "flashcards");
    const docRef = await addDoc(collectionRef, {
      ...data,
      timeSent: serverTimestamp()
    });
    console.log("Card added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding card: ", e);
  }
};

export const removeCard = async (cardID) => {
  try {
    const docRef = doc(db, "flashcards", cardID);
    await deleteDoc(docRef);
    console.log("Card removed with ID: ", cardID);
  } catch (e) {
    console.error("Error removing card: ", e);
  }
};

export const removeDeck = async (deckID) => {
  try {
    const docRef = doc(db, "decks", deckID);
    await deleteDoc(docRef);
    console.log("Deck removed with ID: ", deckID);
  } catch (e) {
    console.error("Error removing deck: ", e);
  }
};

export const setCardVisited = async (cardID, isVisited) => {
  try {
    const docRef = doc(db, "flashcards", cardID);
    await updateDoc(docRef, {
      visited: isVisited
    });
    console.log("Card visited updated with ID: ", cardID);
  } catch (e) {
    console.error("Error updating card visited: ", e);
  }
};

export const testFlashcardFunctions = async (uid) => {
  try {
    // Test adding a deck
    const deckData = { title: "NEWWW", userID: uid, language: "french" };
    await addDeck(deckData);
    console.log("Deck added successfully");

    // Test getting decks
    const decks = await getDecks(uid);
    console.log("Decks retrieved successfully", decks);

    if (decks.length > 0) {
      const deckID = decks[0].id;

      // Test adding a flashcard
      const cardData = { deck: deckID, translation: "NEWWW", visited: false, word: "Test Word", userID: uid };
      await addCard(cardData);
      console.log("Card added successfully");

      // Test getting flashcards
      const flashcards = await getFlashcards(uid, deckID);
      console.log("Flashcards retrieved successfully", flashcards);

      if (flashcards.length > 0) {
        const cardID = flashcards[0].id;

        // Test setting card visited
        await setCardVisited(cardID, true);
        console.log("Card visited status updated successfully");

        // Test removing card
        await removeCard(cardID);
        console.log("Card removed successfully");
      }

      // // Test removing deck
      await removeDeck(deckID);
      console.log("Deck removed successfully");
    }
  } catch (error) {
    console.error("Error testing flashcard functions: ", error);
  }
};