import { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    const [users, setUsers] = useState([]);

    const { socket, axios, authUser } = useContext(AuthContext);

    //func to get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    //func to get messages with selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //func to send messages with selected user

    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                setMessages([...messages, data.newMessage]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    // func to subscribe to msgs for slected users
    const subscribeToMessages = async () => {
        if(!socket) return;
        socket.on("mewMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: (prevUnseenMessages[newMessage.senderId]) ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }));
            }
        })
    }

    //fnc to unsubscribe form messages
    const unsubscribeFromMessages = () => {
        if(socket) socket.off("mewMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    },[socket,selectedUser])

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }
    }, [selectedUser]);


    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                setMessages((prev) => [...prev, newMessage]);
            } else {
                // Update unseen messages count
                setUnseenMessages((prev) => {
                    const count = prev[newMessage.senderId] || 0;
                    return { ...prev, [newMessage.senderId]: count + 1 };
                });
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, selectedUser]);


    const value = {
        messages,
        selectedUser,
        setSelectedUser,
        users,
        getUsers,
        getMessages,
        sendMessage,
        unseenMessages,
        setUnseenMessages,
        
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
