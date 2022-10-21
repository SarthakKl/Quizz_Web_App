import React from 'react'

function QuizAnalysis({question, index}) {
  const correctOption = question.correct_option
  const wrongOption = (question.correct_option != question.selected_option ? question.selected_option:'')

  const checkOption = (option) => {
    if(option == correctOption){
        return 'selected_option'
    }
    if(option == wrongOption){
        return 'wrong_option'   
    }
    return 'unselected_option'
  }
  return (
    <div className= 'w-4/5 ml-2'>
        <div className = 'question'>{index + 1}) {question.question}</div>
        <div className = 'options'>
          <div 
            className = {checkOption(question.option1)}
          >
            (A) {question.option1}
          </div>
          <div 
            className = {checkOption(question.option2)}
          >
            (B) {question.option2}
          </div>
          <div 
            className = {checkOption(question.option3)}
          >
            (C) {question.option3}
          </div>
          <div 
            className = {checkOption(question.option4)}
          >
            (D) {question.option4}
          </div>
        </div>
    </div>
  )
}

export default QuizAnalysis