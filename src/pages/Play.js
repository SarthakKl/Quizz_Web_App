import axios from 'axios'
import React from 'react'
import {useEffect, useState} from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Question from '../components/Question'
import Countdown from 'react-countdown'
import ClipLoader from "react-spinners/ClipLoader"

import {fetchQuestion, updateSelection} from '../utils/api_call'


function Play() {
  const  [searchParams]= useSearchParams() 
  const category = searchParams.get('category')
  const catIndex = searchParams.get('catIndex')
  const difficulty = searchParams.get('difficulty')
  const navigate = useNavigate()
  const location = useLocation()
  const [questions, setQuestions] = useState([])
  const [errorEncountered, setPageError] = useState(false)
  const [currIndex, changeIndex] = useState(0)
  const [optionSelected, changeSelection] = useState('')
  const [selectedOptionArr, changeArr] = useState([])
  const [quizId, setQuizid] = useState(0)
  const [timeRem, setTimer] = useState(0)
  const [loading, setLoading] = useState(true);
  const [finishConfirmation, setFinishState] = useState(false)

  const fetchQuestions = async () =>{
    setLoading(true)
    const data = await fetchQuestion(category, catIndex, difficulty)
    setLoading(false)
    if(data.error != null){
      console.log(data.error)
      return setPageError(true)
    }
    setQuestions(data.questions.questions)
    setQuizid(data.questions._id)

    const endTime = new Date(data.questions.end_time)
    const timeStamp = endTime.getTime()
    setTimer(timeStamp)

    if(data.questions.questions.length > 0){
      for(let i = 0; i < 10; i++){
        selectedOptionArr.push(data.questions.questions[i].selected_option)
      } 
    }
  }
  const navigate_questions = async (newIndex) => {
    const index = currIndex
    changeIndex(newIndex)
    try{
      console.log("navigate_questions" + quizId, questions[index]._id)
      const data = await updateSelection(optionSelected, 
                                   questions[index]._id,
                                   quizId,
                                   false)
      if(data.error != null){
        console.log(data.error)
        return setPageError(data.error)
      }
    }
    catch(error){
      console.log(error)
      return setPageError(error.message)
    }
  }
  const onFinish = async () => {
    try {
      setLoading(true)
      const data = await updateSelection(optionSelected,
                                         questions[currIndex]._id,
                                         quizId,
                                         true)
      setLoading(false)
      if(data.error != null)
        return setPageError(data.error)
      
      navigate('/Result', {
        state:{
          score:data.score,
          questions:data.questions
        },
        replace:true
      })
    } 
    catch (error) {
      console.log(error)
      return setPageError(error.message)
    }
  }

  useEffect(()=>{
    if(location.state == null){
      navigate('/', {replace: true})
    }
    else{
      // console.log(catIndex, category, difficulty)
      const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY)
      axios.defaults.headers['authorization'] = token
      fetchQuestions()
    }
  },[])

  return (
    <div className = "mt-16 absolute left-0 right-0  z-50">
      {
        loading && 
        <div
          style={{
            width:'100wv',
            height:'100vh',
            display:'grid',
            alignItems:'center',
            justifyContent:'center'
            // background:'red'
          }}
        >
          <ClipLoader color='red' loading={loading} size={150} />
        </div>
      }
      {
        questions.length > 0 && !loading && !errorEncountered &&
        <div className='bg-white m-2 h-full rounded-xl px-2 py-8'>
          <div className='play_header'>
            <span className='quiz_title'>{category}</span>
            <div className='timer px-3.5 rounded bg-red-500'>
              {timeRem && <Countdown date={parseInt(timeRem)} onComplete = {onFinish}/>}
            </div>
          </div>
          <Question 
            question = {questions[currIndex]} 
            selectOption = {changeSelection}
            optionSelected = {optionSelected}
            index = {currIndex}
            selectedOptionArr = {selectedOptionArr}
            changeQuestion = {navigate_questions}
            confirmFinish = {setFinishState}
          />
          <div className='toggle_btn'>
            <button 
              className='prev_btn ml-2' 
              style={{visibility:(currIndex===0?'hidden':'visible')}}
              onClick={()=>changeIndex(currIndex - 1)}
            >
              Prev
            </button>
            {
              currIndex < 9 ? (<button className='next_btn' onClick={()=>navigate_questions(currIndex + 1)}>
                                Next
                              </button>): 
                              (<button className = 'next_btn' onClick={()=>setFinishState(true)}>
                                Finish
                              </button>)
            }
          </div>
          {
            finishConfirmation &&
            <>
              <div className = 'resume-modal-wrapper'></div>
              <div className='resume-modal'>
                <h2>Are you sure you want to finish the quiz?</h2>
                <button 
                  className = 'resume_no'
                  onClick={()=>setFinishState(false)}
                >
                  No
                </button>
                <button 
                  className = 'resume_yes'
                  onClick={onFinish}
                >
                  Yes
                </button>
              </div>
            </>
          }
        </div>
      }
    </div>
  )
}
export default Play












    /* if(data.response_code != 0){
    //     console.log('invalid token')
    //     const newToken = await getSessionToken()
    //     if(newToken.response_code != 0)
    //         setPageError(true)
    //     else{
    //       setSessionToken(data.token)
    //       localStorage.setItem(tokenKeyLocal, JSON.stringify(sessionToken))
    //       fetchQuestions(newToken.token)
    //     }      
    // }
    // console.log(data)
    // if(data.response_code != 0){
    //   return setPageError(true)
    // }
    // console.log(data.results)
    // setQuestions(result)
    // console.log(result)

    // const fetchSessionToken = async () =>{
  //   const localToken = localStorage.getItem(tokenKeyLocal)
  //   // console.log(localToken)
  //   if(!localToken){
  //       const data = await getSessionToken()
  //       if(data.response_code == 0){
  //           setSessionToken(data.token)
  //           localStorage.setItem(tokenKeyLocal, JSON.stringify(sessionToken))
  //       }
  //       else
  //         return setPageError(true)
  //   }
  //   else
  //     setSessionToken(localToken)
  //   fetchQuestions(localToken)
  // }*/