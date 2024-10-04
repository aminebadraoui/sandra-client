import React, { useState, useEffect } from 'react';
import Carousel from "../../containers/Carousel";
import CarouselItem from '../../features/ListingItem';
import Section from '../../containers/Section';
import ServiceProviderGrid from '../../features/ServiceProviderCard';


const AllServiceProviders = () => {
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/service-providers`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setServiceProviders(data);
                }
            } catch (error) {
                console.error('Error fetching service providers:', error);
            }
        };
        fetchServiceProviders();
    }, []);

    return (
        <Section title="All Service Providers">
            <ServiceProviderGrid serviceProviders={serviceProviders} />
        </Section>
    );
};

const OrganizerHomePage = () => {
    return (
        <div>
            <AllServiceProviders />
        </div>
    );
};

export default OrganizerHomePage;