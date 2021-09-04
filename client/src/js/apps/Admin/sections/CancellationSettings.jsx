import React, { useContext, useState, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';


const CancellationSettings = () => {

    // Destructure Context
    const {
        state: {
            settings,
        }
    } = useContext(AppContext);

    // Creeate Local State
    const [state, setState] = useObjectState({})

    // Create Component
    return (
        <div className="account__fields animate-children">
            <h5>Edit Cancellation Policy</h5>
            {/* <AccountField
                title="Update Email Address"
                label="Contact Email"
                value={contact.email}
                submit={{
                    text: "Update Email Address",
                    disabled: contact.email === state.email,
                    data: { email: state.email },
                    endpoint: '/admin',
                    method: 'patch',
                    callback({ error, data, close }) {
                        console.log(error, data);
                    }
                }}
            >
                <Input
                    id="admin-email"
                    type="email"
                    icon="email"
                    label="Email Address"
                    placeholder="admin@unitedtravelflorida.com"
                    value={state.email}
                    onChange={email => setState({ email })}
                />
            </AccountField> */}

        </div>
    )

}


export default CancellationSettings;