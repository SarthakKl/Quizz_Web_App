import React from 'react'
import { performSignup } from '../utils/api_call'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignUp() {
    const navigate = useNavigate()
    const [errorCountered, showError] = useState('')
    const [verificationState, setVerificationState] = useState(false)
    async function handleSignUp(e) {
        e.preventDefault()
        const email = e.target[0].value
        const pass = e.target[1].value
        try {
            const data = await performSignup(email, pass)
            if (data.error) {
                return showError(data.error)
            }
            // navigate('/Login', {replace:true})
            setVerificationState(true)
        } catch (error) {
            console.log(error)
        }
    }
    const navigateToLogin = () => {
        navigate('/Login', { replace: true })
    }
    return (
        <div className='absolute top-0 right-0 left-0 bottom-0'>
            <div className='bg-white w-80 m-auto mt-36 px-3 py-8 drop-shadow-xl shadow-2xl rounded-lg loginFormFont'>
                {
                    verificationState &&
                    <div className='text-center '>Please verify you email address<br/>You can close this window</div>
                }
                {
                    !verificationState &&
                    <div>
                        <div className='text-center mb-2 login_title'>Sign Up</div>
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
                                placeholder='Password'
                                type='password'
                                className='px-2 py-1 mx-5 my-2 border border-slate-400 rounded'
                            />
                            <button
                                className='px-2 py-1 mx-5 my-2 rounded text-white auth_btns'
                            >
                                Sign Up
                            </button>
                        </form>
                        <div
                            className={`${errorCountered} === ''?inline-block:hidden text-center px-2 py-1 mx-5  text-red-600`}
                        >
                            {errorCountered}
                        </div>
                        <div className='flex justify-center'>
                            <span className='select-none'>Alread a member?</span>
                            <span className='underline select-none cursor-pointer' onClick={navigateToLogin}>Login</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SignUp