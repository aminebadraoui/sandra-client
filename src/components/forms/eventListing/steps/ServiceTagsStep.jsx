import React from 'react';
import { useFormContext } from 'react-hook-form';

const ServiceTagsStep = ({ categories }) => {
    const { setValue, watch } = useFormContext();
    const selectedTagIds = watch('tagIds') || [];

    const handleTagToggle = (tagId) => {
        const updatedTagIds = selectedTagIds.includes(tagId)
            ? selectedTagIds.filter(id => id !== tagId)
            : [...selectedTagIds, tagId];
        setValue('tagIds', updatedTagIds);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Service Tags</h2>
            {categories.map((category) => (
                <div key={category.id} className="space-y-4">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {category.tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => handleTagToggle(tag.id)}
                                className={`p-4 border rounded ${selectedTagIds.includes(tag.id)
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white'
                                    }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceTagsStep;