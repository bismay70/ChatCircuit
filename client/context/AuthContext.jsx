import { createContext,useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

const backendUrl = import.meta.env.VITE_BACKENDUrl;
axios.default.baseURL=backendUrl;

export const AuthContext = createContext(); 

export const AuthContextProvider = ({children})=>{
    const [token,sdetToken] = useState(localStorage.getItem("token") );
    const [authUser,setAuthUser] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [socket,setSocket] = useState(null);

    const checkAuth = async()=>{
        
    }

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket
    }
    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}