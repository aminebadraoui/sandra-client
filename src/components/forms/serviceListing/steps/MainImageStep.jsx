import React from 'react';
import { useFormContext } from 'react-hook-form';
import ImageUpload from '../../../reusable/ImageUpload';

const MainImageStep = ({ revisionComments }) => {
    const { setValue, watch } = useFormContext();


    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Main Image</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}

            <ImageUpload
                onUpload={(url) => setValue('mainImage', url)}
            />
            {watch('mainImage') && (
                <img src={watch('mainImage')} alt="Main" className="w-full h-64 object-cover rounded-lg" />
            )}

            {revisionComments?.mainImage && (
                <div className="mt-4 p-4 bg-yellow-100 rounded">
                    <p className="font-semibold">Admin comment:</p>
                    <p>{revisionComments.mainImage}</p>
                </div>
            )}
        </div>
    );
};

export default MainImageStep;