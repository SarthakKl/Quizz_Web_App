import React, { useEffect } from 'react'
import './Question.scss'

function Question({ question,
  selectOption,
  optionSelected,
  index,
  selectedOptionArr,
  changeQuestion,
  confirmFinish }) {
  const nav_options = Array(10).fill(0).map((e, i) => i + 1)

  function handleSelection(option) {
    if (optionSelected === option) {
      selectedOptionArr[index] = null
      return selectOption(null)
    }
    selectOption(option)
    selectedOptionArr[index] = option
  }
  useEffect(() => {
    selectOption(selectedOptionArr[index])
  }, [index]);

  return (
    <div className='flex flex-row'>
      <div style={{ width: '80%', marginLeft: '7px' }} >
        <div className='question'>{index + 1}) {question.question}</div>
        <div className='options'>
          <div
            className={optionSelected === question.option1 ? 'selected_option' : 'unselected_option'}
            onClick={() => handleSelection(question.option1)}
          >
            (A) {question.option1}
          </div>
          <div
            className={optionSelected === question.option2 ? 'selected_option' : 'unselected_option'}
            onClick={() => handleSelection(question.option2)}
          >
            (B) {question.option2}
          </div>
          <div
            className={optionSelected === question.option3 ? 'selected_option' : 'unselected_option'}
            onClick={() => handleSelection(question.option3)}
          >
            (C) {question.option3}
          </div>
          <div
            className={optionSelected === question.option4 ? 'selected_option' : 'unselected_option'}
            onClick={() => handleSelection(question.option4)}
          >
            (D) {question.option4}
          </div>
        </div>
      </div>
      <div className='w-1/5 p-2.5'>
        <div className='navigation_title'>Navigation</div>
        <div className='flex flex-wrap navigation'>
          {
            nav_options.map(item => <div
              onClick={() => changeQuestion(item - 1)}
              key={item}
              className = {`navOption ${index + 1 === item ? 'curr-ques': selectedOptionArr[item - 1] !== null ? 'answered-ques':''}`}
            > 
              {item}
            </div>)
          }
        </div>
        <button
          className='nav_finish bg-red-500 block ml-auto mr-auto mt-2'
          onClick={() => confirmFinish(true)}
          type='submit'
        >
          Submit
        </button>
      </div>
    </div>
  )
}
export default Question