import React from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../../containers/ImageCarousel';

const ServiceListing = ({ service }) => {
    return (
        <Link to={`/service/${service.id}`} className="block">
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
                <ImageCarousel images={[service.mainImage, ...(service.additionalImages || [])].filter(Boolean)} />
                <h3 className="text-xl font-bold mb-2 mt-4">{service.title}</h3>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <div className="mb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {service.tag}
                    </span>
                </div>
                <p className="font-semibold mt-2">Starting from ${Math.min(...Object.values(service.pricing))}</p>
                <p className="text-sm text-gray-500 mt-2">Location: {service.location}</p>
            </div>
        </Link>
    );
};

export default ServiceListing;