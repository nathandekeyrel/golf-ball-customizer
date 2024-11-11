import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall';

const Design = () => {
    return (
        <div className="flex min-h-screen">
            <div className="w-2/3 bg-gray-900">
                <Canvas>
                    <Suspense fallback={null}>
                        <ambientLight intensity={1} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />

                        {/* grid to see if canvas is working */}
                        <gridHelper args={[10, 10]} />

                        <GolfBall
                            position={[0, 0, 0]}
                            scale={1}
                        />
                        <Environment preset="studio" />
                        <OrbitControls />
                    </Suspense>
                </Canvas>
            </div>

            <div className="w-1/3 bg-white p-6">
                <h2 className="text-2xl font-bold mb-6">Customize Your Ball</h2>
            </div>
        </div>
    );
};

export default Design;