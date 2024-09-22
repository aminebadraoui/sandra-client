import React from 'react';
import { Link } from 'react-router-dom';

const ListingItem = ({ title, image, description, tag, isServiceListing, children, status, id }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-rose-500';
            case 'in_review':
                return 'bg-yellow-500';
            case 'needs_revision':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className={`flex justify-end items-center ${getStatusColor(status)}`}>
                <Link to={`/edit-listing/${id}`} className="px-4 py-2 text-white rounded-md hover:opacity-75 transition duration-300">
                    Edit
                </Link>
            </div>
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-2">{description}</p>
                {isServiceListing && tag && (
                    <div className="mb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            {tag}
                        </span>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default ListingItem;