import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewStep = ({ categories }) => {
    const { getValues } = useFormContext();
    const formData = getValues();

    const selectedTags = categories.flatMap(category =>
        category.tags.filter(tag => formData.tagIds.includes(tag.id))
    );

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center">Review Your Event Listing</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h3 className="text-2xl font-bold mb-2">{formData.eventName}</h3>
                <p className="text-gray-600 mb-4">{formData.location}</p>
                <p className="text-gray-700 mb-4">{formData.description}</p>
                <p className="text-gray-600 mb-4">Date: {formData.date} at {formData.time}</p>
                <div className="mb-4">
                    <p className="font-semibold mb-2">Selected Tags:</p>
                    <div className="flex flex-wrap gap-2">
                        {selectedTags.map(tag => (
                            <span key={tag.id} className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewStep;