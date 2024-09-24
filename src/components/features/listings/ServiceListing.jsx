import React from 'react';

const ServiceListing = ({ listing }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
            <p className="text-gray-600 mb-4">{listing.location}</p>
            <p className="text-gray-700 mb-4">{listing.description}</p>
            <div className="mb-4">
                <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                    {listing.category}
                </span>
            </div>
            <div className="mb-4">
                <p className="font-semibold">Price:</p>
                {Object.entries(listing.pricing).map(([type, { amount, currency }]) => (
                    <p key={type}>{`${type} - ${currency} ${amount}`}</p>
                ))}
            </div>
        </div>
    );
};

export default ServiceListing;