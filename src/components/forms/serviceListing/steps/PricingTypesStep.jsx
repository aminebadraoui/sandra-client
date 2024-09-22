import React from 'react';
import { useFormContext } from 'react-hook-form';

const pricingTypes = [
    { value: 'one-time', label: 'One-Time' },
    { value: 'per-hour', label: 'Per Hour' },
    { value: 'per-day', label: 'Per Day' }
];

const PricingTypesStep = ({ revisionComments }) => {
    const { setValue, watch } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Pricing Types</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {pricingTypes.map((type) => (
                    <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                            const currentTypes = watch('pricingTypes') || [];
                            const updatedTypes = currentTypes.includes(type.value)
                                ? currentTypes.filter(t => t !== type.value)
                                : [...currentTypes, type.value];
                            setValue('pricingTypes', updatedTypes);
                        }}
                        className={`p-4 border rounded ${watch('pricingTypes')?.includes(type.value)
                            ? 'bg-rose-500 text-white'
                            : 'bg-white'
                            }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PricingTypesStep;
