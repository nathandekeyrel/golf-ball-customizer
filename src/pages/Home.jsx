import React, { Suspense } from 'react';
import '../styles/home.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall'; // Ensure GolfBall is a 3D model
import { useNavigate } from 'react-router-dom'; // To handle navigation

const Home = () => {
  const navigate = useNavigate();

  const handleModelClick = () => {
    navigate('/design');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Golf Ball Customizer</h1>

      <div className="w-full h-1/2">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.0} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <group onClick={handleModelClick}>
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
    </div>
  );
};

export default Home;
