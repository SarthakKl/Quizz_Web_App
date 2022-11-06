import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resendVerificationMail, verifyUser } from '../utils/api_call'
import invalid from '../assets/invalid.png'
import correct from '../assets/correct.png'


function Verify() {
    const [verificationMsg, setVerificationMsg] = useState('Verifying email....')
    const[verificationState, setVerificationState] = useState(0)
    const navigate = useNavigate()
    const params = useParams()
    const token = params.token
    const userId = params.id

    const handleTryAgain = async ()=>{
         try {
            setVerificationMsg('Verifying email....')
            setVerificationState(0)
            const response = await resendVerificationMail(userId)

            if(response?.error){
                setVerificationMsg(response.error)
                return setVerificationState(2)
            }
            setVerificationMsg('An email has been send to your email. You can close this window')
         } catch (error) {
            console.log(error)
         }
    }
    const redirect = () => {
        navigate('/', {replace:true})
    }
    useEffect(()=>{
        const verifyingUser = async () => {
            const response = await verifyUser(userId, token)
            console.log(response)
            if(response?.error){
                setVerificationState(2)
                return setVerificationMsg(response.error)
            }
            localStorage.setItem(process.env.REACT_APP_USER_TOKEN_KEY, response.newToken)
            setVerificationState(1)
            setVerificationMsg(response.message);
            delay(2000).then(() => redirect());
        }
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        verifyingUser()
      
    }, [])
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-white px-5 py-5 '>
        {
            verificationState != 0 &&
            <img className = 'block ml-auto mr-auto mt-8 mb-2' src = {verificationState == 1 ? correct:invalid} width = '300px' height = '300px'/>
        }
        <div className='text-center'>
            {verificationMsg}  
            {
                verificationState == 2 &&
                <span className='underline text-blue-500 cursor-pointer' onClick={handleTryAgain}>Try again</span>
            }
            {
                verificationState == 2 &&
                <div className='text-blue-500 cursor-pointer text-center' onClick={redirect}>Homepage{'->'}</div>
            }
        </div>
    </div>
  )
}

export default Verify