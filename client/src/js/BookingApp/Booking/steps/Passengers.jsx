// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Atoms
import NumberInput from '../../components/atoms/NumberInput';

// Import Molecules
import Field from '../../components/molecules/Field';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';
import Input from '../../components/organisms/Input';

// Import Utils
import { bemify } from '../../helpers/utils';

// Flight Location Step
const Passengers = ({ navigateTo, updateState, map }) => {

    // Create bemify instance
    const bc = bemify('booking-card');

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Create Shortcut
    const { passengers, luggage } = state.reservation;
    const { adults, children, infants } = passengers;
    const { small, medium, large } = luggage;

    // Create Input Handlers
    const createHandler = (type, key) => {
        return (e) => {
            let value = parseInt(e?.target?.value) || "";
            updateState(type, { key, value })
        }  
    }

    // Crreate Rendered Component
    return (
        <BookingCard
            title={<><span>Passenger</span> information</>}
            allowed={['previous', 'next']}
            previous={() => navigateTo('route')}
            showLoader={!map}
            next={() => navigateTo('vehicle')}
        >
            {map && (<>
                <div className={bc('fieldset')}>
                    <h4 className={bc('fieldset-title')}>Passengers</h4>
                    <Input icon="people">

                        <Field label="Adults">
                            <NumberInput
                                min="1"
                                value={adults}
                                onChange={createHandler('PASSENGERS', 'adults')}
                            />
                        </Field>
                        
                        <Field label="Children">
                            <NumberInput
                                value={children}
                                onChange={createHandler('PASSENGERS', 'children')}
                            />
                        </Field>
                        
                        <Field label="Infants">
                            <NumberInput
                                value={infants}
                                onChange={createHandler('PASSENGERS', 'infants')}
                            />
                        </Field>

                    </Input>
                </div>
                
                <div className={bc('fieldset')}>
                    <h4 className={bc('fieldset-title')}>Luggage</h4>
                    <Input icon="luggage">

                        <Field label="Small">
                            <NumberInput
                                value={small}
                                onChange={createHandler('LUGGAGE', 'small')}
                            />
                        </Field>

                        <Field label="Medium">
                            <NumberInput
                                value={medium}
                                onChange={createHandler('LUGGAGE', 'medium')}
                            />
                        </Field>
            
                        <Field label="Large">
                            <NumberInput
                                value={large}
                                onChange={createHandler('LUGGAGE', 'large')}
                            />
                        </Field>

                    </Input>
                </div>
            </>)}

        </BookingCard>
    )

}

export default Passengers;
