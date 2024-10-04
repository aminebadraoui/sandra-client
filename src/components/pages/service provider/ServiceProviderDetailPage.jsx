import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const allImages = Array.isArray(images) ? images : [images];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="relative">
            <img src={allImages[currentIndex]} alt="Service" className="w-full h-64 object-cover rounded-lg" />
            {allImages.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full">←</button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full">→</button>
                </>
            )}
        </div>
    );
};

const ServiceProviderDetailPage = () => {
    const { id } = useParams();
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceProvider = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/service-providers/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch service provider');
                }
                const data = await response.json();

                console.log(data)
                setProvider(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceProvider();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!provider) return <div>Service provider not found</div>;

    const activeServices = provider.services.filter(service => service.status === 'active');

    return (
        <div className="max-w-7xl mx-auto p-6">


            <div className="flex">
                <div className="w-1/3 pr-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <img src={provider.mainImage || "http://via.placeholder.com/300x300"} alt={provider.name} className="w-24 h-24 rounded-full mb-4" />
                        <h2 className="text-xl font-bold mb-2">{provider.name}</h2>
                        <p className="text-gray-600 mb-2">Service provider</p>
                        <div className="mb-2">
                            <span className="font-bold">{provider.reviews?.length || 0}</span> Reviews
                        </div>
                        <div className="mb-2">
                            <span className="font-bold">{provider.rating || 'N/A'}</span>★ Rating
                        </div>

                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold mb-4">{provider.name}'s confirmed information</h3>
                        <ul className="mb-6">
                            <li className="flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Identity
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Email address
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Phone number
                            </li>
                        </ul>
                        <a href="#" className="text-blue-600 hover:underline">Learn about identity verification</a>
                    </div>

                    <button className="mt-4 text-gray-600 hover:underline">Report this profile</button>
                </div>

                <div className="w-2/3 pl-8">
                    <h1 className="text-3xl font-bold mb-6">About {provider.name}</h1>
                    <p className="mb-8">{provider.description}</p>

                    <h2 className="text-2xl font-bold my-4">{provider.name}'s reviews</h2>
                    {/* Add reviews component here */}
                    <p>No reviews available at the moment.</p>

                    <h2 className="text-2xl font-bold my-4">{provider.name}'s active services</h2>
                    {activeServices.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeServices.map(service => (
                                <Link to={`/service/${service.id}`} className="block">
                                    <div key={service.id} className="bg-white rounded-lg shadow-lg p-4">
                                        <ImageCarousel images={[service.mainImage, ...(service.additionalImages || [])].filter(Boolean)} />
                                        <h3 className="text-xl font-bold mb-2 mt-4">{service.title}</h3>
                                        <p className="text-gray-600 mb-2">{service.description}</p>
                                        <div className="mb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                {service.tag}
                                            </span>
                                        </div>
                                        <p className="font-semibold mt-2">Pricing:</p>
                                        <ul>
                                            {Object.entries(service.pricing).map(([type, price]) => (
                                                <li key={type}>{type}: ${service.pricing[type].amount}</li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-500 mt-2">Location: {service.location}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p>No active services available at the moment.</p>
                    )}
                </div>
            </div>
        </div >
    );
};

export default ServiceProviderDetailPage;