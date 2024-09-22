import React from 'react';
import { Link } from 'react-router-dom';

const CarouselItem = ({ title, image, description, category, tag, isServiceListing, children, status, id }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-rose-500 ';
            case 'in_review':
                return 'bg-yellow-500 ';
            case 'needs_revision':
                return 'bg-orange-500 ';
            default:
                return 'bg-gray-500 ';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className={` flex justify-end items-center ${getStatusColor(status)}`}>
                <Link to={`/edit-listing/${id}`} className="px-4 py-2 font-bold text-white rounded-md hover:opacity-75 transition duration-300">
                    Edit
                </Link>
            </div>
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <p className="text-gray-800 font-bold text-2xl mb-2">{title}</p>
                <p className="text-gray-600 mb-2">{description}</p>
                {isServiceListing && tag && (
                    <div className="mb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700  mb-2">
                            {tag}
                        </span>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default CarouselItem;