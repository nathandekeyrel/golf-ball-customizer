import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall';

const Checkout = () => {
    const location = useLocation();
    const { ballConfig } = location.state || {};

    // stops user from jumping ahead to the checkout page
    if (!ballConfig) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h2 className="text-2xl text-red-600">No ball configuration found. Please customize your ball first.</h2>
            </div>
        );
    }

    const { brand, color, logo, totalPrice, pricePerBall, quantity, customizations } = ballConfig;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Checkout</h2>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="h-[400px] bg-gray-900 rounded-lg">
                    <Canvas camera={{ position: [0, 0, 4], fov: 30 }}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <GolfBall
                                position={[0, 0, 0]}
                                scale={1}
                                brand={brand}
                                color={color}
                                logo={logo}
                            />
                            <Environment preset="studio" />
                            <OrbitControls />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </div>
    )
};

export default Checkout;