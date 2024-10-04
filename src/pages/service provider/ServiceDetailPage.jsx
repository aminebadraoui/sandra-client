import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../../components/04.templates/ImageCarousel';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';

import enUS from 'date-fns/locale/en-US';

const ServiceDetailPage = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch service');
                }
                const data = await response.json();
                setService(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleDateChange = (item) => {
        setDateRange([item.selection]);
    };

    const addYears = (date, amount) => {
        return new Date(date.setFullYear(date.getFullYear() + amount));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!service) return <div>Service not found</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
                    <ImageCarousel images={[service.mainImage, ...(service.additionalImages || [])].filter(Boolean)} />
                    <div className="mt-4 mb-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            {service.serviceTag.name}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">What this service offers</h2>
                    <p className="mb-6">{service.description}</p>
                    <h2 className="text-2xl font-bold mb-2">Location</h2>
                    <p>{service.location}</p>
                </div>
                <div className="md:w-1/3">
                    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                        <h2 className="text-2xl font-bold mb-4">Book this service</h2>
                        <p className="font-semibold mb-2">Pricing:</p>
                        <ul className="mb-6">
                            {Object.entries(service.pricing).map(([type, price]) => (
                                <li key={type} className="mb-2">
                                    <span className="capitalize">{type}</span>: ${service.pricing[type].amount}
                                </li>
                            ))}
                        </ul>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select dates
                            </label>
                            <DateRange
                                color={'#f43f5e'}
                                rangeColors={['#f43f5e']}
                                editableDateInputs={true}
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                months={1}
                                direction="vertical"
                                className="w-full"
                                locale={enUS} // Add this line
                            />
                        </div>
                        <button className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors duration-300 text-lg font-semibold">
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;