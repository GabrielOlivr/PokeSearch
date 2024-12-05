import { db } from "../_utils/firebase";
import { collection, addDoc} from "firebase/firestore";

export async function dbAddItem(userId, cards) {
    try {
        const cardsRef = collection(db, "users", userId, "cards");
        const docRef = await addDoc(cardsRef, cards);
        return docRef.id;
    } catch (error) {
        console.log("Error adding card: ", error);
    }
    
}