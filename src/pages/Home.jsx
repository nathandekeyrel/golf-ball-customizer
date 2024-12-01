import React, { Suspense } from 'react';
import '../styles/home.css';  
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall'; 
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();

  const handleModelClick = () => {
    navigate('/design');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between relative">
      {/* Video at the top of the page */}
      <div className="video-container">
        <video autoPlay loop muted className="video-background">
          <source src="/images/golfvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="text-overlay">
          <h1>Welcome to Golf Ball Customizer</h1>
          <p>Customize Your Golf Ball Now</p>
        </div>
      </div>

      <div className="centered-content">
        <img src="/images/model.jpg" alt="Golf Ball" className="image" />
        <div className="paragraph">
          <p>
            Customize your golf ball with various patterns, colors, and logos. Whether you're looking for a personal touch or a unique design for a special occasion, we offer an easy-to-use platform to design your perfect golf ball.
          </p>
        </div>
      </div>

       <div className="centered-content">
       <div className="paragraph">
          <p>
            Customize your golf ball with various patterns, colors, and logos. Whether you're looking for a personal touch or a unique design for a special occasion, we offer an easy-to-use platform to design your perfect golf ball.
          </p>
        </div>
        <img src="/images/core.png" alt="Golf Ball" className="image" />
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
      <h2 className="mt-8">CLICK ON THE BALL TO GET STARTED</h2>
    <h2>     </h2>
    <h2>     </h2>

    </div>
    
  );
};

export default Home;
