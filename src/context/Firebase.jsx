import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBjwecJ_9ex282dnIdJo5OK6zZLePp-OhE",
    authDomain: "pageturner-46efa.firebaseapp.com",
    projectId: "pageturner-46efa",
    storageBucket: "pageturner-46efa.appspot.com",
    messagingSenderId: "363501343811",
    appId: "1:363501343811:web:0260da0d2c5db0a0a1f0f6"
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

    const handleDeleteListing = async(id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        if(user == null || result.data().userID !== user.uid) {
            return alert("User Not Authorized");
        } else {
            return await deleteDoc(docRef).then((e) => console.log("doc deleted")).catch((e) => alert(e));
        }
    }

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
        await addDoc(collectionRef, {
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
    
    

    const logout = async() => {
        await firebaseAuth.signOut().then(() => {
          setUser(null);
        });   
      }


    
    

    

    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword , signinUserWithEmailAndPassword, signinWithGoogle, handleCreateNewListing, handleDeleteListing, listAllBooks, getBookById, getImageUrl, placeOrder, fetchMyBooks, getOrders, isLoggedIn, user, logout}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}