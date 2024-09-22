import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ReviewListings = () => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [comments, setComments] = useState({});

    useEffect(() => {
        fetchListings();
    }, []);

    useEffect(() => {
        // Automatically select the first listing if available
        if (listings.length > 0 && !selectedListing) {
            setSelectedListing(listings[0]);
            setComments({}); // Reset comments when selecting a new listing
        }
    }, [listings, selectedListing]);

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

    const hasComments = () => {
        return Object.values(comments).some(comment => comment && comment.trim() !== '');
    };

    const handleReviewAction = async (action) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/review-listing/${selectedListing.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    action,
                    comments: {
                        idea: comments.idea,
                        location: comments.location,
                        tag: comments.tag,
                        pricing: comments.pricing,
                        mainImage: comments.mainImage,
                        additionalImages: comments.additionalImages
                    }
                })
            });
            if (response.ok) {
                fetchListings();
                setSelectedListing(null);
                setComments({});
            }
        } catch (error) {
            console.error('Error reviewing listing:', error);
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
                                <div key={listing.id} className={`bg-white shadow rounded-lg p-4 cursor-pointer ${selectedListing?.id === listing.id ? 'border-2 border-rose-500' : ''}`} onClick={() => setSelectedListing(listing)}>
                                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                                    <p className="text-gray-600">{listing.description.substring(0, 100)}...</p>
                                    <p className="text-sm text-gray-500 mt-2">Created by: {listing.user.firstName} {listing.user.lastName}</p>
                                </div>
                            ))}
                        </div>
                        {selectedListing && (
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className='p-6'>
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
                                </div>

                                <div className='mt-6 px-6'>
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comments.mainImage || ''}
                                        onChange={(e) => setComments({ ...comments, mainImage: e.target.value })}
                                        placeholder="Comment on main image..."
                                    />
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comments.additionalImages || ''}
                                        onChange={(e) => setComments({ ...comments, additionalImages: e.target.value })}
                                        placeholder="Comment on additional images..."
                                    />

                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{selectedListing.title}</h3>
                                    <p className="text-gray-700 mb-4">{selectedListing.description}</p>
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comments.idea || ''}
                                        onChange={(e) => setComments({ ...comments, idea: e.target.value })}
                                        placeholder="Comment on idea and description..."
                                    />

                                    <p className="text-gray-600 mb-2">{selectedListing.location}</p>
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comments.location || ''}
                                        onChange={(e) => setComments({ ...comments, location: e.target.value })}
                                        placeholder="Comment on location..."
                                    />

                                    <p className="text-sm text-gray-500 mb-4">
                                        Created by: {selectedListing.user.firstName} {selectedListing.user.lastName} ({selectedListing.user.email})
                                    </p>

                                    <div className="mb-4">
                                        <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                                            {selectedListing.serviceTag.name}
                                        </span>
                                    </div>
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comments.tag || ''}
                                        onChange={(e) => setComments({ ...comments, tag: e.target.value })}
                                        placeholder="Comment on tag..."
                                    />
                                    <div className="mb-4">
                                        <p className="font-semibold">Price:</p>
                                        {Object.entries(selectedListing.pricing).map(([type, { amount }]) => (
                                            <p key={type}>{`${type} - ${selectedListing.currency} ${amount}`}</p>
                                        ))}
                                    </div>
                                    <textarea
                                        className="w-full p-2 border rounded mb-4"
                                        value={comments.pricing || ''}
                                        onChange={(e) => setComments({ ...comments, pricing: e.target.value })}
                                        placeholder="Comment on pricing..."
                                    />
                                    <div className="flex justify-end space-x-4 mt-4">
                                        <button
                                            onClick={() => handleReviewAction('approve')}
                                            className={`px-4 py-2 rounded transition-all duration-200 ${hasComments()
                                                ? 'bg-gray-300 cursor-not-allowed opacity-75'
                                                : 'bg-green-500 hover:bg-green-600 text-white'
                                                }`}
                                            disabled={hasComments()}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReviewAction('revise')}
                                            className={`px-4 py-2 rounded transition-all duration-200 ${!hasComments()
                                                ? 'bg-gray-300 cursor-not-allowed opacity-75'
                                                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                }`}
                                            disabled={!hasComments()}
                                        >
                                            Request Revision
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