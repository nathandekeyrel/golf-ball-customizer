import React, { Suspense, useEffect, useState } from 'react';
import '../styles/home.css';  
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall'; 
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();
  
  const [isInView, setIsInView] = useState({
    left: false,
    right: false
  });

  const handleModelClick = () => {
    navigate('/design');
  };

  useEffect(() => {
    const handleScroll = () => {
      const leftElement = document.querySelector('.scroll-animate-left');
      const rightElement = document.querySelector('.scroll-animate-right');

      if (leftElement && leftElement.getBoundingClientRect().top <= window.innerHeight * 0.8) {
        setIsInView(prev => ({ ...prev, left: true }));
      } else {
        setIsInView(prev => ({ ...prev, left: false }));
      }

      if (rightElement && rightElement.getBoundingClientRect().top <= window.innerHeight * 0.8) {
        setIsInView(prev => ({ ...prev, right: true }));
      } else {
        setIsInView(prev => ({ ...prev, right: false }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="opacity-0 transition-opacity duration-700 ease-in-out hover:opacity-100 overflow-x-hidden">
      <div className="w-full h-screen flex flex-col items-center justify-between relative">
        {/* Video at the top of the page */}
        <div className="video-container">
          <video autoPlay loop muted className="video-background">
            <source src="/images/golfvid.mp4" type="video/mp4" />
          </video>

          <div className="text-overlay">
            <h1>Welcome to Golf Ball Customizer</h1>
            <p>Customize Your Golf Ball Now</p>
          </div>
        </div>

        {/*Slides in from the left on scroll EPICCCCCC*/}
        <div
          className={`scroll-animate-left transform ${isInView.left ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'} transition-all duration-700 ease-in-out`}
        >
          <div className="centered-content">
            <img src="/images/model.jpg" alt="Golf Ball" className="image" />
            <div className="paragraph">
              <p>
                Customize your golf ball with various patterns, colors, and logos. Whether you're looking for a personal touch or a unique design for a special occasion, we offer an easy-to-use platform to design your perfect golf ball.
              </p>
            </div>
          </div>
        </div>

        {/*Slides in from the right on scroll EPICCCCCC*/}
        <div
          className={`scroll-animate-right transform ${isInView.right ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'} transition-all duration-700 ease-in-out`}
        >
          <div className="centered-content">
            <div className="paragraph">
              <p>
                Looking to make a lasting impression? Our bulk custom golf balls are the perfect solution for businesses, events, tournaments, or golf teams. Whether you’re outfitting your corporate outing, creating personalized gifts, or promoting your brand, our high-quality golf balls can be customized with your logo, or design.
              </p>
            </div>
            <img src="/images/balllllls.png" alt="Golf Ball" className="image" />
          </div>
        </div>

        
        
        

        {/* 3D Model Canvas */}
        <div className="canvas-container w-full h-1/2 z-10 flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.0} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              
              <group onClick={handleModelClick} className="interactive-canvas">
                <GolfBall position={[0, 0, 0]} scale={1} />
              </group>
              <Environment preset="studio" />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={2}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Bouncing Arrow */}
        <div className="mt-10">
          <div className="text-center animate-bounce-arrow">
            <span className="text-4xl text-blue-500">↑</span>
          </div>
        </div>

        <h2 className="mt-8">CLICK ON THE BALL TO GET STARTED</h2>
      </div>

      <h2>    </h2>
      <h2>    </h2>
      <h2>    </h2>
      <h2>    </h2>
      <h2>    </h2>
      <h2></h2>
      
      <h1>The End</h1>
    </div>
  );
};

export default Home;
