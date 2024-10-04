import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import MultiStepFormLayout from '../../04.templates/MultiStepFormLayout';
import EventDetailsStep from './steps/EventDetailsStep';
import ServiceTagsStep from './steps/ServiceTagsStep';
import ReviewStep from './steps/ReviewStep';

const steps = [
    'Event Details',
    'Service Tags',
    'Review'
];

const EditEventListingForm = () => {
    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(2);
    const [categories, setCategories] = useState([]);
    const [isStepValid, setIsStepValid] = useState(true);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',
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
        const fetchEventListing = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/event-listings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch event listing');
                }
                const data = await response.json();
                console.log('Fetched event data:', data); // Log the fetched data
                methods.reset({
                    ...data,
                    tagIds: data.serviceTagIds // Assuming serviceTags is an array of tag objects
                });
            } catch (error) {
                console.error('Error fetching event listing:', error);
            }
        };

        fetchEventListing();
    }, [id, methods]);

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

    useEffect(() => {
        validateStep();
    }, [currentStep, methods.watch()]);

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

    // Include fetchCategories, validateStep, handleNext, handlePrev, goToStep functions here
    // These can be similar to AddEventListingForm

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/event-listings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate('/manage-listings');
            } else {
                const errorData = await response.json();
                console.error('Failed to update event listing:', errorData);
                // Show an error message to the user here
            }
        } catch (error) {
            console.error('Error updating event listing:', error);
            // Show an error message to the user here
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <EventDetailsStep />;
            case 1:
                return <ServiceTagsStep categories={categories} />;
            case 2:
                return <ReviewStep categories={categories} />;
            default:
                return null;
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

export default EditEventListingForm;