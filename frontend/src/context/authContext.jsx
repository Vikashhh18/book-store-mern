import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const authContext=createContext();
export const useAuth=()=>{
    return useContext(authContext);
}

const googleProvider=new GoogleAuthProvider();

export const AuthProvider=({children})=>{

    const [currentUser,setCurrentUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const registerUser=async(email,password)=>{
        return await createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser=async(email,password)=>{
        return await signInWithEmailAndPassword(auth,email,password);
    }

    const SignInWithGoogle=async()=>{
        return await signInWithPopup(auth,googleProvider);
    }

    const logout=()=>{
        return signOut(auth);
    }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          userName: displayName,
          photo: photoURL,
        };
        console.log("User logged in:", userData);
      }
    });

    return unsubscribe;
  }, []);

    const value={
        currentUser,registerUser,loginUser,SignInWithGoogle,logout,loading
    }

    return (<authContext.Provider value={value}>
        {children}
    </authContext.Provider>
    )
}