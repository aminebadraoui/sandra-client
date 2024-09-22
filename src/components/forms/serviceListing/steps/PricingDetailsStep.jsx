import React from 'react';
import { useFormContext } from 'react-hook-form';

const currencies = ['USD', 'EUR', 'GBP', 'JPY']; // Add more as needed

const pricingTypes = [
    { value: 'one-time', label: 'One-Time' },
    { value: 'per-hour', label: 'Per Hour' },
    { value: 'per-day', label: 'Per Day' }
];

const PricingDetailsStep = ({ revisionComments }) => {
    const { register, watch } = useFormContext();
    const selectedTypes = watch('pricingTypes') || [];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Pricing Details</h2>

            {revisionComments && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p className="font-bold">Revision Comments:</p>
                    <p>{revisionComments}</p>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                    {...register('pricingCurrency', { required: 'Currency is required' })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
                >
                    <option value="">Select currency</option>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            {selectedTypes.map((type) => (
                <div key={type} className="space-y-2">
                    <h3 className="font-semibold">{pricingTypes.find(t => t.value === type).label}</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">{watch('pricingCurrency')}</span>
                        <input
                            type="number"
                            {...register(`pricing.${type}.amount`, { required: 'Price is required' })}
                            placeholder="Price"
                            className="flex-grow p-2 border rounded"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PricingDetailsStep;