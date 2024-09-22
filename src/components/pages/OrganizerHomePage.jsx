import React from 'react';
import Carousel from '../containers/Carousel.jsx';
import StyledButton from '../reusable/StyledButton';
import CarouselItem from '../features/CarouselItem';
import Section from '../containers/Section.jsx';


const UpcomingEvents = () => (
    <Section title="Your Upcoming Events">
        <Carousel
            items={[
                {
                    title: "Annual Charity Gala",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Join us for our annual fundraising event on July 20, 2023.",
                    services: [
                        { name: "Catering", fulfilled: true },
                        { name: "Photography", fulfilled: false },
                        { name: "DJ", fulfilled: true },
                        { name: "Decoration", fulfilled: false }
                    ]
                },
                {
                    title: "Product Launch Event",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Unveiling our latest innovation on August 15, 2023.",
                    services: [
                        { name: "Venue", fulfilled: true },
                        { name: "AV Equipment", fulfilled: false },
                        { name: "Catering", fulfilled: true },
                        { name: "Security", fulfilled: false }
                    ]
                },
                // ... add more items with services
            ]}
            renderItem={(item) => <CarouselItem {...item} />}
        />
    </Section>
);

const ActiveEvents = () => (
    <Section title="Your Active Events">
        <Carousel
            items={[
                {
                    title: "Summer Music Festival",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Ongoing until July 31, 2023. Various artists performing daily.",
                    services: [
                        { name: "Sound System", fulfilled: true },
                        { name: "Security", fulfilled: true },
                        { name: "Food Vendors", fulfilled: false },
                    ]
                },
                {
                    title: "Tech Conference 2023",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Ongoing until August 10, 2023. Featuring the latest in tech innovations.",
                    services: [
                        { name: "AV Equipment", fulfilled: true },
                        { name: "Catering", fulfilled: true },
                        { name: "Event Staff", fulfilled: false },
                    ]
                },
                // ... add more items with services
            ]}
            renderItem={(item) => <CarouselItem {...item} />}
        />
    </Section>
);

const TopServiceProviders = () => (
    <Section title="Top Rated Service Providers">
        <Carousel
            items={[
                {
                    title: "John Doe - Photography",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Professional photographer with 10 years of experience. Rating: ⭐️ 4.9",
                    location: "New York, NY",
                    services: ["Photography", "Videography"]
                },
                {
                    title: "Jane Smith - Catering",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Gourmet catering services for all types of events. Rating: ⭐️ 4.8",
                    location: "Los Angeles, CA",
                    services: ["Catering", "Bartending"]
                },
                {
                    title: "Mike Johnson - DJ Services",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Experienced DJ specializing in weddings and corporate events. Rating: ⭐️ 4.7",
                    location: "Chicago, IL",
                    services: ["DJ Services", "Sound Equipment Rental"]
                },
                {
                    title: "Sarah Brown - Event Planning",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Comprehensive event planning and coordination services. Rating: ⭐️ 4.9",
                    location: "Miami, FL",
                    services: ["Event Planning", "Decoration", "Vendor Coordination"]
                },
                {
                    title: "Tom Wilson - Decoration",
                    image: "http://via.placeholder.com/1280x720",
                    description: "Creative decoration solutions for any occasion. Rating: ⭐️ 4.8",
                    location: "San Francisco, CA",
                    services: ["Decoration", "Floral Arrangements"]
                }
            ]}
            renderItem={(item) => <CarouselItem {...item} isServiceProvider={true} canFavorite={true} />}
        />
    </Section>
);

const OrganizerHomePage = () => {
    return (
        <div>
            <TopServiceProviders />
            <UpcomingEvents />
            <ActiveEvents />

        </div>
    );
};

export default OrganizerHomePage;