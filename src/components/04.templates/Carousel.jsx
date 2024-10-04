import React from 'react';

const Carousel = ({ items, renderItem }) => (
    <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
                <div key={index} className="w-full">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    </div>
);

export default Carousel;