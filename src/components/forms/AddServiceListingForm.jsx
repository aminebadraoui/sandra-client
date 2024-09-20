import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const steps = [
    'Your idea',
    'Location',
    'Category',
    'Tag',
    'Pricing',
    'Availability',
    'Main image',
    'Additional images',
    'Review'
];

const AddServiceListingForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const methods = useForm({
        defaultValues: {
            title: '',
            description: '',
            location: '',
            category: '',
            tag: '',
            mainPricingType: 'one-time',
            mainPricingAmount: '',
            availability: [],
            mainImage: '',
            additionalImages: [],
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Set some default categories for now
                setCategories([
                    { id: 1, name: 'Category 1', tags: [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }] },
                    { id: 2, name: 'Category 2', tags: [{ id: 3, name: 'Tag 3' }, { id: 4, name: 'Tag 4' }] },
                ]);
            }
        };
        fetchCategories();
    }, []);

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = (data) => {
        if (currentStep === steps.length - 1) {
            // This is the final step, so we can submit the form
            console.log(data);
            navigate('/manage-listing');
        } else {
            // If it's not the final step, just move to the next step
            handleNext();
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Your Idea</h2>
                        <input
                            {...methods.register('title', { required: 'Title is required' })}
                            placeholder="Title of your listing"
                            className="w-full p-4 border rounded text-xl"
                        />
                        {methods.formState.errors.title && (
                            <p className="text-red-500">{methods.formState.errors.title.message}</p>
                        )}
                        <textarea
                            {...methods.register('description', { required: 'Description is required' })}
                            placeholder="Describe your service"
                            className="w-full p-4 border rounded h-40 text-lg"
                        />
                        {methods.formState.errors.description && (
                            <p className="text-red-500">{methods.formState.errors.description.message}</p>
                        )}
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Location</h2>
                        <input
                            {...methods.register('location', { required: 'Location is required' })}
                            placeholder="Start typing your city"
                            className="w-full p-4 border rounded"
                            onChange={(e) => {
                                methods.setValue('location', e.target.value);
                                // Here you would typically call an API to get city suggestions
                                // For demonstration, we'll use a dummy list
                                const dummySuggestions = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
                                const filteredSuggestions = dummySuggestions.filter(city =>
                                    city.toLowerCase().includes(e.target.value.toLowerCase())
                                );
                                setSuggestions(filteredSuggestions);
                            }}
                        />
                        {methods.formState.errors.location && (
                            <p className="text-red-500">{methods.formState.errors.location.message}</p>
                        )}
                        {suggestions.length > 0 && (
                            <ul className="mt-2 border rounded">
                                {suggestions.map((city, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            methods.setValue('location', city);
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
            case 2:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Category</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => methods.setValue('category', category.id)}
                                    className={`p-4 border rounded ${methods.watch('category') === category.id ? 'bg-blue-500 text-white' : ''
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                const selectedCategory = categories.find(c => c.id === methods.watch('category'));
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Tag</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {selectedCategory?.tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => methods.setValue('tag', tag.id)}
                                    className={`p-4 border rounded ${methods.watch('tag') === tag.id ? 'bg-blue-500 text-white' : ''
                                        }`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Pricing</h2>
                        {/* Main pricing option */}
                        <div className="space-y-2">
                            <select {...methods.register('mainPricingType')} className="w-full p-2 border rounded">
                                <option value="one-time">One-Time</option>
                                <option value="per-hour">Per Hour</option>
                                <option value="per-day">Per Day</option>
                            </select>
                            <input
                                type="number"
                                {...methods.register('mainPricingAmount', { required: 'Price is required' })}
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        {/* Additional pricing options */}
                        {methods.watch('additionalPricing')?.map((_, index) => (
                            <div key={index} className="space-y-2">
                                <select {...methods.register(`additionalPricing.${index}.type`)} className="w-full p-2 border rounded">
                                    <option value="one-time">One-Time</option>
                                    <option value="per-hour">Per Hour</option>
                                    <option value="per-day">Per Day</option>
                                </select>
                                <input
                                    type="number"
                                    {...methods.register(`additionalPricing.${index}.amount`)}
                                    placeholder="Price"
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentPricing = methods.getValues('additionalPricing');
                                        methods.setValue('additionalPricing', currentPricing.filter((_, i) => i !== index));
                                    }}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                const currentPricing = methods.getValues('additionalPricing') || [];
                                methods.setValue('additionalPricing', [...currentPricing, { type: 'one-time', amount: '' }]);
                            }}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Add Pricing Option
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Availability</h2>
                        <p className="text-center text-gray-600">This step is optional. You can set it later.</p>
                        <input
                            type="date"
                            {...methods.register('availability')}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Main Image</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                const formData = new FormData();
                                formData.append('file', file);
                                formData.append('upload_preset', 'your_cloudinary_upload_preset');
                                const response = await fetch(
                                    `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
                                    { method: 'POST', body: formData }
                                );
                                const data = await response.json();
                                methods.setValue('mainImage', data.secure_url);
                            }}
                        />
                        {methods.watch('mainImage') && (
                            <img src={methods.watch('mainImage')} alt="Main" className="w-full h-64 object-cover" />
                        )}
                    </div>
                );
            case 7:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Additional Images</h2>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={async (e) => {
                                const files = Array.from(e.target.files);
                                const uploadedUrls = await Promise.all(
                                    files.map(async (file) => {
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        formData.append('upload_preset', 'your_cloudinary_upload_preset');
                                        const response = await fetch(
                                            `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
                                            { method: 'POST', body: formData }
                                        );
                                        const data = await response.json();
                                        return data.secure_url;
                                    })
                                );
                                methods.setValue('additionalImages', [...methods.getValues('additionalImages'), ...uploadedUrls]);
                            }}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            {methods.watch('additionalImages')?.map((img, index) => (
                                <img key={index} src={img} alt={`Additional ${index}`} className="w-full h-32 object-cover" />
                            ))}
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center">Review Your Listing</h2>
                        <div>
                            <h3 className="font-bold">Title:</h3>
                            <p>{methods.getValues('title')}</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Description:</h3>
                            <p>{methods.getValues('description')}</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Location:</h3>
                            <p>{methods.getValues('location')}</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Category:</h3>
                            <p>{categories.find(c => c.id === methods.getValues('category'))?.name}</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Tag:</h3>
                            <p>{categories.find(c => c.id === methods.getValues('category'))?.tags.find(t => t.id === methods.getValues('tag'))?.name}</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Main Pricing:</h3>
                            <p>{`${methods.getValues('mainPricingType')} - $${methods.getValues('mainPricingAmount')}`}</p>
                        </div>
                        {methods.getValues('additionalPricing')?.map((pricing, index) => (
                            <div key={index}>
                                <h3 className="font-bold">Additional Pricing {index + 1}:</h3>
                                <p>{`${pricing.type} - $${pricing.amount}`}</p>
                            </div>
                        ))}
                        <div>
                            <h3 className="font-bold">Availability:</h3>
                            <p>{methods.getValues('availability') || 'Not set'}</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Main Image:</h3>
                            <img src={methods.getValues('mainImage')} alt="Main" className="w-full h-64 object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold">Additional Images:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {methods.getValues('additionalImages')?.map((img, index) => (
                                    <img key={index} src={img} alt={`Additional ${index}`} className="w-full h-32 object-cover" />
                                ))}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={methods.handleSubmit(onSubmit)}
                            className="w-full px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Submit Listing
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{steps[currentStep]}</h2>
                        <p className="text-gray-600">This step is not implemented yet.</p>
                    </div>
                );
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-white flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-4">Submit your experience</h2>
                    <ul>
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-center mb-3">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                    }`}>
                                    {index < currentStep ? '✓' : ''}
                                </div>
                                <span className={index === currentStep ? 'font-semibold' : ''}>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 p-10">
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            {renderStep()}
                            <div className="flex justify-between mt-8">
                                {currentStep > 0 && (
                                    <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-200 rounded">
                                        Previous
                                    </button>
                                )}
                                {currentStep < steps.length - 1 && (
                                    <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
                                        Next
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default AddServiceListingForm;
