import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import MultiStepFormLayout from '../../04.templates/MultiStepFormLayout';
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
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(steps.length - 1);
    const [categories, setCategories] = useState([]);
    const [isStepValid, setIsStepValid] = useState(true);

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
        // Fetch the service listing data and populate the form
        const fetchServiceListing = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch service listing');
                }
                const data = await response.json();
                methods.reset(data);
            } catch (error) {
                console.error('Error fetching service listing:', error);
            }
        };

        fetchServiceListing();
    }, [id, methods]);

    useEffect(() => {
        validateStep();
    }, [currentStep, methods.watch()]);

    const validateStep = () => {
        const values = methods.getValues();
        console.log('Validating step:', currentStep);
        console.log('Current form values:', values);

        switch (currentStep) {
            case 0: // Your idea
                const { title, description } = values;
                const isValid = Boolean(title && description);
                console.log('Your idea step valid:', isValid);
                setIsStepValid(isValid);
                break;
            case 1: // Location
                const locationValid = Boolean(values.location);
                console.log('Location step valid:', locationValid);
                setIsStepValid(locationValid);
                break;
            case 2: // Category
                const categoryValid = Boolean(values.category);
                console.log('Category step valid:', categoryValid);
                setIsStepValid(categoryValid);
                break;
            case 3: // Tag
                const tagValid = Boolean(values.tag);
                console.log('Tag step valid:', tagValid);
                setIsStepValid(tagValid);
                break;
            case 4: // Pricing Types
                const pricingTypesValid = values.pricingTypes && values.pricingTypes.length > 0;
                console.log('Pricing Types step valid:', pricingTypesValid);
                setIsStepValid(pricingTypesValid);
                break;
            case 5: // Pricing Details
                const pricingDetailsValid = values.pricingCurrency && Object.values(values.pricing).every(p => p.amount > 0);
                console.log('Pricing Details step valid:', pricingDetailsValid);
                setIsStepValid(pricingDetailsValid);
                break;
            case 6: // Main image
                const mainImageValid = Boolean(values.mainImage);
                console.log('Main image step valid:', mainImageValid);
                setIsStepValid(mainImageValid);
                break;
            case 7: // Additional images
                setIsStepValid(true);
                break;
            case 8: // Review
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
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/service-listings/${id}`, {
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
                console.error('Failed to update service listing:', errorData);
                // Show an error message to the user here
            }
        } catch (error) {
            console.error('Error updating service listing:', error);
            // Show an error message to the user here
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
                </form>
            </MultiStepFormLayout>
        </FormProvider>
    );
};

export default EditServiceListingForm;