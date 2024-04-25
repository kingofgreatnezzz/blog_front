"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Alike_Angular } from 'next/font/google';


const Page = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  })

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState('')
  const [error, setError] = useState({passwordError: '', shortPassword: '', somethinWrong: ''})

  const {name, email, password, re_password} = formData

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name] : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const validationError = {}
    try{

      if(password.length < 7){
        validationError.password = 'Passwords must be at least 8 characters'
      }

      if(password != re_password){
        validationError.password = 'Passwords do not match'
      }

      if(Object.keys(validationError).length > 0){
        setError({...error, passwordError: validationError.password, shortPassword:validationError.tooshort})
      }
      else{
        setError({...error, passwordError: '', shortPassword: ''})
      setLoading(true)
      const config = {
        headers : {
            'Content-Type': 'application/json',
        }
        }
      const body = JSON.stringify({name, email, password, re_password})

        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/`, body, config)
        .then(res => {
          setSuccess(true)
          setLoading(false)

        })
        .catch(error => {
          setFail(error.response.data.email[0])
          setLoading(false)
        })

      }
    }catch(error){
      setLoading(false)
      setError({...error, somethinWrong: error})
    }
  }
  
  useEffect(() => {
    if(success){
      router.push('/login')
    }
  },[success])
  
  return (
    <div className="h-screen bg-gray-800 ">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
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
            Password Reset
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Please provide a new password
          </p>

          {
              error.somethinWrong ? <p className='text-center mt-3' style={{color: 'red', fontSize: '.7rem', fontWeight:'500', textAlign: 'center'}}>Sorry, somthing went wrong</p> : ''
          }
          <form onSubmit={handleSubmit}>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="New Password"
                aria-label="Password"
                name='password'
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Confirm New Password"
                aria-label="re_assword"
                name='re_password'
                value={re_password}
                onChange={handleChange}
                required
              />
            </div>
            {
              error.passwordError ? <b style={{color: 'red', fontSize: '.7rem', fontWeight:'500'}}>{error.passwordError}</b> : ''
            }
            <div className="flex items-center justify-between mt-4">
              <button type='submit' className="px-6 w-full p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {
                  loading ? 'creating...' : 'Reset Password'
                }
              </button>
            </div>
          </form>
        </div>

        <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-200">
            Have an account?
          </span>

          <Link
            href={""}
            class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Page