import React, { Suspense, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import GolfBall from '../models/GolfBall';

const Checkout = () => {
  const location = useLocation();
  const { ballConfig } = location.state || {};
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);

  // Redirect if no ball configuration
  if (!ballConfig) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-start p-6">
        <h2 className="text-2xl text-red-600">No ball configuration found. Please customize your ball first.</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate('/design')}
        >
          Go to Design Page
        </button>
      </div>
    );
  }

  const { brand, color, logo, totalPrice, pricePerBall, quantity } = ballConfig;

  const handlePlaceOrder = () => {
    alert('Order placed successfully');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Golf Ball Preview */}
        <div className="h-[400px] bg-gray-900 rounded-lg">
          <Canvas camera={{ position: [0, 0, 4], fov: 30 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <GolfBall position={[0, 0, 0]} scale={1} brand={brand} color={color} logo={logo} />
              <Environment preset="studio" />
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>

        {/* Toggle between Order Summary and Checkout Form */}
        {isCheckout ? (
          // Checkout Form
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h3 className="text-2xl font-semibold mb-4">Billing & Shipping</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="block">
                  <span className="text-gray-700">Full Name</span>
                  <input
                    type="text"
                    required
                    className="form-input mt-1 block w-full border border-gray-300 rounded-lg"
                    placeholder="John Doe"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email Address</span>
                  <input
                    type="email"
                    required
                    className="form-input mt-1 block w-full border border-gray-300 rounded-lg"
                    placeholder="example@example.com"
                  />
                </label>
              </div>

              <label className="block mb-4">
                <span className="text-gray-700">Shipping Address</span>
                <input
                  type="text"
                  required
                  className="form-input mt-1 block w-full border border-gray-300 rounded-lg"
                  placeholder="123 Main Street"
                />
              </label>

              <h4 className="text-xl font-semibold mt-6 mb-4">Payment Details</h4>
              <div className="grid grid-cols-3 gap-4">
                <label className="block col-span-2">
                  <span className="text-gray-700">Card Number</span>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    className="form-input mt-1 block w-full border border-gray-300 rounded-lg"
                    placeholder="1234 5678 9012 3456"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">CVV</span>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    className="form-input mt-1 block w-full border border-gray-300 rounded-lg"
                    placeholder="123"
                  />
                </label>
              </div>

              <label className="block mt-4">
                <span className="text-gray-700">Expiry Date</span>
                <input
                  type="text"
                  required
                  maxLength={5}
                  className="form-input mt-1 block w-full border border-gray-300 rounded-lg"
                  placeholder="MM/YY"
                />
              </label>

              <button
                type="submit"
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mr-4"
              >
                Place Order
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setIsCheckout(false)} // Switch back to Order Summary
                >
                 Cancel
                </button>
            </form>
          </div>
        ) : (
          // Order Summary
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
            <ul className="space-y-4">
              <li>
                <strong>Brand:</strong> {brand.replace('-', ' ')}
              </li>
              <li>
                <strong>Color:</strong> {color}
              </li>
              {logo && (
                <li>
                  <strong>Logo:</strong>{' '}
                  <img
                    src={logo}
                    alt="Uploaded logo"
                    className="w-12 h-12 object-contain border"
                  />
                </li>
              )}
              <li>
                <strong>Quantity:</strong> {quantity}
              </li>
              <li>
                <strong>Price per ball:</strong> ${pricePerBall.toFixed(2)}
              </li>
              <li>
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </li>
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mr-5"
              onClick={() => navigate('/design', { state: { ballConfig } })}
            >
              Keep Editing
            </button>
            <button
              onClick={() => setIsCheckout(true)}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
