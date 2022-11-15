import { createContext, useContext, useEffect, useState } from "react";
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, firestore } from "../Service/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error("Not auth provider.")
    return context;
}

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [rolUser, setRol] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(null);

    const signup = async (email, password) => {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
            .then((userFirebase) => {
                return userFirebase;
            })
        const docRef = doc(firestore, `users/${userCredentials.user.uid}`);
        setDoc(docRef, {rol: "user", email: email});
        setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const docRef = doc(firestore, `users/${userCredentials.user.uid}`);
        const docCifrada = await getDoc(docRef);
        const infoFinal = docCifrada.data().rol;
        setRol(infoFinal);
    }

    const logout = () => {
        setIsLogged(false);
        signOut(auth);
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setIsLogged(true)
            setLoading(false)
        })
        return unsubscribe
    }, []);

    return(
        <authContext.Provider value={{
            signup, 
            login,
            logout,
            rolUser,
            loading,
            user,
            isLogged
        }}>{children}</authContext.Provider>
    )
}