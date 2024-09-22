import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const pricingTypes = [
    { value: 'one-time', label: 'One-Time' },
    { value: 'per-hour', label: 'Per Hour' },
    { value: 'per-day', label: 'Per Day' }
];

const ReviewStep = ({ categories }) => {
    const { getValues } = useFormContext();
    const formData = getValues();
    const reviewSelectedCategory = categories.find(cat => cat.id === formData.category);
    const selectedTag = reviewSelectedCategory?.tags.find(tag => tag.id === formData.tag);

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center">Review Your Listing</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Carousel showThumbs={false}>
                    <div>
                        <img src={formData.mainImage} alt="Main" className="w-full h-64 object-cover" />
                    </div>
                    {formData.additionalImages?.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Additional ${index}`} className="w-full h-64 object-cover" />
                        </div>
                    ))}
                </Carousel>
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{formData.title}</h3>
                    <p className="text-gray-600 mb-4">{formData.location}</p>

                    <p className="text-gray-700 mb-4">{formData.description}</p>
                    <div className="mb-4">
                        <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                            {selectedTag?.name}
                        </span>
                    </div>
                    <div className="mb-4">
                        <p className="font-semibold">Price:</p>
                        {Object.entries(formData.pricing).map(([type, { amount }]) => (
                            <p key={type}>{`${pricingTypes.find(t => t.value === type).label} - ${formData.pricingCurrency} ${amount}`}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewStep;