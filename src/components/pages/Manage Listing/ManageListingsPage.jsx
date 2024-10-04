import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ManageListingsSidebar from '../../features/ManageListingsSidebar';
import EditServiceListingForm from '../../forms/serviceListing/EditServiceListingForm';
import EditEventListingForm from '../../forms/eventListing/EditEventListingForm';
import ListingItem from '../../features/ListingItem';
import LoadingSpinner from '../../reusable/LoadingSpinner';
import useUserStore from '../../../state/userStore';

const ListingsSection = ({ title, listings, isLoading, isEventListing }) => {
    console.log("isEventListing", isEventListing)
    if (isLoading) {
        return (
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <LoadingSpinner />
            </div>
        );
    }

    if (!listings || listings.length === 0) {
        return (
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow">
                    <p>No listings to display at this time.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="flex flex-wrap -mx-2">
                {listings.map(listing => (
                    <div key={listing.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                        <ListingItem
                            id={listing.id}
                            title={listing.title}
                            image={listing.mainImage || listing.imageUrls[0]}
                            description={listing.description}
                            tag={listing.tag || 'Uncategorized'}
                            isServiceListing={!isEventListing}
                            user={listing.user ? listing.user.firstName : 'Unknown User'}
                            pricing={listing.pricing}
                            status={listing.status}
                            date={isEventListing ? listing.date : null}
                        >
                            {/* Additional content for the listing item */}
                        </ListingItem>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ManageListingsPage = () => {
    const [listings, setListings] = useState({
        published: [],
        inReview: [],
        needsRevision: [],
        archived: [],
        drafts: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const userType = useUserStore(state => state.user.role);
    const isEventOrganizer = userType === 'organizer';

    console.log(userType)

    useEffect(() => {
        fetchListings();
    }, [userType]);

    const fetchListings = async () => {
        setIsLoading(true);
        try {
            const endpoint = userType === 'serviceProvider' ? 'service-listings' : 'event-listings';
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setListings({
                    published: data.filter(listing => listing.status === 'active'),
                    inReview: data.filter(listing => listing.status === 'in_review'),
                    needsRevision: data.filter(listing => listing.status === 'needs_revision'),
                    archived: data.filter(listing => listing.status === 'archived'),
                    drafts: data.filter(listing => listing.status === 'draft')
                });
            } else {
                console.error('Error fetching listings:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            <ManageListingsSidebar isEventOrganizer={isEventOrganizer} />
            <div className="flex-1 ml-64 p-8">
                <Routes>
                    <Route path="published" element={<ListingsSection title="Published Listings" listings={listings.published} isLoading={isLoading} isEventListing={isEventOrganizer} />} />
                    <Route path="in-review" element={<ListingsSection title="Listings In Review" listings={listings.inReview} isLoading={isLoading} isEventListing={isEventOrganizer} />} />
                    <Route path="needs-revision" element={<ListingsSection title="Listings Needing Revision" listings={listings.needsRevision} isLoading={isLoading} isEventListing={isEventOrganizer} />} />
                    <Route path="archived" element={<ListingsSection title="Archived Listings" listings={listings.archived} isLoading={isLoading} isEventListing={isEventOrganizer} />} />
                    <Route path="drafts" element={<ListingsSection title="Draft Listings" listings={listings.drafts} isLoading={isLoading} isEventListing={isEventOrganizer} />} />
                    <Route path="/" element={<Navigate to="published" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ManageListingsPage;