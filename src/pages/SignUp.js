import React from 'react'
import { performSignup } from '../utils/api_call'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'

function SignUp() {
    const navigate = useNavigate()
    const [errorCountered, showError] = useState('')
    async function handleSignUp(e){
        e.preventDefault()
        const email = e.target[0].value
        const pass = e.target[1].value
        try {
            const data = await performSignup(email, pass)
            if(data.error){
                return showError(data.error)
            }
            navigate('/', {replace:true})
        } catch (error) {
            console.log(error)
        }   
    }
  return (
    <div className='absolute top-0 right-0 left-0 bottom-0 bg-white'>
        <div className='bg-sky-50 w-80 m-auto mt-36 px-3 py-8  drop-shadow-xl'>
                <div className='text-center mb-2 font-bold'>Sign Up</div>
                <form 
                    onSubmit={handleSignUp}
                    className='flex flex-col rounded'>
                        <input 
                            placeholder='Email' 
                            required
                            type='email'
                            className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                        />
                        <input 
                            required
                            placeholder = 'Password'
                            type='password'
                            className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                        />
                        <button 
                            className='px-2 py-1 mx-5 my-2 rounded bg-slate-400 text-white'
                        >
                            Sign Up
                        </button>
            </form>
            <div 
                className = {`${errorCountered} === ''?inline-block:hidden text-center px-2 py-1 mx-5  text-red-600`}
            >
                    {errorCountered}
            </div>
        </div>
    </div>
  )
}

export default SignUp