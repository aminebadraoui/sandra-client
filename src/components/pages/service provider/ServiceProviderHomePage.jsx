import React from 'react';
import Carousel from "../../containers/Carousel"
import CarouselItem from '../../features/ListingItem';
import Section from '../../containers/Section';
import { useState, useEffect } from 'react';


const LatestEvents = () => (
    <Section title="Latest Events">
        <Carousel
            items={[
                {
                    title: "Summer Music Festival",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Join us for a weekend of music and fun on July 15, 2023.",
                    location: "Austin, Texas, US",
                    date: "Jul 15 - 17",
                    services: [
                        { name: "Sound System", fulfilled: false },
                        { name: "Security", fulfilled: true },
                        { name: "Food Vendors", fulfilled: false },
                    ]
                },
                {
                    title: "Tech Conference 2023",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Explore the latest in technology on August 5, 2023.",
                    location: "San Francisco, California, US",
                    date: "Aug 5 - 7",
                    services: [
                        { name: "AV Equipment", fulfilled: true },
                        { name: "Catering", fulfilled: false },
                        { name: "Event Staff", fulfilled: true },
                    ]
                },
                {
                    title: "Art Gallery Opening",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Showcase of contemporary art on September 1, 2023.",
                    location: "New York City, New York, US",
                    date: "Sep 1",
                    services: [
                        { name: "Catering", fulfilled: false },
                        { name: "Security", fulfilled: true },
                        { name: "Photography", fulfilled: false },
                    ]
                },
                {
                    title: "International Food Festival",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Taste cuisines from around the world on September 15, 2023.",
                    location: "Chicago, Illinois, US",
                    date: "Sep 15 - 17",
                    services: [
                        { name: "Food Vendors", fulfilled: true },
                        { name: "Event Setup", fulfilled: false },
                        { name: "Cleaning Crew", fulfilled: false },
                    ]
                },
                {
                    title: "Startup Pitch Competition",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Entrepreneurs showcase their ideas on October 1, 2023.",
                    location: "Boston, Massachusetts, US",
                    date: "Oct 1",
                    services: [
                        { name: "AV Equipment", fulfilled: true },
                        { name: "Catering", fulfilled: false },
                        { name: "Event Coordination", fulfilled: true },
                    ]
                },
                {
                    title: "Fashion Week",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Showcasing the latest trends from October 10-15, 2023.",
                    location: "Los Angeles, California, US",
                    date: "Oct 10 - 15",
                    services: [
                        { name: "Runway Setup", fulfilled: false },
                        { name: "Lighting", fulfilled: true },
                        { name: "Makeup Artists", fulfilled: false },
                    ]
                },
                {
                    title: "Comic Con",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Celebrate pop culture on November 1-3, 2023.",
                    location: "San Diego, California, US",
                    date: "Nov 1 - 3",
                    services: [
                        { name: "Security", fulfilled: true },
                        { name: "Booth Setup", fulfilled: false },
                        { name: "Cosplay Judges", fulfilled: false },
                    ]
                },
                {
                    title: "Winter Wonderland Fair",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Family-friendly holiday event from December 1-24, 2023.",
                    location: "Denver, Colorado, US",
                    date: "Dec 1 - 24",
                    services: [
                        { name: "Ice Rink Setup", fulfilled: true },
                        { name: "Santa Claus", fulfilled: false },
                        { name: "Gift Wrapping", fulfilled: false },
                    ]
                },
                {
                    title: "New Year's Eve Gala",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Ring in the new year in style on December 31, 2023.",
                    location: "Las Vegas, Nevada, US",
                    date: "Dec 31",
                    services: [
                        { name: "Catering", fulfilled: true },
                        { name: "Live Band", fulfilled: false },
                        { name: "Fireworks", fulfilled: true },
                    ]
                },
                {
                    title: "Wellness Retreat",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Start the year right with a focus on health from January 5-10, 2024.",
                    location: "Sedona, Arizona, US",
                    date: "Jan 5 - 10, 2024",
                    services: [
                        { name: "Yoga Instructors", fulfilled: false },
                        { name: "Nutritionists", fulfilled: true },
                        { name: "Massage Therapists", fulfilled: false },
                    ]
                },
            ]}
            renderItem={(item) => <CarouselItem {...item} isServiceProvider={false} canFavorite={true} />}
        />
    </Section>
);

const UpcomingEvents = () => (
    <Section title="Your Upcoming Events">
        <Carousel
            items={[
                {
                    title: "Wedding Ceremony",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Providing photography services on June 30, 2023.",
                    services: [
                        { name: "Photography", fulfilled: true },
                        { name: "Catering", fulfilled: true },
                        { name: "Decoration", fulfilled: false },
                        { name: "DJ", fulfilled: false }
                    ]
                },
                {
                    title: "Corporate Retreat",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Catering for 100 guests on July 10, 2023.",
                    services: [
                        { name: "Catering", fulfilled: true },
                        { name: "Team Building", fulfilled: false },
                        { name: "Transportation", fulfilled: true },
                        { name: "AV Equipment", fulfilled: false }
                    ]
                },
                // ... add more items with services
            ]}
            renderItem={(item) => <CarouselItem {...item} />}
        />
    </Section>
);

const ActiveListings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/service-listings`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setListings(data.filter(listing => listing.status === 'active'));
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchListings();
    }, []);

    return (
        <Section title="Your Active Service Listings">
            <Carousel
                items={listings.map(listing => ({
                    title: listing.title,
                    image: listing.mainImage,
                    description: listing.description,
                    services: listing.category,
                    isServiceListing: true
                }))}
                renderItem={(item) => <CarouselItem {...item} />}
            />
        </Section>
    );
};

const ServiceProviderHomePage = () => {
    return (
        <div>
            <LatestEvents />
            <UpcomingEvents />
            <ActiveListings />
        </div>
    );
};

export default ServiceProviderHomePage;