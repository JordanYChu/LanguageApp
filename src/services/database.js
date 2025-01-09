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

export const getNumberOfCardsInDeck = async (deckID) => {
  try {
    const q = query(
      collection(db, "flashcards"),
      where("deck", "==", deckID)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting number of cards in deck: ", error);
    return 0;
  }
};

export const getNumberOfNewCardsInDeck = async (deckID) => {
  try {
    const q = query(
      collection(db, "flashcards"),
      where("deck", "==", deckID),
      where("visited", "==", false)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting number of new cards in deck: ", error);
    return 0;
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

// =========================== User info =====================================

export const addUserInfo = async (uid) => {
  try {
    const collectionRef = collection(db, "userInfo");
    const docRef = await addDoc(collectionRef, {
      lastUsed: new Date(),
      recentDeck: null,
      streak: 0,
      uid: uid
    });
    console.log("User info added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding user info: ", e);
  }
};

export const GetUserInfo = async (uid) => {
  try {
    const q = query(
      collection(db, "userInfo"),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    const userInfo = [];
    querySnapshot.forEach((doc) => {
      userInfo.push({ id: doc.id, ...doc.data() });
    });

    if (userInfo.length === 0) { 
      await addUserInfo(uid);
      return await GetUserInfo(uid);
    }

    return userInfo[0];
  } catch (error) {
    console.error("Error getting user info: ", error);
    return null;
  }
};

export const updateStreak = async (uid) => {
  try {
    const userInfo = await GetUserInfo(uid);
    if (!userInfo) {
      throw new Error("User info not found");
    }

    const lastUsed = userInfo.lastUsed.toDate();
    const today = new Date();

    // Reset time to midnight for both dates to compare only the calendar day
    lastUsed.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - lastUsed;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = userInfo.streak;

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }

    await updateDoc(doc(db, "userInfo", userInfo.id), {
      lastUsed: today, // Use the current date without time
      streak: newStreak
    });

    console.log("Streak updated successfully");
    return newStreak;
  } catch (error) {
    console.error("Error updating streak: ", error);
  }
};

// export const addtestingDecks = async (uid) => {
//   try {
//     // Test adding two decks
//     const deckData1 = { title: "Deck 1", userID: uid, language: "french" };
//     const deckData2 = { title: "Deck 2", userID: uid, language: "spanish" };
//     const deck1 = await addDeck(deckData1);
//     const deck2 = await addDeck(deckData2);
//     console.log("Decks added successfully");

//     const decks = await getDecks(uid);
//     console.log("Decks retrieved successfully", decks);

//     const deck1ID = decks.find(deck => deck.title === "Deck 1").id;
//     const deck2ID = decks.find(deck => deck.title === "Deck 2").id;

//     // Test adding 6 flashcards to each deck
//     for (let i = 1; i <= 6; i++) {
//       const cardData1 = { deck: deck1ID, translation: `Translation ${i}`, visited: false, word: `Word ${i}`, userID: uid };
//       const cardData2 = { deck: deck2ID, translation: `Traducción ${i}`, visited: false, word: `Palabra ${i}`, userID: uid };
//       await addCard(cardData1);
//       await addCard(cardData2);
//     }
//     console.log("Cards added successfully to both decks");
//   } catch (error) {
//     console.error("Error testing flashcard functions: ", error);
//   }
// };
