import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from '../containers/Carousel';
import CarouselItem from '../features/CarouselItem'


const ManageListingsPage = () => {
    const [listings, setListings] = useState({ active: [], in_review: [], archived: [], drafts: [] });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setListings({
                    active: data.filter(listing => listing.status === 'active'),
                    in_review: data.filter(listing => listing.status === 'in_review'),
                    archived: data.filter(listing => listing.status === 'archived'),
                    drafts: data.filter(listing => listing.status === 'draft')
                });
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const tabNames = {
        active: 'Active',
        in_review: 'In Review',
        archived: 'Archived',
        drafts: 'Drafts'
    };

    const getActiveTabIndex = () => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const statuses = Object.keys(tabNames);
        return statuses.indexOf(status) !== -1 ? statuses.indexOf(status) : 0;
    };

    const handleTabChange = (index) => {
        const statuses = Object.keys(tabNames);
        navigate(`/manage-listings?status=${statuses[index]}`);
    };

    const renderCarousel = (listingsArray) => {
        if (listingsArray.length === 0) {
            return <NoListings />;
        }
        return (
            <Carousel
                items={listingsArray.map(listing => ({
                    title: listing.title,
                    image: listing.mainImage,
                    description: listing.description,
                    tag: listing.tag,
                    pricing: listing.pricing,
                    currency: listing.currency,
                    isServiceListing: true,
                    providerFirstName: listing.user.firstName
                }))}
                renderItem={(item) => <CarouselItem {...item} />}
            />
        );
    };

    const NoListings = () => {
        return (
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <p className="text-xl text-gray-600">No listings to display.</p>
            </div>
        );
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Listings</h1>
            <Tab.Group selectedIndex={getActiveTabIndex()} onChange={handleTabChange}>
                <Tab.List className="flex space-x-1 rounded-xl bg-rose-900/20 p-1 mb-4">
                    {Object.entries(tabNames).map(([key, name]) => (
                        <Tab
                            key={key}
                            className={({ selected }) =>
                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-rose-700
                                ${selected ? 'bg-white shadow' : 'text-rose-100 hover:bg-white/[0.12] hover:text-white'}`
                            }
                        >
                            {name}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {Object.keys(tabNames).map((status) => (
                        <Tab.Panel key={status}>
                            {renderCarousel(listings[status])}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ManageListingsPage;
