import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StepForm = ({ steps, defaultValues, onSubmit, children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false);
    const methods = useForm({ defaultValues });

    useEffect(() => {
        validateStep();
    }, [currentStep, methods.watch()]);

    const validateStep = async () => {
        // This should be implemented by the parent component
        // and passed as a prop if needed
        setIsStepValid(true); // Placeholder
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

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-white flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-4">Submit your listing</h2>
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
                            {React.Children.toArray(children)[currentStep]}
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default StepForm;
