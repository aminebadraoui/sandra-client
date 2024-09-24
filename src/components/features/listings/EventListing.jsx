import React from 'react';

const EventListing = ({ listing }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{listing.eventName}</h2>
            <p className="text-gray-600 mb-4">{listing.description}</p>
            <p className="text-gray-600 mb-4">{new Date(listing.date).toLocaleDateString()} at {listing.time}</p>
            <div className="mb-4">
                <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                    {listing.category}
                </span>
            </div>
            <div className="mb-4">
                <p className="font-semibold">Service Tags:</p>
                {listing.serviceTags.map(tag => (
                    <span key={tag.id} className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default EventListing;