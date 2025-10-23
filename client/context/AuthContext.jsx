import { createContext } from "react";

export const AuthContext = createContext();

const backendUrl = import.meta.env.VITE_BACKENDUrl;

export const AuthContextProvider = ({children})=>{
    const value = {
        
    }
    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}