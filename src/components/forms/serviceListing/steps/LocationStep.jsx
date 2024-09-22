import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const LocationStep = ({ revisionComments }) => {
    const { register, setValue, formState: { errors } } = useFormContext();
    const [suggestions, setSuggestions] = useState([]);

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center">Location</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}
            <input
                {...register('location', { required: 'Location is required' })}
                placeholder="Start typing your city"
                className="w-full p-4 border rounded"
                onChange={(e) => {
                    setValue('location', e.target.value);
                    // Here you would typically call an API to get city suggestions
                    // For demonstration, we'll use a dummy list
                    const dummySuggestions = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
                    const filteredSuggestions = dummySuggestions.filter(city =>
                        city.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setSuggestions(filteredSuggestions);
                }}
            />
            {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
            )}
            {suggestions.length > 0 && (
                <ul className="mt-2 border rounded">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setValue('location', city);
                                setSuggestions([]);
                            }}
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationStep;
