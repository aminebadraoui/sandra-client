import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ReviewListings = () => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-listings/in-review`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setListings(data);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleAction = async (action) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/service-listings/${selectedListing.id}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ action, comment })
            });
            if (response.ok) {
                fetchListings();
                setSelectedListing(null);
                setComment('');
            }
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };


    return (
        <div className="mt-8 container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Service Listings for Review</h2>
            {listings.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-4">
                    <p className="text-center text-gray-600">No listings to review.</p>
                </div>)
                : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            {listings.map(listing => (
                                <div key={listing.id} className="bg-white shadow rounded-lg p-4 cursor-pointer" onClick={() => setSelectedListing(listing)}>
                                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                                    <p className="text-gray-600">{listing.description.substring(0, 100)}...</p>
                                    <p className="text-sm text-gray-500 mt-2">Created by: {listing.user.firstName} {listing.user.lastName}</p>
                                </div>
                            ))}
                        </div>
                        {selectedListing && (
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <Carousel showThumbs={false}>
                                    <div>
                                        <img src={selectedListing.mainImage} alt="Main" className="w-full h-64 object-cover" />
                                    </div>
                                    {selectedListing.additionalImages?.map((img, index) => (
                                        <div key={index}>
                                            <img src={img} alt={`Additional ${index}`} className="w-full h-64 object-cover" />
                                        </div>
                                    ))}
                                </Carousel>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{selectedListing.title}</h3>
                                    <p className="text-gray-600 mb-2">{selectedListing.location}</p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Created by: {selectedListing.user.firstName} {selectedListing.user.lastName} ({selectedListing.user.email})
                                    </p>
                                    <p className="text-gray-700 mb-4">{selectedListing.description}</p>
                                    <div className="mb-4">
                                        <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                                            {selectedListing.serviceTag.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-semibold">Price:</p>
                                        {Object.entries(selectedListing.pricing).map(([type, { amount }]) => (
                                            <p key={type}>{`${type} - ${selectedListing.currency} ${amount}`}</p>
                                        ))}
                                    </div>
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a comment..."
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded"
                                            onClick={() => handleAction('approve')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-yellow-500 text-white rounded"
                                            onClick={() => handleAction('revise')}
                                        >
                                            Submit for Revision
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
        </div>
    );
};

export default ReviewListings;