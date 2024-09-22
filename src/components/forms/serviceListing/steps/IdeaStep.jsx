import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaExclamationCircle } from 'react-icons/fa';

const IdeaStep = ({ revisionComments }) => {
    const { register, formState: { errors } } = useFormContext();

    const renderErrorMessage = (error) => {
        return (
            <div className="text-red-500 flex items-center mt-2">
                <FaExclamationCircle className="mr-2" />
                <span>{error.message}</span>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Your Idea</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}
            <div>
                <input
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Title of your listing"
                    className="w-full p-2 border rounded"
                />
                {errors.title && renderErrorMessage(errors.title)}
            </div>
            <div>
                <textarea
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Describe your service"
                    className="w-full p-2 border rounded h-32"
                />
                {errors.description && renderErrorMessage(errors.description)}
            </div>

            {revisionComments?.idea && (
                <div className="mt-4 p-4 bg-yellow-100 rounded">
                    <p className="font-semibold">Admin comment:</p>
                    <p>{revisionComments.idea}</p>
                </div>
            )}
        </div>
    );
};

export default IdeaStep;
