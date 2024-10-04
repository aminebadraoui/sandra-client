import React from 'react';
import { Link } from 'react-router-dom';

const ServiceProviderCard = ({ serviceProvider }) => {
    // Filter active services and extract unique tags
    const activeTags = [...new Set(
        serviceProvider.services
            .filter(service => service.status === 'active')
            .map(service => service.tag)
    )];

    return (
        <Link
            to={`/service-provider/${serviceProvider.id}`}
            className="block bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
            <img
                src={serviceProvider.mainImage || "http://via.placeholder.com/300x200"}
                alt={serviceProvider.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{serviceProvider.name}</h3>
                <div className="mb-2">
                    {activeTags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-700 text-base">{serviceProvider.description}</p>
            </div>
        </Link>
    );
};

const ServiceProviderGrid = ({ serviceProviders }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {serviceProviders.map(provider => (
            <ServiceProviderCard key={provider.id} serviceProvider={provider} />
        ))}
    </div>
);

export default ServiceProviderGrid;