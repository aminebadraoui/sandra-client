import React from 'react'
import { FaStar } from 'react-icons/fa';

const ListingsSection = ({ listingsRef, fakeListings }) => {
    return (
        <section ref={listingsRef} className="py-2xl px-md sm:px-lg lg:px-xl bg-gray-50 w-full">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-xl">Latest Retreat Service Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {fakeListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} onClickAction={() => { return null }} />
                    ))}
                </div>
                <div className="text-center mt-xl">
                    <button
                        className="bg-primary-500 text-white px-xl py-md rounded-md font-semibold hover:bg-primary-600 transition duration-300"
                    >
                        See More
                    </button>
                </div>
            </div>
        </section>
    )
}


const ListingCard = ({ listing, onClickAction }) => {
    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={onClickAction}
        >
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-2">{listing.firstName} - {listing.location}</p>
                <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{listing.rating.toFixed(1)}</span>
                </div>
                <p className="text-primary-500 font-bold">{listing.price} <span className="text-sm font-normal text-gray-500">{listing.priceSubtitle}</span></p>
            </div>
        </div>
    );
};

export default ListingsSection