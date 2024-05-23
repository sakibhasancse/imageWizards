import React from 'react';

const ImageView = ({ imageSrc, altText }) => {
    return (
        <div className="image-view">
            {imageSrc ? <img src={imageSrc} alt={altText} /> : <p>No Image Loaded</p>}
        </div>
    );
};

export default ImageView;
