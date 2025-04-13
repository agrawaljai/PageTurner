import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import axios from "axios";

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

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password); 
    const signinUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    // Update the handleCreateNewListing function in your Firebase.js context file

    const handleCreateNewListing = async(name, isbn, price, coverFile, category = "Fiction") => {
    try {
        setIsSubmitting(true);

        // Create FormData to send image as multipart/form-data to Cloudinary
        const formData = new FormData();
        formData.append("file", coverFile); // Append the cover image
        formData.append("upload_preset", "book_covers"); // Cloudinary preset

        // Send image to Cloudinary and get the response
        const response = await axios.post("https://api.cloudinary.com/v1_1/dvbty9y9x/image/upload", formData);

        if (response.status === 200) {
            const imageUrl = response.data.secure_url; // Get image URL from Cloudinary response

            // Store the new book data in Firestore
            const result = await addDoc(collection(firestore, 'books'), {
                name,
                isbn,
                price,
                category,
                imageURL: imageUrl, // Store Cloudinary image URL
                userID: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString()
            });
            return result;
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        throw error;
    } finally {
        setIsSubmitting(false);
    }
    };

    const handleDeleteListing = async(id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        if (result.data().userID !== user.uid) {
            return alert("User Not Authorized");
        } else {
            return await deleteDoc(docRef).then(() => console.log("doc deleted")).catch((e) => alert(e));
        }
    }

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books")); 
    }

    const searchBooks = async(searchTerm) => {
        const booksSnapshot = await getDocs(collection(firestore, "books"));
        const searchTermLower = searchTerm.toLowerCase();
        
        const filteredBooks = booksSnapshot.docs.filter(doc => {
            const data = doc.data();
            return data.name.toLowerCase().includes(searchTermLower) || 
                   data.isbn.toLowerCase().includes(searchTermLower) ||
                   (data.displayName && data.displayName.toLowerCase().includes(searchTermLower));
        });
        
        return filteredBooks;
    }
    
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

    // Cloudinary doesn't need to store the path, the URL is directly used from the response
    const getImageUrl = async (imageUrl) => {
        return imageUrl;
    };
      

    const placeOrder = async(bookId, qty, amount) => {
        const collectionRef = collection(firestore, 'books', bookId, "orders");
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
    const getFirestore = () => {
        return firestore;
    };

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
            getFirestore,
            logout
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}
