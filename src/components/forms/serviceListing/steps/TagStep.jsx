import React from 'react';
import { useFormContext } from 'react-hook-form';

const TagStep = ({ categories, revisionComments }) => {
    const { setValue, watch, formState: { errors } } = useFormContext();

    const selectedCategory = watch('category');
    const selectedCategoryObject = categories.find(cat => cat.id === selectedCategory);
    const selectedCategoryTags = selectedCategoryObject?.tags || [];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Tag</h2>
            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}

            {selectedCategoryTags.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {selectedCategoryTags.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => setValue('tag', tag.id)}
                            className={`p-4 border rounded ${watch('tag') === tag.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white'
                                }`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    {selectedCategory ? (
                        <p>No tags available for the selected category. Please check the console for debugging information.</p>
                    ) : (
                        <p>Please select a category first to view available tags.</p>
                    )}
                </div>
            )}
            {errors.tag && (
                <div className="text-red-500 flex items-center mt-2">
                    <span>{errors.tag.message}</span>
                </div>
            )}
        </div>
    );
};

export default TagStep;
