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
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if(user) setUser(user);
            else setUser(null);
        });
    }, []);

    
    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password); 
    
    const signinUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
    
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const handleCreateNewListing = async(name, isbn, price, cover, category = "Fiction") => {
        try {
            setIsSubmitting(true);
            const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}` );
            const uploadResult = await uploadBytes(imageRef, cover);
            const result = await addDoc(collection(firestore, 'books'), {
                name, 
                isbn,
                price,
                category,
                imageURL: uploadResult.ref.fullPath,
                userID: user.uid,
                userEmail: user.email, 
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString()
            });
            setIsSubmitting(false);
            return result;
        } catch (error) {
            setIsSubmitting(false);
            throw error;
        }
    };

    const handleDeleteListing = async(id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        if(result.data().userID !== user.uid) {
            return alert("User Not Authorized");
        } else {
            return await deleteDoc(docRef).then(() => console.log("doc deleted")).catch((e) => alert(e));
        }
    }

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books")); 
    }

    // New function to search books by name, isbn, or author
    const searchBooks = async(searchTerm) => {
        const booksSnapshot = await getDocs(collection(firestore, "books"));
        const searchTermLower = searchTerm.toLowerCase();
        
        // Filter books that match the search term
        const filteredBooks = booksSnapshot.docs.filter(doc => {
            const data = doc.data();
            return data.name.toLowerCase().includes(searchTermLower) || 
                   data.isbn.toLowerCase().includes(searchTermLower) ||
                   (data.displayName && data.displayName.toLowerCase().includes(searchTermLower));
        });
        
        return filteredBooks;
    }
    
    // New function to get books by category
    const getBooksByCategory = async(category) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("category", '==', category));
        const result = await getDocs(q);
        return result.docs;
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
            orderDate: new Date().toISOString()
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
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            signinWithGoogle,
            handleCreateNewListing,
            handleDeleteListing,
            listAllBooks,
            searchBooks,
            getBooksByCategory,
            getBookById,
            getImageUrl,
            placeOrder,
            fetchMyBooks,
            getOrders,
            isLoggedIn,
            isSubmitting,
            user,
            logout
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}