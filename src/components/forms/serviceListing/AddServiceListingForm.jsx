import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

const AddServiceListingForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [isStepValid, setIsStepValid] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            location: '',
            category: '',
            tag: '',
            pricingTypes: [],
            pricingCurrency: '',
            pricing: {},
            mainImage: '',
            additionalImages: [],
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        validateStep();
    }, [currentStep, methods.watch()]);

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

    const handleNext = async () => {
        if (isStepValid) {
            const nextStep = Math.min(currentStep + 1, steps.length - 1);
            setCurrentStep(nextStep);
            setFurthestStep(Math.max(furthestStep, nextStep));

            // If it's the last step, don't automatically submit
            if (nextStep === steps.length - 1) {
                return;
            }
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
        console.log("Form submit triggered");
        if (currentStep === steps.length - 1) {
            console.log("Last step reached, attempting submission");
            onSubmit(methods.getValues());
        } else {
            console.log("Moving to next step");
            handleNext();
        }
    };

    const onSubmit = async (data) => {
        console.log("onSubmit function called", data);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...data,
                    status: 'in_review',
                    currency: data.pricingCurrency
                })
            });

            console.log("API response received", response);

            if (response.ok) {
                const result = await response.json();
                console.log('Listing submitted for review:', result);
                navigate('/manage-listings?status=in_review');
            } else {
                console.error('Failed to submit listing');
            }
        } catch (error) {
            console.error('Error submitting listing:', error);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <IdeaStep />;
            case 1:
                return <LocationStep />;
            case 2:
                return <CategoryStep categories={categories} />;
            case 3:
                return <TagStep categories={categories} />;
            case 4:
                return <PricingTypesStep />;
            case 5:
                return <PricingDetailsStep />;
            case 6:
                return <MainImageStep />;
            case 7:
                return <AdditionalImagesStep />;
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
                                    {currentStep === steps.length - 1 ? 'Submit Listing' : 'Next'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default AddServiceListingForm;