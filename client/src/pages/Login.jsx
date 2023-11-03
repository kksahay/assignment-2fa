import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const {userInit} = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, {email, password});
      if(data) {
        userInit({
          email,
          password,
          secretKey: data.secretKey,
          newUser: false,
        });
        navigate('/validate');
      }
    } catch (error) {
      setError(error.response);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Login
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@company.com" 
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                      <button 
                          type="submit" 
                          className="w-full bg-sky-400 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            Login
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
    </section>
  )
}
export default Login