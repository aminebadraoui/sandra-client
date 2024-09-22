import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ManageListingsSidebar from '../features/ManageListingsSidebar';
import Carousel from "../containers/Carousel";
import CarouselItem from '../features/CarouselItem';
import LoadingSpinner from '../reusable/LoadingSpinner';

const ListingsSection = ({ title, listings, isLoading }) => {
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
            <Carousel
                items={listings.map(listing => ({
                    id: listing.id,
                    title: listing.title,
                    image: listing.mainImage,
                    description: listing.description,
                    tag: listing.tag || 'Uncategorized',
                    isServiceListing: true,
                    user: listing.user ? listing.user.firstName : 'Unknown User',
                    pricing: listing.pricing,
                    status: listing.status
                }))}
                renderItem={(item) => (
                    <CarouselItem {...item}>
                        <p className="font-semibold text-gray-800 my-2">{item.user}</p>
                        {item.pricing && Object.entries(item.pricing).map(([type, { amount, currency }]) => (
                            <p key={type} className="font-semibold">
                                {type}: {currency} {amount}
                            </p>
                        ))}
                    </CarouselItem>
                )}
            />
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

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings`, {
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
        <div className="flex">
            <ManageListingsSidebar />
            <div className="flex-1 p-8">
                <Routes>
                    <Route path="published" element={<ListingsSection title="Published Listings" listings={listings.published} isLoading={isLoading} />} />
                    <Route path="in-review" element={<ListingsSection title="Listings In Review" listings={listings.inReview} isLoading={isLoading} />} />
                    <Route path="needs-revision" element={<ListingsSection title="Listings Needing Revision" listings={listings.needsRevision} isLoading={isLoading} />} />
                    <Route path="archived" element={<ListingsSection title="Archived Listings" listings={listings.archived} isLoading={isLoading} />} />
                    <Route path="drafts" element={<ListingsSection title="Draft Listings" listings={listings.drafts} isLoading={isLoading} />} />
                    <Route path="/" element={<Navigate to="published" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ManageListingsPage;
