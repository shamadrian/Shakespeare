import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="banner">
            <img src="/Shakespeare_Banner.jpg" alt="Website Banner" className="banner-image" />
            {/* <div className="banner-text">
                <h1>Welcome to My Website</h1>
                <p>Your tagline or description goes here.</p>
            </div> */}
        </div>
    );
};

export default Banner;