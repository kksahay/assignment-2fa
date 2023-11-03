import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode';
import axios from "axios";

function Validator() {
    const {userData} = useAuth();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [btnEnable, setBtnEnable] = useState(false);
    const [error, setError] = useState(null);
    const canvasRef = useRef();
    
    function handleInput(e) {
        const newValue = e.target.value;
        if(newValue.length >= 6) {
            setBtnEnable(true);
        } else {
            setBtnEnable(false);
        }
        if(newValue.length <= 6) {
            setOtp(newValue);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if(userData.newUser) {
                const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/validate`, {
                    ...userData,
                    otp,
                })
                if(data) {
                    navigate('/login');
                }
            } else {
                const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/validate`, {
                    secretKey: userData.secretKey,
                    otp,
                })
                if(data) {
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.response);
        }
    }

    useEffect(() => {
        if(!userData) {
            navigate('/');
        }
        if(userData && userData.newUser) {
            QRCode.toCanvas(canvasRef.current, userData.uri, (error) => {
                if (error) {
                    console.error('Error generating QR code:', error);
                }
            });
        }
    }, [])
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {userData && userData.newUser && (
                            <div>
                                <p className="text-sm font-light text-gray-50 text-center mb-2">Use Google Authenticator App to Scan</p>
                                <div className="flex justify-center">
                                    
                                    <canvas ref={canvasRef} />
                                </div>
                            </div>
                        )}
                        <div>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <p className="text-xs font-light text-gray-200">Enter the 6 digit PIN</p>
                                <input
                                    type="number" 
                                    placeholder="XXX-XXX" 
                                    value={otp}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={handleInput}
                                />
                                <button 
                                    type="submit" 
                                    className="w-full bg-sky-400 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-80 disabled:cursor-not-allowed disabled:bg-red-500"
                                    disabled={!btnEnable}
                                >
                                Verify
                                </button>
                                {error && (
                                <p className="text-sm font-light text-red-500">
                                    {error.data}
                                </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Validator