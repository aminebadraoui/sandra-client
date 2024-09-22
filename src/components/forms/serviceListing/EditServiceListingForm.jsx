import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import IdeaStep from './steps/IdeaStep';
import LocationStep from './steps/LocationStep';
import CategoryStep from './steps/CategoryStep';
import TagStep from './steps/TagStep';
import PricingTypesStep from './steps/PricingTypesStep';
import PricingDetailsStep from './steps/PricingDetailsStep';
import MainImageStep from './steps/MainImageStep';
import AdditionalImagesStep from './steps/AdditionalImagesStep';
import ReviewStep from './steps/ReviewStep';

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

const EditServiceListingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const methods = useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [isStepValid, setIsStepValid] = useState(false);
    const [revisionComments, setRevisionComments] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchListingData();
        fetchCategories();
    }, []);

    const fetchListingData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched data:', data); // For debugging
                // Transform the data to match the form structure
                const formData = {
                    ...data,
                    category: data.serviceTag?.category?.id,
                    tag: data.serviceTag?.id,
                    pricingTypes: Object.keys(data.pricing || {}),
                    pricingCurrency: data.currency,
                    ...Object.entries(data.pricing || {}).reduce((acc, [type, details]) => {
                        acc[`pricing_${type}`] = details.amount;
                        return acc;
                    }, {})
                };
                console.log('Transformed form data:', formData); // For debugging
                methods.reset(formData);
                setRevisionComments(data.revisionComments || {});
                setIsLoading(false);
            } else {
                throw new Error('Failed to fetch listing data');
            }
        } catch (error) {
            console.error('Error fetching listing data:', error);
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                throw new Error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            validateStep();
        }
    }, [currentStep, methods.watch(), isLoading]);

    const validateStep = () => {
        const values = methods.getValues();
        switch (currentStep) {
            case 0: // Your idea
                setIsStepValid(values.title?.trim() !== '' && values.description?.trim() !== '');
                break;
            case 1: // Location
                setIsStepValid(values.location?.trim() !== '');
                break;
            case 2: // Category
                setIsStepValid(values.category !== '');
                break;
            case 3: // Tag
                setIsStepValid(values.tag !== '');
                break;
            case 4: // Pricing Types
                setIsStepValid(values.pricingTypes?.length > 0);
                break;
            case 5: // Pricing Details
                setIsStepValid(
                    values.pricingCurrency !== '' &&
                    values.pricingTypes?.every(type => values.pricing?.[type]?.amount > 0)
                );
                break;
            case 6: // Main image
                setIsStepValid(values.mainImage !== '');
                break;
            case 7: // Additional images (always valid)
                setIsStepValid(true);
                break;
            default:
                setIsStepValid(false);
        }
    };

    const handleNext = () => {
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (currentStep === steps.length - 1) {
            onSubmit(methods.getValues());
        } else {
            handleNext();
        }
    };

    const onSubmit = async (data) => {
        try {
            console.log('Form data before transformation:', data); // For debugging
            // Transform the form data back to the API structure
            const apiData = {
                ...data,
                serviceTag: data.tag, // This should be the ID of the selected tag
                currency: data.pricingCurrency,
                pricing: data.pricingTypes.reduce((acc, type) => {
                    acc[type] = { amount: parseFloat(data[`pricing_${type}`]) };
                    return acc;
                }, {}),
                status: 'in_review'
            };
            console.log('Transformed API data:', apiData); // For debugging

            const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(apiData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Listing updated:', result);
                navigate('/manage-listings/in-review');
            } else {
                throw new Error('Failed to update listing');
            }
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <IdeaStep revisionComments={revisionComments.idea} />;
            case 1:
                return <LocationStep revisionComments={revisionComments.location} />;
            case 2:
                return <CategoryStep categories={categories} revisionComments={revisionComments.category} />;
            case 3:
                return <TagStep categories={categories} revisionComments={revisionComments.tag} />;
            case 4:
                return <PricingTypesStep revisionComments={revisionComments.pricingTypes} />;
            case 5:
                return <PricingDetailsStep revisionComments={revisionComments.pricing} />;
            case 6:
                return <MainImageStep revisionComments={revisionComments.mainImage} />;
            case 7:
                return <AdditionalImagesStep revisionComments={revisionComments.additionalImages} />;
            case 8:
                return <ReviewStep categories={categories} />;
            default:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{steps[currentStep]}</h2>
                        <p className="text-gray-600">This step is not implemented yet.</p>
                    </div>
                );
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-white flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-4">Edit your experience</h2>
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
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            {renderStep()}
                            <div className="flex justify-between mt-6">
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
                                    >
                                        Previous
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition duration-200"
                                >
                                    {currentStep === steps.length - 1 ? 'Update Listing' : 'Next'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default EditServiceListingForm;