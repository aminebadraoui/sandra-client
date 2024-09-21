import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaExclamationCircle } from 'react-icons/fa';

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

    const handleNext = async () => {
        const isOptionalStep = currentStep === 5 || currentStep === 7; // Availability and Additional images

        if (isOptionalStep) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
            return;
        }

        const isValid = await methods.trigger();
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
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

    const renderErrorMessage = (error) => {
        return (
            <div className="text-red-500 flex items-center mt-2">
                <FaExclamationCircle className="mr-2" />
                <span>{error.message}</span>
            </div>
        );
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Your Idea</h2>
                        <div>
                            <input
                                {...methods.register('title', { required: 'Title is required' })}
                                placeholder="Title of your listing"
                                className="w-full p-2 border rounded"
                            />
                            {methods.formState.errors.title && renderErrorMessage(methods.formState.errors.title)}
                        </div>
                        <div>
                            <textarea
                                {...methods.register('description', { required: 'Description is required' })}
                                placeholder="Describe your service"
                                className="w-full p-2 border rounded h-32"
                            />
                            {methods.formState.errors.description && renderErrorMessage(methods.formState.errors.description)}
                        </div>
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
            case 2: // Category
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Category</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => {
                                        console.log('Setting category:', category.id);
                                        methods.setValue('category', category.id);
                                    }}
                                    className={`p-4 border rounded ${methods.watch('category') === category.id
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-white'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        {methods.formState.errors.category && renderErrorMessage(methods.formState.errors.category)}
                    </div>
                );

            case 3: // Tag
                const selectedCategory = methods.watch('category');
                console.log('Selected Category:', selectedCategory);
                console.log('All Categories:', categories);

                const selectedCategoryObject = categories.find(cat => cat.id === selectedCategory);
                console.log('Selected Category Object:', selectedCategoryObject);

                const selectedCategoryTags = selectedCategoryObject?.tags || [];
                console.log('Selected Category Tags:', selectedCategoryTags);

                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Tag</h2>
                        {selectedCategoryTags.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {selectedCategoryTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => methods.setValue('tag', tag.id)}
                                        className={`p-4 border rounded ${methods.watch('tag') === tag.id
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-white'
                                            }`}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">
                                {selectedCategory ? (
                                    <p>No tags available for the selected category. Please check the console for debugging information.</p>
                                ) : (
                                    <p>Please select a category first to view available tags.</p>
                                )}
                            </div>
                        )}
                        {methods.formState.errors.tag && renderErrorMessage(methods.formState.errors.tag)}
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
                            className="bg-rose-500 text-white px-2 py-1 rounded"
                        >
                            Add Pricing Option
                        </button>
                    </div>
                );
            case 5: // Availability (optional)
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Availability (Optional)</h2>
                        <input
                            type="date"
                            {...methods.register('availability')}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                );
            case 6: // Main image (required)
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Main Image</h2>
                        <input
                            type="file"
                            accept="image/*"
                            {...methods.register('mainImage', { required: 'Main image is required' })}
                            onChange={() => { }}
                        />
                        {methods.formState.errors.mainImage && renderErrorMessage(methods.formState.errors.mainImage)}
                        {methods.watch('mainImage') && (
                            <img src={methods.watch('mainImage')} alt="Main" className="w-full h-64 object-cover" />
                        )}
                    </div>
                );
            case 7: // Additional images (optional)
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Additional Images (Optional)</h2>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={() => { }}
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
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${index === currentStep ? 'bg-rose-500 text-white' : 'bg-gray-300'}`}>
                                    {index < currentStep ? '✓' : ''}
                                </div>
                                <span className={index === currentStep ? 'font-semibold' : ''}>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 p-10">
                    {/* Navigation buttons */}
                    <div className="flex justify-between mb-6">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className={`p-2 rounded-full ${currentStep === 0 ? 'bg-gray-200 text-gray-400' : 'bg-rose-500 text-white'}`}
                        >
                            <FaChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentStep === steps.length - 1}
                            className={`p-2 rounded-full ${currentStep === steps.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-rose-500 text-white'}`}
                        >
                            <FaChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form content */}
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            {renderStep()}
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default AddServiceListingForm;
