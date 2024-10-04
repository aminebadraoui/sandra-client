import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MultiStepFormLayout = ({
    steps,
    currentStep,
    furthestStep,
    isStepValid,
    onPrev,
    onNext,
    onStepClick,
    children
}) => {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 p-6">
                <h2 className="text-xl font-bold mb-4">Submit your {steps[currentStep]}</h2>
                <ul>
                    {steps.map((step, index) => (
                        <li
                            key={index}
                            className={`flex items-center mb-3 ${index <= furthestStep ? 'cursor-pointer' : ''}`}
                            onClick={() => index <= furthestStep && onStepClick(index)}
                        >
                            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${index === currentStep ? 'bg-primary-500 text-white' :
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
                        onClick={onPrev}
                        disabled={currentStep === 0}
                        className={`p-2 rounded-full ${currentStep === 0 ? 'bg-gray-200 text-gray-400' : 'bg-primary-500 text-white'}`}
                    >
                        <FaChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={onNext}
                        disabled={currentStep === steps.length - 1 || (currentStep === furthestStep && !isStepValid)}
                        className={`p-2 rounded-full ${currentStep === steps.length - 1 || (currentStep === furthestStep && !isStepValid) ? 'bg-gray-200 text-gray-400' : 'bg-primary-500 text-white'}`}
                    >
                        <FaChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Form content */}
                <div className="max-w-2xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MultiStepFormLayout;