import React from 'react';
import StyledButton from '../reusable/StyledButton';

const Section = ({ title, children }) => (
    <section className="mt-8 w-full">
        <h2 className="text-3xl font-semibold mb-8">{title}</h2>
        {children}

        <div className="flex justify-center mt-12">
            <div className='w-full md:w-1/6'>
                <StyledButton title="Show More" />
            </div>
        </div>
    </section>
);

export default Section;
