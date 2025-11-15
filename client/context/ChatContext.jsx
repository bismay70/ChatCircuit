import {createContext, use} from 'react'
export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages,setMessages] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null);
    const [unseenMessages,setUnseenMessages] = useState([]);
    const [users,setUsers] = useState([]);

    const {socket,axios} = useContext(AuthContext);

    //func to get all users for sidebar
    const getUsers = async()=>{
        try{
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        }catch(error){
            toast.error(error.message);
        }
    }


//func to et messages with selected user



const value ={

}

    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}