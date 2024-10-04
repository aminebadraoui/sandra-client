import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ManageListingsSidebar = ({ isEventOrganizer }) => {
    const [isYourListingsExpanded, setIsYourListingsExpanded] = useState(true);
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    const linkClass = (path) => `block py-2 ${isActive(path)
        ? 'text-primary-500 border-b-2 border-primary-500'
        : 'hover:text-primary-500'
        }`;

    const createListingPath = isEventOrganizer ? "/add-event-listing" : "/add-service-listing";
    const listingType = isEventOrganizer ? "Event" : "Service";

    return (
        <div className="bg-white left-0 fixed w-64 min-h-screen shadow-md">
            <h2 className="text-2xl font-bold p-4 border-b">Manage {listingType} Listings</h2>

            <div className="p-4">
                <Link to={createListingPath} className="block w-full bg-primary-500 text-white text-center py-2 rounded-md hover:bg-rose-600 transition duration-300">
                    Create {listingType} Listing
                </Link>
            </div>

            <nav className="mt-4">
                <div>
                    <button
                        onClick={() => setIsYourListingsExpanded(!isYourListingsExpanded)}
                        className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-100 font-bold"
                    >
                        <span>Your {listingType} Listings</span>
                        <span>{isYourListingsExpanded ? '▼' : '▶'}</span>
                    </button>
                    {isYourListingsExpanded && (
                        <div className="pl-8">
                            <Link to="/manage-listings/published" className={linkClass('published')}>Published</Link>
                            <Link to="/manage-listings/in-review" className={linkClass('in-review')}>In Review</Link>
                            <Link to="/manage-listings/needs-revision" className={linkClass('needs-revision')}>Needs Revision</Link>
                        </div>
                    )}
                </div>
                <Link to="/manage-listings/archived" className={`block p-4 font-bold ${linkClass('archived')}`}>
                    Archived Listings
                </Link>
                <Link to="/manage-listings/drafts" className={`block p-4 font-bold ${linkClass('drafts')}`}>
                    Drafts
                </Link>
            </nav>
        </div>
    );
};

export default ManageListingsSidebar;
