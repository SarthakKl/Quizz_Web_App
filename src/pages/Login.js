import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { performLogin } from '../utils/api_call'
import {useState} from 'react'

function Login() {
    const [errorCountered, showError] = useState('')
    const navigate = useNavigate()
    async function handleLogin(e){
        e.preventDefault()
        const email = e.target[0].value
        const pass = e.target[1].value
        try {
            const data = await performLogin(email, pass)
            if(data.error){
                return showError(data.error)
            }
            // console.log(data.user)
            navigate('/', {replace:true})
        } 
        catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='absolute top-0 right-0 left-0 bottom-0 bg-white'>
        <div className='bg-sky-50 w-80 m-auto mt-36 px-3 py-8  drop-shadow-xl'>
            <form 
                className='flex flex-col rounded'
                onSubmit={handleLogin}>
                    <input 
                        placeholder='Email' 
                        required
                        type='email'
                        className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                    />
                    <input 
                        placeholder = 'Password'
                        required
                        type='password'
                        className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                    />
                    <button 
                        className='px-2 py-1 mx-5 my-2 rounded bg-slate-400 text-white'
                    >
                        Login
                    </button>
            </form>
            <div 
                className = {`${errorCountered} === ''?inline-block:hidden text-center px-2 py-1 mx-5  text-red-600`}
            >
                    {errorCountered}
            </div>
            <div className='flex justify-center'>
                <Link 
                    to='/SignUp' 
                    className='underline'
                > 
                    Didn't have an account? Sign Up
                </Link>    
            </div>
            
        </div>
    </div>
  )
}

export default Login