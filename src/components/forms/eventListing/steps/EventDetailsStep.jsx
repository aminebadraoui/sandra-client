import React from 'react';
import { useFormContext } from 'react-hook-form';

const EventDetailsStep = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                <input
                    type="text"
                    id="title"
                    {...register("title", { required: "Event title is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    {...register("description", { required: "Description is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    id="dateFrom"
                    {...register("dateFrom", { required: "Start date is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.dateFrom && <p className="mt-1 text-sm text-red-600">{errors.dateFrom.message}</p>}
            </div>

            <div>
                <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    id="dateTo"
                    {...register("dateTo", { required: "End date is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.dateTo && <p className="mt-1 text-sm text-red-600">{errors.dateTo.message}</p>}
            </div>

            <div>
                <label htmlFor="timeFrom" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                    type="time"
                    id="timeFrom"
                    {...register("timeFrom", { required: "Start time is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.timeFrom && <p className="mt-1 text-sm text-red-600">{errors.timeFrom.message}</p>}
            </div>

            <div>
                <label htmlFor="timeTo" className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                    type="time"
                    id="timeTo"
                    {...register("timeTo", { required: "End time is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.timeTo && <p className="mt-1 text-sm text-red-600">{errors.timeTo.message}</p>}
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    id="location"
                    {...register("location", { required: "Location is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>
        </div>
    );
};

export default EventDetailsStep;