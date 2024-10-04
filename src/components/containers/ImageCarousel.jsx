import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const allImages = Array.isArray(images) ? images : [images];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="relative">
            <img src={allImages[currentIndex]} alt="Service" className="w-full h-64 object-cover rounded-lg" />
            {allImages.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full">←</button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full">→</button>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;