import React, { useState, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall';

const BRAND_PRICES = {
    'velocity': { price: 30, quantity: 12 },
    'tour-soft': { price: 40, quantity: 12 },
    'pro-v1': { price: 55, quantity: 12 }
};
const COLOR_PRICE = 5;
const LOGO_PRICE = 10;

const Design = () => {
    const [brand, setBrand] = useState('velocity');
    const [color, setColor] = useState('white');
    const [logo, setLogo] = useState(null);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                setLogo(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();

    const handleCheckout = () => {
        const ballConfig = {
            brand,
            color,
            logo,
            totalPrice,
            pricePerBall: totalPrice / BRAND_PRICES[brand].quantity,
            quantity: BRAND_PRICES[brand].quantity,
            customizations: {
                hasCustomColor: color !== 'white',
                hasLogo: !!logo,
                colorPrice: color !== 'white' ? COLOR_PRICE : 0,
                logoPrice: logo ? LOGO_PRICE : 0,
                basePrice: BRAND_PRICES[brand].price
            }
        };

        navigate('/checkout', { state: { ballConfig } });
    };

    const totalPrice = useMemo(() => {
        let total = BRAND_PRICES[brand].price;
        if (color !== 'white') total += COLOR_PRICE;
        if (logo) total += LOGO_PRICE;
        return total;
    }, [brand, color, logo]);

    const colorMap = {
        white: '#FFFFFF',
        black: '#000000',
        red: '#FF0000',
        yellow: '#FFFF00',
        green: '#008000',
        blue: '#0000FF'
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-2/3 bg-gray-900">
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
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
                        <OrbitControls
                            enableZoom={true}
                            enablePan={true}
                            enableRotate={true}
                            minDistance={2}
                            maxDistance={7}
                        />
                    </Suspense>
                </Canvas>
            </div>

            <div className="w-1/3 bg-white p-8 overflow-y-auto">
                <div className="max-w-md mx-auto">
                    <h2 className="design-header">Customize Your Ball</h2>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="design-section-header">Brand</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.entries(BRAND_PRICES).map(([brandOption, { price, quantity }]) => (
                                    <label
                                        key={brandOption}
                                        className={`
                                            flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                                            ${brand === brandOption
                                            ? 'design-option-selected'
                                            : 'design-option-not-selected'}
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="brand"
                                            value={brandOption}
                                            checked={brand === brandOption}
                                            onChange={(e) => setBrand(e.target.value)}
                                            className="form-radio text-blue-500 h-5 w-5"
                                        />
                                        <div className="ml-3 flex justify-between w-full">
                                            <span className="text-lg capitalize">
                                                {brandOption.replace('-', ' ')}
                                            </span>
                                            <span className="text-gray-600">
                                                ${price}/{quantity} balls
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="design-section-header flex justify-between items-center">
                                <span>Color</span>
                                {color !== 'white' && (
                                    <span className="design-price">+${COLOR_PRICE}</span>
                                )}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(colorMap).map(([colorName, colorHex]) => (
                                    <label
                                        key={colorName}
                                        className={`
                                            flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                                            ${color === colorName
                                            ? 'design-option-selected'
                                            : 'design-option-not-selected'}
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="color"
                                            value={colorName}
                                            checked={color === colorName}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="form-radio text-blue-500 h-4 w-4"
                                        />
                                        <span className="ml-3 capitalize flex items-center">
                                            <span
                                                className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                                                style={{ backgroundColor: colorHex }}
                                            />
                                            {colorName}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="design-section-header flex justify-between items-center">
                                <span>Upload Logo</span>
                                {logo && <span className="design-price">+${LOGO_PRICE}</span>}
                            </h3>
                            <div className="mt-2">
                                <label className="block">
                                    <span className="sr-only">Choose logo file</span>
                                    <input
                                        type="file"
                                        onChange={handleLogoUpload}
                                        accept="image/png, image/jpeg"
                                        className="file-style"
                                    />
                                </label>
                                {logo && (
                                    <p className="mt-2 text-sm text-green-600">
                                        ✓ Logo uploaded successfully
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="space-y-2">
                                <div className="flex justify-between text-lg">
                                    <span className="font-semibold text-gray-700">Total Price:</span>
                                    <span className="font-bold text-gray-900">${totalPrice}</span>
                                </div>
                                <p className="design-price">
                                    ${(totalPrice / BRAND_PRICES[brand].quantity).toFixed(2)} per ball
                                </p>
                            </div>
                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Design;