import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ handleImageUpload, handleSegmentation }) => {
    const fileInputRef = React.useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleImageUpload(file);
    };

    return (
        <div className="menu">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
            />
            {/* <nav>
                <ul>
                    <li><Link to="/eye-fundus">Eye Fundus Segmentation</Link></li>
                    <li><Link to="/melanoma">Melanoma Segmentation</Link></li>
                </ul>
            </nav> */}
            <button onClick={() => window.location.reload()}>Exit</button>
        </div>
    );
};

export default Menu;
