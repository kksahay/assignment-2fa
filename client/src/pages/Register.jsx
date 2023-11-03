import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { generateURI } from '../util/generator.js';

function Register() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const {userInit} = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if(password !== confirmPassword) {
      setError({
        data: "Please make sure your password match"
      });
      return;
    }
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`, {
        email
      });
      if(data) {
        const uri = generateURI(email, data.secretKey);
        userInit({
          name,
          email,
          password,
          uri,
          secretKey: data.secretKey,
          newUser: true,
        });
        navigate('/validate');
      }
    } catch (error) {
      setError(error.response);
    }
  }

  return (
    <section className="h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Register
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="John Sharma" 
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@company.com" 
                            required
                            onChange={(e) => setEmail(e.target.value)}/>
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
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input 
                            type="confirm-password" 
                            name="confirm-password" 
                            id="confirm-password" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-sky-400 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Register
                      </button>
                      {error && (
                        <p className="text-sm font-light text-red-500">
                          {error.data}
                        </p>
                      )}
                      <p className="text-sm font-light text-gray-500">
                          Already have an account? <Link to="/login" className="font-medium text-primary-600 text-sky-400">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}
export default Register