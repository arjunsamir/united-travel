// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';

// Utilities
import { bemify } from '../../helpers/utils';
const bc = bemify('booking-card');


const Notes = ({ navigateTo, updateState, map }) => {

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Destructure State
    const { notes } = state.reservation;

    return (
        <BookingCard
            title={<>Booking <span>notes.</span></>}
            text="Please let us know if there are any special accomodations you would like, or if there is anything else that you would like us to know."
            allowed={['previous', 'next']}
            previous={() => navigateTo('vehicle')}
            showLoader={!map}
            next={() => navigateTo('summary')}
        >
            <div className={bc('fieldset')}>
                <label className="textarea">
                    <textarea
                        value={notes}
                        placeholder="Let us know if there is anything that we can do for you."
                        onChange={e => updateState('NOTES', e.target.value)}
                    />
                    <h6>Your Notes &amp; Comments</h6>
                </label>
            </div>

        </BookingCard>
    )

}

export default Notes;
