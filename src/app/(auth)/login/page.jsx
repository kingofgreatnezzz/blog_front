"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page() {

  const [formData, setFormData] = useState({'email': '', 'password': ''})
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError ]= useState('')
  const [token, setToken] = useState([])


  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const {email, password} = formData

  const router  = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault()
  try{
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({email, password});

      setLoading(true)

      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/jwt/create/`, body, config) 
      .then(res => {
        setLoginSuccess(true)
        setLoading(false)
        setToken(res.data.access)
        localStorage.setItem('token', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
      })
      .catch(error => {
        setLoginError(error.response)
        setLoading(false)
      })
  
  }catch(error){
    setLoading(false)
  }
  }
  useEffect(() => {
    if(token.length > 100){
      router.push('/')
    }
  },[token])

  
  return (
    <div className="h-screen bg-gray-800">
      <div className="w-full max-w-sm mx-auto overflow-hidden  bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <Image
              width={500}
              height={500}
              className="w-auto h-7 sm:h-8"
              src={"https://merakiui.com/images/logo.svg"}
              alt=""
            />
          </div>
          
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back!
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          {
              loginError?.data?.detail == 'No active account found with the given credentials'? <b style={{color: 'red', fontSize: '.8rem', fontWeight:'500'}}>Invalid email or password</b> : ''
          }
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                required
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                required
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link
                href={"/forgotpassword"}
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </Link>

              <button type="submit" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {loading ? 'checking...' : 'Login'}
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?
          </span>

          <Link
            href={"/signup"}
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
