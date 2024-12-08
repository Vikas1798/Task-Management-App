import React from 'react'
import { LogOut, Slack } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';

const HeaderComponent = () => {
    let location = useLocation();
    const urlBarString = location?.pathname?.split("/").filter(d => d);
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser())
        navigate('/');
    };

    return (
        <header className="bg-[#6930CA] w-full mb-5">
            <main className="w-full lg:w-[70%] mx-auto flex items-center justify-between py-5 px-2">
                <Slack size={30} strokeWidth={2} className="text-[#ffff] cursor-pointer" onClick={() => navigate('/')} />
                <h1 className='flex text-2xl font-semibold text-[#ffff]'>
                    Task Management App
                </h1>
                {
                    urlBarString[0] === 'tasks' ?
                        <button onClick={logout} className=' text-[#FFFFFF] gap-2 flex items-center py-1 px-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105'>
                            <LogOut size={18} strokeWidth={2} className='' />
                            <p className='text-sm hidden lg:flex'>Log Out</p>
                        </button>
                        :
                        urlBarString[0] === 'signup' ?
                            <button onClick={() => navigate('/login')} className=' text-[#FFFFFF] gap-2 flex items-center py-1 px-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105'>
                                <p className='text-sm'>Log In</p>
                            </button> :
                            <button onClick={() => navigate('/signup')} className=' text-[#FFFFFF] gap-2 flex items-center py-1 px-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105'>
                                <p className='text-sm'>Sign Up</p>
                            </button>
                }

            </main>
        </header>
    )
}

export default HeaderComponent