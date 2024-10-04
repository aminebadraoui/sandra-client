import React from 'react';
import { useFormContext } from 'react-hook-form';
import ImageUpload from '../../../04.templates/ImageUpload';

const AdditionalImagesStep = ({ revisionComments }) => {
    const { setValue, watch } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Additional Images</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}
            <ImageUpload
                onUpload={(urls) => {
                    const currentImages = watch('additionalImages') || [];
                    setValue('additionalImages', [...currentImages, ...urls]);
                }}
                multiple
            />
            <div className="grid grid-cols-3 gap-4">
                {watch('additionalImages')?.map((img, index) => (
                    <img key={index} src={img} alt={`Additional ${index}`} className="w-full h-32 object-cover rounded-lg" />
                ))}
            </div>
        </div>
    );
};

export default AdditionalImagesStep;