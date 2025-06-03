import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    


    function handleLogin(){
         setLoading(true)
         axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login', {
        email: email,
        password: password
    }).then(
        (response) => {
            console.log("Login successful", response.data);
            toast.success("Login successful")
            localStorage.setItem('token', response.data.token)

            const user = response.data.user
            if(user.role === 'admin'){
                navigate('/dashboard/')
            }else{
                navigate('/')
            }
            setLoading(false)
        }
    ).catch(
        (error) => {
            console.log("Login failed", error.response.data);
            toast.error(error.response.data.message || "Login Faild")
            setLoading(false)
        }
    )

    }
    return (
        <div className='w-full bg-blue-100 h-screen flex'>
            <div className='bg-[url(/login-page-image.png)] bg-center bg-cover w-[50%] h-full'></div>
            <div className=' w-[50%] h-full bg-white flex justify-center items-center '>
                <div className='w-[450px] h-[600px] '>
                    <div className='bg-[url(/logo.png)] bg-cover bg-center h-[65px] w-[245px] mb-10'></div>
                    <h4 className='mb-2 text-3xl font-bold'>Sign In</h4>
                    <p className='mb-10 text-md'>Welcome back ! Please enter your details</p>
                    <div className='flex flex-col'>
                        <input onChange={(e)=>setEmail(e.target.value)} type="email" className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 
                        focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800  bg-neutral-50 radius-12 mb-5' placeholder='Email' />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 
                        focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800  bg-neutral-50 radius-12 mb-5' placeholder='Password' />
                        <div className='flex justify-between'>
                            <div className='flex '>
                                <input type="checkbox" className=' mr-2' name="" id="" />
                                <label htmlFor="">Remember me</label>
                            </div>
                            <p>Forgot Password?</p>

                        </div>
                        <button type="submit" onClick={handleLogin} className='bg-blue-500 text-md text-white px-2 py-3 w-full mt-12 rounded'> 
                            {
                                loading?"Loading...":"Sign In"
                            }
                        </button>
                        <p className='mt-2'>Don't have an account? &nbsp; <span className='text-blue-700 font-semibold cursor-pointer'> 
                            <Link to={'/register'}>Sign Up</Link></span></p>

                    </div>
                </div>
            </div>

        </div>
    )
}
