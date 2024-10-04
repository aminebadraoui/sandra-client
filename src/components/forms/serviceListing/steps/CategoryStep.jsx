import React from 'react';
import { useFormContext } from 'react-hook-form';

const CategoryStep = ({ categories, revisionComments }) => {
    const { setValue, watch, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Category</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                            console.log('Setting category:', category.id);
                            setValue('category', category.id);
                        }}
                        className={`p-4 border rounded ${watch('category') === category.id
                            ? 'bg-primary-500 text-white'
                            : 'bg-white'
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            {errors.category && (
                <div className="text-red-500 flex items-center mt-2">
                    <span>{errors.category.message}</span>
                </div>
            )}
        </div>
    );
};

export default CategoryStep;