import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Image Wizards App</h1>
            <nav>
                <ul>
                    <li><Link to="/eye-fundus">Eye Fundus Segmentation</Link></li>
                    <li><Link to="/melanoma">Melanoma Segmentation</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
