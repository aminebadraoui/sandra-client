import React from 'react';
import { useFormContext } from 'react-hook-form';
import ImageUpload from '../../../reusable/ImageUpload';

const MainImageStep = () => {
    const { setValue, watch } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Main Image</h2>
            <ImageUpload
                onUpload={(url) => setValue('mainImage', url)}
            />
            {watch('mainImage') && (
                <img src={watch('mainImage')} alt="Main" className="w-full h-64 object-cover rounded-lg" />
            )}
        </div>
    );
};

export default MainImageStep;