import { createContext, useContext, useState } from "react"
//import { httpClient } from "../client/httpClient";
// import dayjs from 'dayjs';
import { httpAxiosClient } from "../client/httpClient";

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [globalUser, setGlobalUser] = useState(null)
    const [doRefresh, setDoRefresh] = useState(false)
    // const [pickedDate, setPickedDate] = useState(() => dayjs()); // Initialiser avec la date du jour

    function authenticate(){
        setIsAuthenticated(true)
    }

    function unAuthenticate(){
        setIsAuthenticated(false)
        setGlobalUser(null)
        !localStorage.setItem("user", "")
    }

    /* fonction pour inscription */
    const subscribe = async (firstN, lastN, email, pass)=>{

        const formData = {
            firstName: firstN,
            lastName: lastN,
            email: email,
        }

        console.log("Subscire starts with ", formData);
        formData['password'] = pass
        console.log(import.meta.env.VITE_API_BASE_URL);

        const response  = await httpAxiosClient.post('auth/signup', {
            json: formData,
            timeout: 10000,
        }).json()
        //authenticate()
        return response
        
        /* await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })*/
        
    }

    /* fonction pour connexion */
    const login = async (email, pass)=>{
        if(!localStorage) {
            throw new Error("Erreur de stockage");
        }

        const formData = {
            email: email,
        }

        console.log("Login starts with ", formData.email);
        formData['password'] = pass

        const response  = await httpAxiosClient.post('auth/signin', {
            json: formData,
            timeout: 10000,
        }).json()

        const userData = {
            'token': response.token,
            "data": response.user
        }
        // local storage (pas securise 0 remplacer par cookies depuis le backend)
        localStorage.setItem("user", JSON.stringify(userData))

        setGlobalUser(
            userData
        )
        return response
        
    }

    const value = {
        isAuthenticated, authenticate, unAuthenticate,
        globalUser, setGlobalUser,
        doRefresh, setDoRefresh,
    };
    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

