import React, { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaExclamationCircle, FaStar } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

const steps = [
    'Your idea',
    'Location',
    'Category',
    'Tag',
    'Pricing Types',
    'Pricing Details',
    'Main image',
    'Additional images',
    'Review'
];

const pricingTypes = [
    { value: 'one-time', label: 'One-Time' },
    { value: 'per-hour', label: 'Per Hour' },
    { value: 'per-day', label: 'Per Day' }
];

const currencies = ['USD', 'EUR', 'GBP', 'JPY']; // Add more as needed

const AddServiceListingForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const methods = useForm({
        defaultValues: {
            title: '',
            description: '',
            location: '',
            category: '',
            tag: '',
            pricingTypes: [],
            pricing: {},
            pricingCurrency: '',
            mainImage: '',
            additionalImages: [],
        }
    });
    const navigate = useNavigate();

    const [isStepValid, setIsStepValid] = useState(false);

    useEffect(() => {
        validateStep();
    }, [currentStep, methods.watch()]);

    const validateStep = async () => {
        switch (currentStep) {
            case 0: // Your idea
                const { title, description } = methods.getValues();
                setIsStepValid(title.trim() !== '' && description.trim() !== '');
                break;
            case 1: // Location
                setIsStepValid(methods.getValues('location').trim() !== '');
                break;
            case 2: // Category
                setIsStepValid(methods.getValues('category') !== '');
                break;
            case 3: // Tag
                setIsStepValid(methods.getValues('tag') !== '');
                break;
            case 4: // Pricing Types
                setIsStepValid(methods.getValues('pricingTypes').length > 0);
                break;
            case 5: // Pricing Details
                const { pricing, pricingCurrency, pricingTypes } = methods.getValues();
                setIsStepValid(
                    pricingCurrency !== '' &&
                    pricingTypes.every(type => pricing[type]?.amount > 0)
                );
                break;
            case 6: // Main image
                setIsStepValid(methods.getValues('mainImage') !== '');
                break;
            case 7: // Additional images (always valid)
                setIsStepValid(true);
                break;
            default:
                setIsStepValid(false);
        }
    };

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

    const ImageUpload = ({ onUpload, multiple = false }) => {
        const [isUploading, setIsUploading] = useState(false);

        const onDrop = useCallback(async (acceptedFiles) => {
            setIsUploading(true);
            const uploadedUrls = await Promise.all(acceptedFiles.map(uploadImage));
            onUpload(multiple ? uploadedUrls : uploadedUrls[0]);
            setIsUploading(false);
        }, [onUpload, multiple]);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple });

        return (
            <div className="space-y-4">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-rose-500'
                        }`}
                >
                    <input {...getInputProps()} />
                    <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                    {isDragActive ? (
                        <p className="text-rose-500">Drop the image(s) here ...</p>
                    ) : (
                        <p className="text-gray-500">Drag 'n' drop image(s) here, or click to select files</p>
                    )}
                </div>
                {isUploading && (
                    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
                )}
            </div>
        );
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'vdlfsgok');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dbwefnkfe/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                methods.setValue(field, imageUrl);
            }
        }
    };

    const handleNext = async () => {
        if (isStepValid) {
            const nextStep = Math.min(currentStep + 1, steps.length - 1);
            setCurrentStep(nextStep);
            setFurthestStep(Math.max(furthestStep, nextStep));
        }
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const goToStep = (stepIndex) => {
        if (stepIndex <= furthestStep) {
            setCurrentStep(stepIndex);
        }
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
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
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
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
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
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
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
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 4: // Pricing Types
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Pricing Types</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {pricingTypes.map((type) => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => {
                                        const currentTypes = methods.getValues('pricingTypes') || [];
                                        const updatedTypes = currentTypes.includes(type.value)
                                            ? currentTypes.filter(t => t !== type.value)
                                            : [...currentTypes, type.value];
                                        methods.setValue('pricingTypes', updatedTypes);
                                    }}
                                    className={`p-4 border rounded ${methods.watch('pricingTypes')?.includes(type.value)
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-white'
                                        }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 5: // Pricing Details
                const selectedTypes = methods.watch('pricingTypes') || [];
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Pricing Details</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Currency</label>
                            <select
                                {...methods.register('pricingCurrency', { required: 'Currency is required' })}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
                            >
                                <option value="">Select currency</option>
                                {currencies.map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                        {selectedTypes.map((type) => (
                            <div key={type} className="space-y-2">
                                <h3 className="font-semibold">{pricingTypes.find(t => t.value === type).label}</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500">{methods.watch('pricingCurrency')}</span>
                                    <input
                                        type="number"
                                        {...methods.register(`pricing.${type}.amount`, { required: 'Price is required' })}
                                        placeholder="Price"
                                        className="flex-grow p-2 border rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 6: // Main image
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Main Image</h2>
                        <ImageUpload
                            onUpload={(url) => methods.setValue('mainImage', url)}
                        />
                        {methods.watch('mainImage') && (
                            <img src={methods.watch('mainImage')} alt="Main" className="w-full h-64 object-cover rounded-lg" />
                        )}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 7: // Additional images
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center">Additional Images</h2>
                        <ImageUpload
                            onUpload={(urls) => {
                                const currentImages = methods.getValues('additionalImages') || [];
                                methods.setValue('additionalImages', [...currentImages, ...urls]);
                            }}
                            multiple
                        />
                        <div className="grid grid-cols-3 gap-4">
                            {methods.watch('additionalImages')?.map((img, index) => (
                                <img key={index} src={img} alt={`Additional ${index}`} className="w-full h-32 object-cover rounded-lg" />
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 8: // Review
                const formData = methods.getValues();
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
                                    {Object.entries(formData.pricing).map(([type, { amount, currency }]) => (
                                        <p key={type}>{`${pricingTypes.find(t => t.value === type).label} - ${currency} ${amount}`}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={methods.handleSubmit(onSubmit)}
                                className="px-6 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                            >
                                Submit Listing
                            </button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{steps[currentStep]}</h2>
                        <p className="text-gray-600">This step is not implemented yet.</p>
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={currentStep === furthestStep && !isStepValid}
                                className={`px-6 py-2 rounded ${currentStep < furthestStep || isStepValid
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
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
                            <li
                                key={index}
                                className={`flex items-center mb-3 ${index <= furthestStep ? 'cursor-pointer' : ''}`}
                                onClick={() => goToStep(index)}
                            >
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${index === currentStep ? 'bg-rose-500 text-white' :
                                    index <= furthestStep ? 'bg-green-500 text-white' : 'bg-gray-300'
                                    }`}>
                                    {index < furthestStep ? '✓' : ''}
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
                            disabled={currentStep === steps.length - 1 || (currentStep === furthestStep && !isStepValid)}
                            className={`p-2 rounded-full ${currentStep === steps.length - 1 || (currentStep === furthestStep && !isStepValid) ? 'bg-gray-200 text-gray-400' : 'bg-rose-500 text-white'}`}
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
