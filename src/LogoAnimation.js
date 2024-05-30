import React, { useEffect, useState } from 'react';
import './LogoAnimation.css';
import logo from './assets/sonar-logo.png';  // Ensure the path is correct

const LogoAnimation = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 1000); // Duration of the animation
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="logo-animation">
            <img src={logo} alt="Sonar Logo" />
        </div>
    );
};

export default LogoAnimation;
