import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import axios from 'axios'
import ProfilePlaceHolder from '../assets/profile_placeholder.png'
import { checkIncompleteQuiz, deleteIncompleteQuiz } from '../utils/api_call'
import Logo from '../assets/Logo5.svg'


function Homepage() {
  const navigate = useNavigate()
  const [choosingDiff, setDiff] = useState(false)
  const [category, setCategory] = useState('')
  const [catIndex, setCatIndex] = useState(0)
  const [diff, changeDiff] = useState(0)
  const [btnDisabled, setBtnState] = useState(true)
  const [difficulty, setDifficulty] = useState('')
  const [token, setToken] = useState('')
  const [notLogin, setLoginState] = useState(true)
  const [profileClicked, setProfileBtnState] = useState(false)
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
  const onLogout = () => {
    axios.defaults.headers['authorization'] = null
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN_KEY)
    setToken('')
    console.log(localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY))
    setLoginState(true)
  }
  const incompleteQuizInfo  = async () =>{
    try {
      const check = await checkIncompleteQuiz()
      console.log('checking incomplete quiz info', check)
      if(check.error)
        return setPageError({found:true, msg:check.error})

      if(check.quiz_details){
        // console.log(quiz)
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
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY)) {
      const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY)
      setToken(token)
      console.log(token)
      axios.defaults.headers['authorization'] = token
      setLoginState(false)
    }
    incompleteQuizInfo()

    return () => {
      setCatIndex(0)
      setDifficulty('')
      setCategory('')
    }
  }, []);
  return (
    <div>
      <div className='header'>
        <img 
          src = {Logo}  width='90px'
          className='ml-2' 
        />
        {
          notLogin &&
          <ul className="header_right mr-2">
            <li
              className='px-2 py-1 rounded-lg mr-0.5'
              onClick={() => navigate('/Login')}
            >
              Login
            </li>
            <li
              className='px-2 py-1 rounded-lg bg-sky-500 text-white'
              onClick={() => navigate('/SignUp')}
            >
              Sign Up
            </li>
          </ul>
        }
        {
          !notLogin &&
          <div className='relative'>
            <img
              src={ProfilePlaceHolder}
              className='w-9 h-8 rounded-full mr-2'
              onClick={() => setProfileBtnState(!profileClicked)}
            />

            {
              profileClicked &&
              <div
                className='absolute right-0 p-2  rounded shadow-cyan-500/50 shd'
                onClick={onLogout}
              >
                Logout
              </div>
            }
          </div>
        }
      </div>
      <div className='CategoriesDiv'>
        <ul className='Categories'>
          {
            quizCategories.map((category, index) => {
              return <Categories
                notLogin={notLogin}
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
        {
          choosingDiff && !resumeDialogState &&
          <div className='outer_difficulty'>
              <div className='DifficultyModal'>
                <div className='text-center text-xl  difficulty_header'>Select Difficulty</div>
                <ul className='DifficultyList'>
                  <li
                    onClick={() => setOption(1)}
                    className={diff == 1 ? 'selected' : 'unselected'}
                    unselectable='on'
                  >
                    Easy
                  </li>
                  <li
                    onClick={() => setOption(2)}
                    className={diff == 2 ? 'selected' : 'unselected'}
                    unselectable='on'
                  >
                    Medium
                  </li>
                  <li
                    onClick={() => setOption(3)}
                    className={diff == 3 ? 'selected' : 'unselected'}
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
          </div>
        }
        {
          resumeDialogState &&
          <div className = 'resume_dialog'>
            <div className='inner_resume'>
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
          </div>
        }
      </div>
    </div>
  )
}

export default Homepage