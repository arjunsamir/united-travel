// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Molecules
import Select from '../../components/molecules/Select';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';

// Utilities
import { bemify } from '../../helpers/utils';
const bc = bemify('booking-card');

// Dropdown Options
const options = [
    {
        title: 'Sedan',
        text: 'Up to 3 passengers',
        value: 'sedan',
        img: {
            src: '/img/vehicles/thumbs/small.webp',
            alt: 'Standard Vehicle'
        }
    },
    {
        title: 'Full',
        text: 'Up to 7 passengers',
        value: 'full',
        img: {
            src: '/img/vehicles/thumbs/medium.png',
            alt: 'Full Size Vehicle'
        }
    },
    {
        title: 'Extra Large',
        text: 'Up to 11 passengers',
        value: 'xl',
        img: {
            src: '/img/vehicles/thumbs/large.png',
            alt: 'Large Vehicle'
        }
    },
    {
        title: 'Super',
        text: 'Up to 14 passengers',
        value: 'super',
        img: {
            src: '/img/vehicles/thumbs/x-large.png',
            alt: 'Extra-Large Vehicle'
        }
    }
];

const Vehicle = ({ navigateTo, updateState, map }) => {

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Destructure State
    const { vehicle } = state.reservation;

    // Choose Default Selected Element
    const selected = options.filter(opt => opt.value === vehicle)

    // Set Up State To Track Allowed Naviation Actions
    const allowed = selected.length ? ['previous', 'next'] : ['previous'];

    return (
        <BookingCard
            title={<>Select a <span>vehicle.</span></>}
            text={<>Need something bigger? <a href="#">Contact us for more options.</a></>}
            allowed={allowed}
            previous={() => navigateTo('passengers')}
            showLoader={!map}
            next={() => navigateTo('notes')}
        >
            <div className={bc('fieldset')}>
                <Select
                    type="radio"
                    options={options}
                    name="vehicle"
                    selected={selected}
                    onChange={(e) => updateState('VEHICLE', e.value)}
                />
            </div>

        </BookingCard>
    )

}

export default Vehicle;
