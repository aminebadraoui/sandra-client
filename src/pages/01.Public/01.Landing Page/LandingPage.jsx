import React, { useRef } from "react";

import { FaLeaf, FaYinYang, FaHandsHelping, FaMountain, FaSearch, FaRocket, FaStar, FaHandshake, FaChartLine } from 'react-icons/fa';
import useModalStore from '../../../state/modalStore';
import Hero from '../../../components/03.blocks/landing/Hero'
import FeaturesSection from "./components/02.FeaturesSection";
import RightImageSection from "../../../components/03.blocks/landing/RightImageSection";
import LeftImageSection from "../../../components/03.blocks/landing/LeftImageSection";
import CTASection from "./components/05.CTASection";
import ListingsSection from "./components/06.ListingsSection";

const LandingPage = () => {
    const openRegisterModal = useModalStore(state => state.openRegisterModal);
    const listingsRef = useRef(null);

    const scrollToListings = () => {
        listingsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Fake data for service provider listings
    const fakeListings = [
        {
            id: 1,
            title: "Professional Retreat Photographer",
            firstName: "Maria",
            location: "Tulum, Mexico",
            rating: 4.8,
            price: "$250",
            priceSubtitle: "per day",
            image: "https://picsum.photos/seed/photographer/400/300"
        },
        {
            id: 2,
            title: "Experienced Yoga Instructor",
            firstName: "Carlos",
            location: "Tulum, Mexico",
            rating: 4.9,
            price: "$100",
            priceSubtitle: "per hour",
            image: "https://picsum.photos/seed/yoga/400/300"
        },
        {
            id: 3,
            title: "Event Production Specialist",
            firstName: "Alex",
            location: "Tulum, Mexico",
            rating: 4.7,
            price: "$1500",
            priceSubtitle: "per event",
            image: "https://picsum.photos/seed/production/400/300"
        },
        {
            id: 4,
            title: "Retreat Security Staff",
            firstName: "Diego",
            location: "Tulum, Mexico",
            rating: 4.6,
            price: "$200",
            priceSubtitle: "per day",
            image: "https://picsum.photos/seed/security/400/300"
        },
    ];

    const rightImageSectionDescription = (
        <ul className="space-y-md mb-lg">
            <li className="flex items-start">
                <FaMountain className="text-primary-500 mr-sm text-xl flex-shrink-0" />
                <span>Discover breathtaking venues that inspire transformation</span>
            </li>
            <li className="flex items-start">
                <FaSearch className="text-primary-500 mr-sm text-xl flex-shrink-0" />
                <span>Connect with expert facilitators and wellness providers</span>
            </li>
            <li className="flex items-start">
                <FaRocket className="text-primary-500 mr-sm text-xl flex-shrink-0" />
                <span>Bring your healing and growth-focused retreats to life</span>
            </li>
        </ul>
    )

    const leftImageSectionDescription = (
        <ul className="space-y-md mb-lg">
            <li className="flex items-start">
                <FaStar className="text-primary-500 mr-sm text-xl flex-shrink-0" />
                <span>Showcase your unique skills, from wellness coaching to event production</span>
            </li>
            <li className="flex items-start">
                <FaHandshake className="text-primary-500 mr-sm text-xl flex-shrink-0" />
                <span>Connect with retreat organizers seeking your specific expertise</span>
            </li>
            <li className="flex items-start">
                <FaChartLine className="text-primary-500 mr-sm text-xl flex-shrink-0" />
                <span>Expand your reach in the growing retreat and wellness industry</span>
            </li>
        </ul>
    )

    return (
        <div>
            {/* Hero Section */}
            <Hero
                imageUrl="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009026/campfire-1024x700_fbpig0.jpg"
                title="Craft Transformative Retreat Experiences"
                subtitle="Where Vision Meets Serenity: Your Ultimate Retreat Planning Partner"
                buttonTitle="Start Your Journey"
                secondaryButtonTitle="Explore Retreat Services"
                mainAction={() => openRegisterModal(null)}
                secondaryAction={scrollToListings}
            />

            {/* Features Section */}
            <FeaturesSection />

            {/* Retreat Organizers Section */}
            <RightImageSection
                imageUrl="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009208/Best-Yoga-Retreats-in-the-World-1-1500-op_zdr7fd.jpg"
                title="Empower Your Retreat Vision"
                description={rightImageSectionDescription}
                buttonTitle="Create Your Sanctuary"
                mainAction={() => openRegisterModal("organizer")} />


            {/* Retreat Service Providers Section */}
            <LeftImageSection
                imageUrl="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009448/traworld_k2bd56ib33n_untitled-design_17_qc0jel.webp"
                title="Elevate Your Services, Enhance Retreats"
                description={leftImageSectionDescription}
                buttonTitle="Showcase Your Expertise"
                mainAction={() => openRegisterModal("serviceProvider")}
            />



            {/* CTA Section */}
            <CTASection mainAction={() => openRegisterModal(null)} />

            {/* Latest Listings Section */}
            <ListingsSection listingsRef={listingsRef} fakeListings={fakeListings} />

        </div>
    );
};




export default LandingPage;