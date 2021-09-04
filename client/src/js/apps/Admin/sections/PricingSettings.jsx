import React, { useContext, useState, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';


const $$ = (cents) => (cents / 100).toFixed(2);


const PricingSettings = () => {

    // Destructure Context
    const {
        state: {
            settings: { thresholds },
        }
    } = useContext(AppContext);

    // Creeate Local State
    const [state, setState] = useObjectState({
        tourist: thresholds.tourist
    })

    console.log(settings);

    // Create Component
    return (
        <div className="account__fields animate-children">
            <h5>Edit Pricing Algorithm</h5>
            <AccountField
                title="Tourist Threshold"
                label="Tourist Threshold"
                value={`${thresholds.tourist} Miles`}
                submit={{
                    text: "Update Tourist Threshold",
                    disabled: thresholds.tourist === state.tourist,
                    data: {},
                    endpoint: '/admin',
                    method: 'patch',
                    callback({ error, data, close }) {
                        console.log(error, data);
                    }
                }}
            >
                <p className="small animate-item">This is the maximum distance that the tourist threshold will be applied to.</p>
                <Input
                    id="tourist-threshold"
                    type="number"
                    icon="location-pin"
                    label="Threshold"
                    placeholder="50"
                    value={state.tourist}
                    onChange={t => setState({ tourist: t })}
                />
            </AccountField>

        </div>
    )

}


export default PricingSettings;