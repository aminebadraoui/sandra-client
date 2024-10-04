import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MultiStepFormLayout from '../MultiStepFormLayout';
import EventDetailsStep from './steps/EventDetailsStep';
import ServiceTagsStep from './steps/ServiceTagsStep';
import ReviewStep from './steps/ReviewStep';

const steps = [
    'Event Details',
    'Service Tags',
    'Review'
];

const AddEventListingForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [isStepValid, setIsStepValid] = useState(false);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',  // Changed from eventName to title
            description: '',
            dateFrom: '',
            dateTo: '',
            timeFrom: '',
            timeTo: '',
            location: '',
            tagIds: [],
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
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    const validateStep = () => {
        const values = methods.getValues();
        console.log('Validating step:', currentStep);
        console.log('Current form values:', values);

        switch (currentStep) {
            case 0: // Event Details
                const { title, description, dateFrom, dateTo, timeFrom, timeTo, location } = values;  // Changed eventName to title
                const isValid = Boolean(title && description && dateFrom && dateTo && timeFrom && timeTo && location);
                console.log('Event Details step valid:', isValid);
                setIsStepValid(isValid);
                break;
            case 1: // Service Tags
                const tagsValid = values.tagIds && values.tagIds.length > 0;
                console.log('Service Tags step valid:', tagsValid);
                setIsStepValid(tagsValid);
                break;
            case 2: // Review
                setIsStepValid(true);
                break;
            default:
                setIsStepValid(false);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1 && isStepValid) {
            setCurrentStep(currentStep + 1);
            setFurthestStep(Math.max(furthestStep, currentStep + 1));
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goToStep = (stepIndex) => {
        if (stepIndex <= furthestStep) {
            setCurrentStep(stepIndex);
        }
    };

    const onSubmit = async (data) => {
        if (currentStep === steps.length - 1) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/event-listings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        ...data,
                        status: 'in_review',
                    })
                });

                if (response.ok) {
                    navigate('/manage-listings/in-review');
                } else {
                    const errorData = await response.json();
                    console.error('Failed to submit event:', errorData);
                    // Show an error message to the user here
                }
            } catch (error) {
                console.error('Error submitting event:', error);
                // Show an error message to the user here
            }
        } else {
            handleNext();
        }
    };

    return (
        <FormProvider {...methods}>
            <MultiStepFormLayout
                steps={steps}
                currentStep={currentStep}
                furthestStep={furthestStep}
                isStepValid={isStepValid}
                onPrev={handlePrev}
                onNext={handleNext}
                onStepClick={goToStep}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    {currentStep === 0 && <EventDetailsStep />}
                    {currentStep === 1 && <ServiceTagsStep categories={categories} />}
                    {currentStep === 2 && <ReviewStep categories={categories} />}

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
                            disabled={currentStep === furthestStep && !isStepValid}
                            className={`px-6 py-2 rounded ${currentStep === furthestStep && !isStepValid
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary-500 text-white hover:bg-rose-600'
                                }`}
                        >
                            {currentStep === steps.length - 1 ? 'Submit For Review' : 'Next'}
                        </button>
                    </div>
                </form>
            </MultiStepFormLayout>
        </FormProvider>
    );
};

export default AddEventListingForm;