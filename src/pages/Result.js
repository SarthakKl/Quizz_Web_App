import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuizAnalysis from '../components/QuizAnalysis'
import trophy from '../assets/trophy2.png'

function Result() {
  const location = useLocation()
  const score = location.state.score
  const questions = location.state.questions
  
  return (
      <div className='result'>
          <div className='pt-2'><img src={trophy} width='200px' className='block mr-auto ml-auto'/></div>
          <div className='flex flex-row justify-center text-2xl'>Congratuations! You have scored {score}</div>
          <div className='play_header'>Analysis</div>
          {
              questions.length > 0 &&
              <div className='flex flex-col space-y-9 items-center'>
                  {
                      questions.map((question, index) => {
                          return <QuizAnalysis question={question} index={index} key={index} />
                      })
                  }
              </div>

          }
      </div>
  )
}
export default Result