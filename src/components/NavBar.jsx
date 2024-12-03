import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className='header flex justify-between items-center p-4'>
            <div>
                <NavLink to="/" className="w-12 h-8 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                    {/* Replace the "Home" text with an image */}
                    <img src="../../public/multi-color-dragon.svg" alt="ball" className="w-6 h-6" />
                    </NavLink>
            </div>
            <nav className="flex gap-7 font-medium">
                <NavLink to="/design" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}>
                    Design
                </NavLink>
                <NavLink to="/checkout" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-white'}>
                    Checkout
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
