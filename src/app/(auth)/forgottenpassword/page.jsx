"use client"
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page() {

  const [formData, setFormData] = useState({'email': ''})
  const [resetSend, setresetSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetError, setresetError] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


0
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const {email} = formData

  const router  = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault()
  try{
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({email});

      setLoading(true)
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/reset_password/`, body, config) 
      .then(res => {
        setresetSend(true)
        setLoading(false)
        setError('')
        setresetError('')
      })
      .catch(error => {
        if(error.response && error.response.data){
            setresetError(error.response)
            setLoading(false)
            setError('')
        }
        if(!error.response){
         setError("Error: Couldn't connect to the server. Please check your internet connection")
        } 
        setLoading(false)
      })
  }catch(error){
    setMessage("Sorry, something went wrong")
    setLoading(false)
  }}
  useEffect(() => {
    let timer;
    if(resetSend){
      setMessage("Reset email sent successfully")
      timer = setTimeout(() => {
        setMessage("")
        router.push('/')
      }, 5000)
    }
    return () => {
      //clear
      clearTimeout(timer);
    }
  },[resetSend])


  // console.log(resetError.data?.[0])
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
            {
                error != '' ? <p style={{color: 'red', fontSize: '.650rem', padding:'.2rem', fontWeight:'500', lineHeight:'.7rem'}}>{error}</p> : ''
            }
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Forgot Password
          </h3>
            
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Enter your account's email
          </p>
          <p style={{fontSize: '.7rem', color:'#dc93a0'}} className="mt-1 text-center text-gray-500 dark:text-gray-400">
            You will recieve an email with link to reset your password
          </p>

          <form onSubmit={handleSubmit}>
          {
            resetError?.data ? <b style={{color: 'red', fontSize: '.650rem', fontWeight:'500'}}>{resetError?.data?.[0]}</b> : ''
          }

        {
              message != '' ? <b style={{color: `${resetSend ? 'green': 'red'}`, fontSize: '.650rem', fontWeight:'500'}}>{message}</b> : ''
          }
       

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Enter your valid email Address"
                aria-label="Email Address"
                name='email'
                value={email}
                onChange={handleChange}
                required={true}
              />
            </div>


            <div className="flex items-center justify-between mt-4">
              <button type='submit' disabled={loading || resetSend ? true : false} className="px-6 w-full p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {loading ? 'Sending...' : 'Send' }
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
