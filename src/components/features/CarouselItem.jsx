import React from 'react';

const CarouselItem = ({ title, image, description, services, location, date, isServiceProvider, canFavorite }) => (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden shadow-lg">
        <div className="relative">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            {canFavorite && (
                <button className="absolute top-2 right-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            )}
        </div>
        <div className="p-4 flex-grow">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">{location}</p>
            {date && <p className="text-sm text-gray-600 mb-2">{date}</p>}
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            {isServiceProvider && Array.isArray(services) && services.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold text-sm mb-1">Services Provided:</h4>
                    <div className="flex flex-wrap gap-1">
                        {services.map((service, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 rounded bg-green-100 text-green-800"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {!isServiceProvider && Array.isArray(services) && services.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold text-sm mb-1">Services Needed:</h4>
                    <div className="flex flex-wrap gap-1">
                        {services.map((service, index) => (
                            <span
                                key={index}
                                className={`text-xs px-2 py-1 rounded ${service.fulfilled
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {service.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default CarouselItem;