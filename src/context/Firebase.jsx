import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAan1vE0f_SItBdlJLFzgp_A4N0ZLqq8Ik",  
    authDomain: "pageturner-b0560.firebaseapp.com",
    projectId: "pageturner-b0560",
    storageBucket: "pageturner-b0560.appspot.com",
    messagingSenderId: "264786417471",
    appId: "1:264786417471:web:ea45acbaca5e498c73e58a"
};
  
const firebaseApp = initializeApp(firebaseConfig);  
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if(user) setUser(user);
            else setUser(null);
        }, []);
    })
    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password); 
    
    const signinUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
    
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const handleCreateNewListing = async(name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}` );
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, 'books'), {
            name, 
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email, 
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books")); 
    }

    const getBookById = async(id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        return result;
    }
    const getImageUrl = (path) => {
        return getDownloadURL(ref(storage, path));
    } 

    const placeOrder = async(bookId, qty, amount) => {
        const collectionRef = collection(firestore, 'books', bookId, "orders" );
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email, 
            price: amount,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty,
        });

    }

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userID", '==', userId));
        
        const result = await getDocs(q);
        return result;
        
    }

    const getOrders = async(bookId) => {
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
    }



    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword , signinUserWithEmailAndPassword, signinWithGoogle, handleCreateNewListing, listAllBooks, getBookById, getImageUrl, placeOrder, fetchMyBooks, getOrders, isLoggedIn, user}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}