import React from 'react';
import { useFormContext } from 'react-hook-form';
import ImageUpload from '../../../reusable/ImageUpload';

const AdditionalImagesStep = () => {
    const { setValue, watch } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Additional Images</h2>
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