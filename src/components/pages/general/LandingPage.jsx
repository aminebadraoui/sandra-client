import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { FaLeaf, FaYinYang, FaHandsHelping, FaMountain, FaSearch, FaRocket, FaStar, FaHandshake, FaChartLine } from 'react-icons/fa';
import useModalStore from '../../../state/modalStore';

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

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative w-screen h-screen">
                <img
                    src="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009026/campfire-1024x700_fbpig0.jpg"
                    alt="Serene retreat setting"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 mx-auto max-w-4xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-md">
                            Craft Transformative Retreat Experiences
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-white mb-lg">
                            Where Vision Meets Serenity: Your Ultimate Retreat Planning Partner
                        </p>
                        <div className="flex justify-center space-x-md">
                            <button onClick={() => openRegisterModal(null)} className="bg-primary-500 text-white px-lg py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300">
                                Start Your Journey
                            </button>
                            <button onClick={scrollToListings} className="bg-white text-primary-500 px-lg py-sm rounded-md font-semibold hover:bg-gray-100 transition duration-300">
                                Explore Retreat Services
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-2xl px-md sm:px-lg lg:px-xl">
                <h2 className="text-3xl font-bold text-center mb-xl">Why Sandra is Your Retreat's Secret Sanctuary</h2>
                <div className="flex flex-col md:flex-row justify-between items-start gap-lg">
                    <FeatureCard
                        title="Curated Excellence"
                        description="Connect with a diverse array of handpicked, professional service providers to bring your retreat vision to life."
                        icon={<FaLeaf className="text-5xl text-primary-500" />}
                    />
                    <FeatureCard
                        title="Holistic Support"
                        description="Rest assured with our vetted wellness experts and retreat specialists, ensuring a transformative experience."
                        icon={<FaYinYang className="text-5xl text-primary-500" />}
                    />
                    <FeatureCard
                        title="Seamless Harmony"
                        description="Experience the ease of planning with our intuitive platform, designed to bring peace to your retreat creation process."
                        icon={<FaHandsHelping className="text-5xl text-primary-500" />}
                    />
                </div>
            </section>

            {/* Retreat Organizers Section */}
            <section className="py-2xl px-md sm:px-lg lg:px-xl bg-gray-50">
                <div className="flex flex-col md:flex-row items-center gap-xl">
                    <div className="md:w-1/2">
                        <img src="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009208/Best-Yoga-Retreats-in-the-World-1-1500-op_zdr7fd.jpg" alt="Retreat Organizer in a serene setting" className="rounded-lg shadow-md w-full" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
                        <h2 className="text-3xl font-bold mb-lg text-center md:text-left">Empower Your Retreat Vision</h2>
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
                        <Link onClick={() => openRegisterModal('organizer')} className="bg-primary-500 text-white px-lg py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300 self-center md:self-start">
                            Create Your Sanctuary
                        </Link>
                    </div>
                </div>
            </section>

            {/* Retreat Service Providers Section */}
            <section className="py-2xl px-md sm:px-lg lg:px-xl">
                <div className="flex flex-col md:flex-row-reverse items-center gap-xl">
                    <div className="md:w-1/2">
                        <img src="https://res.cloudinary.com/dbwefnkfe/image/upload/v1728009448/traworld_k2bd56ib33n_untitled-design_17_qc0jel.webp" alt="Service Provider at a retreat" className="rounded-lg shadow-md w-full" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
                        <h2 className="text-3xl font-bold mb-lg text-center md:text-left">Elevate Your Services, Enhance Retreats</h2>
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
                        <Link onClick={() => openRegisterModal('serviceProvider')} className="bg-primary-500 text-white px-lg py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300 self-center md:self-start">
                            Showcase Your Expertise
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-2xl px-md sm:px-lg lg:px-xl text-center bg-primary-50">
                <h2 className="text-3xl font-bold mb-md">Ready to Cultivate Transformative Retreats?</h2>
                <p className="text-xl mb-lg">Join Sandra today and be part of the wellness revolution.</p>
                <Link onClick={() => openRegisterModal(null)} className="bg-primary-500 text-white px-xl py-sm rounded-md font-semibold hover:bg-primary-600 transition duration-300">
                    Begin Your Mindful Journey
                </Link>
            </section>

            {/* Latest Listings Section */}
            <section ref={listingsRef} className="py-2xl px-md sm:px-lg lg:px-xl bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-xl">Latest Retreat Service Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {fakeListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} onClickAction={() => openRegisterModal(null)} />
                    ))}
                </div>
                <div className="text-center mt-xl">
                    <button
                        onClick={() => openRegisterModal(null)}
                        className="bg-primary-500 text-white px-xl py-md rounded-md font-semibold hover:bg-primary-600 transition duration-300"
                    >
                        See More
                    </button>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-white p-lg rounded-lg shadow-md text-center flex-1 flex flex-col items-center">
        <div className="mb-md flex items-center justify-center h-20">{icon}</div>
        <h3 className="text-xl font-semibold mb-sm">{title}</h3>
        <p>{description}</p>
    </div>
);

const ListingCard = ({ listing, onClickAction }) => {
    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={onClickAction}
        >
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-2">{listing.firstName} - {listing.location}</p>
                <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{listing.rating.toFixed(1)}</span>
                </div>
                <p className="text-primary-500 font-bold">{listing.price} <span className="text-sm font-normal text-gray-500">{listing.priceSubtitle}</span></p>
            </div>
        </div>
    );
};

export default LandingPage;