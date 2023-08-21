import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import axios from 'axios'
import { checkIncompleteQuiz, deleteIncompleteQuiz } from '../utils/api_call'
import {motion} from 'framer-motion'

function Homepage({loggedIn}) {
  const navigate = useNavigate()
  const [choosingDiff, setDiff] = useState(false)
  const [category, setCategory] = useState('')
  const [catIndex, setCatIndex] = useState(0)
  const [diff, changeDiff] = useState(0)
  const [btnDisabled, setBtnState] = useState(true)
  const [difficulty, setDifficulty] = useState('')
  const [errorFound, setPageError] = useState({found:false, msg:''})
  const [resumeDialogState, setResumeDialogState] = useState(false)
  const [incompQuizId, setIncompQuizId] = useState(0)

  const setOption = (option) => {
    console.log(option)
    if (option === diff) {
      setBtnState(true)
      changeDiff(0)
      return
    }
    setBtnState(false)
    changeDiff(option)
  }
  const handleSubmit = () => {
    const difficulty = (diff === 1 ? 'easy' : (diff === 2 ? 'medium' : 'hard'))
    navigate(`/Play?category=${category}&catIndex=${catIndex}&difficulty=${difficulty}`,
      { state: 1 })
  }
  const incompleteQuizInfo  = async () =>{
    try {
      const check = await checkIncompleteQuiz()
      console.log('checking incomplete quiz info', check)
      if(check.error)
        return setPageError({found:true, msg:check.error})

      if(check.quiz_details){
        setResumeDialogState(true)
        setCategory(check.quiz_details.category)
        setDifficulty(check.quiz_details.difficulty)
        setCatIndex(check.quiz_details.cat_index)
        setIncompQuizId(check.quiz_details._id)
      } 
    } catch (error) {
      console.log(error)
      return setPageError({found:true, msg:error})
    }
  }
  
  const quizCategories = ['General Knowledge', 'Books', 'Film', 'Music', 'Musicals & Theatres',
    'Television', 'Video Games', 'Board Games', 'Science & Nature', 'Computers',
    'Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art',
    'Celebrities', 'Animals', 'Vehicles', 'Gadgets', 'Cartoon & Animation']

  const onCancel = async () => {
    setResumeDialogState(false)
    const response = await deleteIncompleteQuiz(incompQuizId)

    if(!response.error)
      return setPageError(response.error)
  }
  const onResume = () => {
    navigate(`/Play?category=${category}&catIndex=${catIndex}&difficulty=${difficulty}`,
      { state: 1 })
  }
  const pageVariants = {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-100%' },
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };
  useEffect(() => {
    incompleteQuizInfo()

    return () => {
      setCatIndex(0)
      setDifficulty('')
      setCategory('')
    }
  }, []);
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className='main-wrapper'
      >
        <div className='CategoriesDiv'>
          <ul className='Categories'>
            {
              quizCategories.map((category, index) => {
                return <Categories
                  notLogin={!loggedIn}
                  category={category}
                  index={index}
                  setCatIndex={setCatIndex}
                  setCategory={setCategory}
                  setDiff={setDiff}
                  key={index + 1}
                />
              })
            }
          </ul>
        </div>
        
      </motion.div>
      {
        resumeDialogState &&
        <>
          <div className = 'resume-modal-wrapper'></div>
          <div className='resume-modal'>
            <h2>Do you want to resume previous quiz?</h2>
            <button 
              className = 'resume_no'
              onClick={onCancel}
            >
              No
            </button>
            <button 
              className = 'resume_yes'
              onClick={onResume}
            >
              Yes
            </button>
          </div>
        </>
      }
      {
        choosingDiff && !resumeDialogState &&
        <>
          <div className="difficulty-modal-wrapper"></div>
          <div className='difficulty-modal'>
            <div className='text-center text-xl  difficulty_header'>Select Difficulty</div>
            <ul className='DifficultyList'>
              <li
                onClick={() => setOption(1)}
                className={diff === 1 ? 'selected' : 'unselected'}
                unselectable='on'
              >
                Easy
              </li>
              <li
                onClick={() => setOption(2)}
                className={diff === 2 ? 'selected' : 'unselected'}
                unselectable='on'
              >
                Medium
              </li>
              <li
                onClick={() => setOption(3)}
                className={diff === 3 ? 'selected' : 'unselected'}
                unselectable='on'
              >
                Hard
              </li>
            </ul>
            <button className='CancelDiff' onClick={() => {
              changeDiff(0)
              setBtnState(true)
              setDiff(false)
            }}>
              Cancel
            </button>
            <button
              className='select_btn'
              disabled={btnDisabled}
              onClick={handleSubmit}
            >
              Select
            </button>
          </div>
        </> 
      }
    </>
  )
}

export default Homepage