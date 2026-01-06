import React,{useState} from 'react'
import assets from '../assets/assets';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

    const [currState,setCurrState] = useState('Sign Up'); 
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');    
    const [bio,setBio] = useState('');
    const [isDataSubmited,setIsDataSubmited] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

const {login} = useContext(AuthContext);

    const onSubmitHandler = (e) =>{
        e.preventDefault(); 
        if(currState === 'Sign Up' && !isDataSubmited){
            setIsDataSubmited(true);
            return
        }
        
        // For login, we don't need profilePic
        if (currState === 'Login') {
            login('login', { email, password });
            return;
        }

        // For signup, handle profilePic (if any)
        const signupData = {
            fullName,
            email,
            password,
            bio,
            profilePic // This might be a base64 string or null
        };
        
        login('signup', signupData);
    } 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-xl">

    <img src={assets.logo_big} className="w-[min(30vw,250px)]"/>

    <form onSubmit={onSubmitHandler} className='w-96 border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
            {currState}
            {isDataSubmited && 
            <img onClick={()=>setIsDataSubmited(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
            }
            
        </h2>

        {currState === 'Sign Up' && !isDataSubmited && (
            <input type="text" placeholder='Full Name' required className='bg-transparent border-b border-gray-500 p-2 focus:outline-none placeholder:text-gray-300' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
        )}

        {!isDataSubmited && (
            <>
            <input type="email" placeholder='Email' required className='bg-transparent border-b border-gray-500 p-2 focus:outline-none placeholder:text-gray-300 focus:ring-indigo-900' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' required className='bg-transparent border-b border-gray-500 p-2 focus:outline-none placeholder:text-gray-300 focus:ring-indigo-900' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </>
        )}

        {
            currState === 'Sign Up' && isDataSubmited && (
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4 cursor-pointer'>
                        <label htmlFor="profile-pic-upload" className="cursor-pointer">
                            <img 
                                src={imagePreview || assets.avatar_icon} 
                                alt="Profile Preview" 
                                className="w-16 h-16 rounded-full object-cover border border-gray-500"
                            />
                        </label>
                        <label htmlFor="profile-pic-upload" className="cursor-pointer text-sm text-gray-300 hover:text-white">
                            Upload Profile Picture
                        </label>
                        <input 
                            id="profile-pic-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                        />
                    </div>
                    <textarea onChange={(e)=>setBio(e.target.value)} value={bio} 
                    rows={4} className='p-2 border-gray-500 rouded-md focus:outline:none focus:ring-2 focus:ring-indigo-500 ' placeholder="provide short bio ." required></textarea>
                </div>
            )
        }

        <button type="submit" className='py-3 bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-md cursor-pointer'>
            {currState === 'Sign Up' ?  'Create Account'  : 'Login now'}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-400'>
            <input type="checkbox"/>
            <p>Agree to terms of use and privacy </p>
        </div>

        <div className='flex flex-col gap-2'>
            {currState === 'Sign Up' ? (
                <p className='text-sm text-gray-300'>Already have an account? <span onClick={()=>{setCurrState('Login'); setIsDataSubmited(false)}} className='text-purple-400 cursor-pointer'>Login</span></p>
            ) : (
                <p className='text-sm text-gray-300'>Don't have an account? <span onClick={()=>setCurrState('Sign Up')} className='text-purple-400 cursor-pointer'>Sign Up</span></p>
            )}
        </div>

    </form>
    </div>
  )
}

export default LoginPage
