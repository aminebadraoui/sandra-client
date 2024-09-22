import React from 'react';

const CarouselItem = ({ title, image, description, tag, pricing, currency, isServiceListing, providerFirstName }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-sm text-gray-500 mb-2">by: {providerFirstName}</p>
            <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-400 text-white text-xs font-semibold rounded">
                    {tag}
                </span>
            </div>
            {pricing && (
                <div className="mb-2">
                    <p className="text-sm font-bold">Pricing:</p>
                    {Object.entries(pricing).map(([type, { amount }]) => (
                        <p key={type} className="text-sm text-gray-600">
                            {type}: {currency} {amount}
                        </p>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default CarouselItem;