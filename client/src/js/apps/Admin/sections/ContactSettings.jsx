import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';

// Import Helpers
import { formatPhone } from '../../helpers/utils';
import { useObjectState } from '../../helpers/hooks';


const ContactSettings = () => {

    // Destructure Context
    const {
        state: {
            settings: { contact, _id },
            admin: { photo }
        }
    } = useContext(AppContext);

    // Creeate Local State
    const [state, setState] = useObjectState({
        email: contact.email,
        phone: contact.phone,
    })

    // Handle Submit
    const submit = ({ text, disabled }) => ({
        text,
        disabled,
        endpoint: `/admin/settings/${_id}`,
        method: 'patch',
        data: {
            contact: {
                ...contact,
                email: state.email,
                phone: state.phone
            }
        },
        callback({ error, data: { settings }, close }) {
            if (error || !settings) return;
            update("settings")(settings)
            close && close();
        }
    });
    
    // Create Component
    return (
        <>
            <div className="account__profile-header">
                <div
                    className="account__profile-photo animate-item"
                >
                    <img src={photo} alt="Profile Photo" />
                </div>
                <div className="account__profile-info animate-children">
                    <p>{contact.email}</p>
                    <p>{formatPhone(contact.phone)}</p>
                </div>
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="account__fields animate-children">
                <h5>Edit Contact Settings</h5>
                <AccountField
                    title="Update Email Address"
                    label="Contact Email"
                    value={contact.email}
                    submit={submit({
                        text: "Update Email Address",
                        disabled: contact.email === state.email
                    })}
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
                </AccountField>

                <AccountField
                    title="Update Phone Number"
                    label="Contact Phone"
                    value={formatPhone(contact.phone)}
                    submit={submit({
                        text: "Update Phone Number",
                        disabled: contact.phone === state.phone
                    })}
                >
                    <p className="small animate-item">Please don't include any dashes, spaces, or parentheses, formatting is done automatically</p>
                    <Input
                        id="admin-phone"
                        type="tel"
                        icon="iphone"
                        label="Phone Number"
                        placeholder="(123) 456-7890"
                        value={state.phone}
                        onChange={phone => setState({ phone })}
                    />
                </AccountField>
            </div>
        </>
    )

}


export default ContactSettings;