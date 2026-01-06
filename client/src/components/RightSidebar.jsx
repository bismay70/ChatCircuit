import React, { useContext, useState , useEffect} from 'react'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const RightSidebar = () => {

    const {selectedUser,messages} = useContext(ChatContext);
    const {logout,onlineUsers} = useContext(AuthContext)
    const [msgImages,setMsgImages] = useState([]);


    // get all imgs feom msgs and set them to state
    useEffect(()=>{
        const images = messages.filter(msg=>msg.image).map(msg=>msg.image);
        setMsgImages(images);
    },[messages])


  return selectedUser &&  (
    <div className={`bg-[#8185B2]/10 text-white relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}> 

        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img src={selectedUser?.profilePic || assets.avatar_icon} className='w-20 aspect-[1/1] rounded-full' />
            <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
                {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
                {selectedUser.fullName}
                </h1>
                <p className='px-10 mx-auto'>{selectedUser.bio}</p>
        </div>

        <hr className='border-[#ffffff50] m-2' />
        <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
            {msgImages.map((url,index)=>(
                <div key={index} onClick={()=>window.open(url,'_blank')} className='cursor-pointer rounded'>
                    <img src={url} className='h-full rounded-md'/>
                </div>
            ))}
        </div>
        </div>

        <button onClick={()=>logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-20 py-2 rounded-full cursor-pointer bg-gradient-to-r from-blue-800 to-blue-900 border-none font-light'>
            Logout
        </button>

    </div>
  )
}

export default RightSidebar