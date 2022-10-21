import React from 'react'
import { useNavigate } from 'react-router-dom'

function Categories({notLogin, category, index, setCatIndex, setCategory, setDiff}) {
  const navigate = useNavigate()
  const handleClick = () => {
    console.log(notLogin)
    if(notLogin){
      return navigate('/Login')
    }
    setCategory(category)
    setCatIndex(index + 9)
    setDiff(true)
  }
  return (
    <li className='px-10' 
        onClick={handleClick}
        unselectable = "on"
      >
        {category}
    </li>
  )
}

export default Categories
