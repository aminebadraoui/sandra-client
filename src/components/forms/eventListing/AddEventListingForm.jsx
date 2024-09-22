import React from 'react';
import StepForm from '../StepForm';
import EventDetailsStep from './steps/EventDetailsStep';
import EventDateTimeStep from './steps/EventDateTimeStep';
import EventLocationStep from './steps/EventLocationStep';
import EventCategoryStep from './steps/EventCategoryStep';
import EventTicketingStep from './steps/EventTicketingStep';
import EventImageStep from './steps/EventImageStep';
import EventReviewStep from './steps/EventReviewStep';

const steps = [
    'Event Details',
    'Date and Time',
    'Location',
    'Category',
    'Ticketing',
    'Images',
    'Review'
];

const defaultValues = {
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    location: '',
    category: '',
    ticketTypes: [],
    mainImage: '',
    additionalImages: [],
};

const AddEventListingForm = () => {
    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <StepForm steps={steps} defaultValues={defaultValues} onSubmit={onSubmit}>
            <EventDetailsStep />
            <EventDateTimeStep />
            <EventLocationStep />
            <EventCategoryStep />
            <EventTicketingStep />
            <EventImageStep />
            <EventReviewStep />
        </StepForm>
    );
};

export default AddEventListingForm;
