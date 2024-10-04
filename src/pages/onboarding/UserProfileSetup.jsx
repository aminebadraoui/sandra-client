import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ProfilePictureStep from './steps/ProfilePictureStep';
import BioStep from './steps/BioStep';
import ServiceTagsStep from './steps/ServiceTagsStep';

const steps = ['Profile Picture', 'Bio', 'Service Tags'];

const UserProfileSetup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const methods = useForm();

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <ProfilePictureStep />;
            case 1:
                return <BioStep />;
            case 2:
                return <ServiceTagsStep />;
            default:
                return null;
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">{steps[currentStep]}</h2>
                    {renderStep()}
                    <div className="flex justify-between mt-6">
                        {currentStep > 0 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                            >
                                Previous
                            </button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-primary-500 text-white rounded"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary-500 text-white rounded"
                            >
                                Finish
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default UserProfileSetup;