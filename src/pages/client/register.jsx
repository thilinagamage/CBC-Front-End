import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleRegister() {
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const payload = {
            firstName,
            lastName,
            email,
            phone,
            password
        };

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/', payload)
            .then((res) => {
                toast.success("Registration successful");
                navigate('/login');
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Registration failed");
                setLoading(false);
            });
    }

    return (
        <div className='w-full bg-blue-100 h-screen flex'>
            <div className='bg-[url(/login-page-image.png)] bg-center bg-cover w-[50%] h-full'></div>
            <div className='w-[50%] h-full bg-white flex justify-center items-center '>
                <div className='w-[450px] h-[700px]'>
                    <div className='bg-[url(/logo.png)] bg-cover bg-center h-[65px] w-[245px] mb-10'></div>
                    <h4 className='mb-2 text-3xl font-bold'>Sign Up</h4>
                    <p className='mb-10 text-md'>Create your account by entering your details</p>
                    <div className='flex flex-col'>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 bg-neutral-50 mb-4'
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 bg-neutral-50 mb-4'
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 bg-neutral-50 mb-4'
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 bg-neutral-50 mb-4'
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 bg-neutral-50 mb-4'
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className='rounded h-10 p-2 outline-1 -outline-offset-1 outline-blue-600 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 bg-neutral-50 mb-4'
                        />
                        <button
                            type="submit"
                            onClick={handleRegister}
                            className='bg-blue-500 text-md text-white px-2 py-3 w-full mt-6 rounded'
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>
                        <p className='mt-2'>Already have an account? &nbsp;
                            <span className='text-blue-700 font-semibold cursor-pointer'>
                                <Link to={'/login'}>Sign In</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
