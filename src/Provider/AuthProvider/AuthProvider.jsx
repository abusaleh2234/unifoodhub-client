import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hook/AxiosPublic/useAxiosPublic";


export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState()
    const [looding, setLooding] = useState(true)

    const createUser = (email, password) => {
        setLooding(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLooding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLooding(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLooding(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                            setLooding(false)
                        }

                    })
            }
            else {
                localStorage.removeItem("access-token")
                setLooding(false)
            }
        });
        return () => {
            // setLooding(false)
            return unsubscribe;
        }

    }, [axiosPublic])

    const authInfo = {
        createUser,
        loginUser,
        googleLogin,
        logOut,
        user,
        looding,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;