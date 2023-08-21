import react, { useEffect, useState } from 'react'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Home.scss';
import heroImage from '../assets/heroImage1.png'
import sportsImg from '../assets/sports.png'
import shapesImg from '../assets/shapes.png'
import scienceImg from '../assets/science.png'
import Navbar from '../common/Navbar';
import {easeOut, motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const text = "Unleash Your Quiz Prowess: Play, Learn, Conquer!"
    const navigate = useNavigate()
    const commonAttr = [
        {src:heroImage, className:'hero-img'},
        {src:sportsImg, className:'sports'},
        {src:shapesImg, className:'shapes'},
        {src:scienceImg, className:'science'}
     ]
    // const controls = useAnimation()
    const variant = {
        show:{
            scale:0,
        },
        hidden:{
            scale:[0,1.2,1],
            transition:{ease:easeOut, duration:1, delay:0.5}
        }
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
        setIsVisible(true); 
        const hideTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
      
          // Clear the timeout when the component is unmounted
        return () => {
            clearTimeout(hideTimeout);
        };
    }, []);
    return (
    <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className = 'home-bg'
    >
        {/* <Navbar/> */}
        <div className='content'>
            <div className='left-div'>
                <div className={`text-animation ${isVisible ? 'visible' : ''}`}>
                    {
                        text.split('').map((char, index) => (
                        <span 
                            key={index} 
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
                <div className='subheading'>Dive into an Enthralling World of Quizzes: Explore Various Categories and Challenge Yourself!</div>
                <button className = 'play-now-btn' onClick={() => navigate('/quiz')}>PLAY NOW</button>
            </div>
            <div className='right-div'>
                {
                    commonAttr.map((i, index)=>{
                        return <motion.img 
                        src = {i.src}
                        className={i.className}
                        alt = '' 
                        drag
                        dragConstraints={{
                            top:-5,
                            right:-5,
                            left:-5, 
                            bottom:-5
                        }}
                        variants={variant}
                        initial="show"
                        animate="hidden"
                        key={index}
                    />
                    })
                }
            </div>
        </div>
    </motion.div>
)}
export default Home;