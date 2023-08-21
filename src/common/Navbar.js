import axios from 'axios'
import './Navbar.scss'
import {FaUserAlt} from 'react-icons/fa'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Navbar = ({loggedIn, setLoginState}) => {
    const [profileClicked, setProfileBtnState] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(loggedIn)
    const handleLogin = () => {
        if(location.pathname === '/Login')
            return null;
        navigate('/Login')
    }
    const onLogout = () => {
        axios.defaults.headers['authorization'] = null
        localStorage.removeItem(process.env.REACT_APP_USER_TOKEN_KEY)
        console.log(localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY))
        setLoginState(false)
        setProfileBtnState(false)
    }
    return (
        <div className = 'navbar'>
            <div className='nav-logo'><span>Q</span>uizz</div>
            <div>
                {
                    !loggedIn &&
                    <button className='auth-btn' onClick={handleLogin}>Login</button>
                }
                {
                    loggedIn && location.pathname !== '/Play' &&
                    <FaUserAlt className = 'user-logo' onClick={()=>setProfileBtnState(!profileClicked)}/>
                }
            </div>
            {
              profileClicked &&
              <div
                className='absolute right-5 p-2  top-14 rounded shadow-cyan-500/50 shd'
                onClick={onLogout}
              >
                Logout
              </div>
            }
        </div>
    )
}
export default Navbar;