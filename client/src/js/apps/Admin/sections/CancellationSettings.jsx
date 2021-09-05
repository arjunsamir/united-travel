import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';
import Toggle from '../../components/Toggle';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';


const CancellationSettings = () => {

    // Destructure Context
    const {
        state: {
            settings: { cancellation, _id },
        }
    } = useContext(AppContext);

    // Creeate Local State
    const [state, setState] = useObjectState({
        flat: cancellation.fees.flat,
        percent: cancellation.fees.percent,
        hours: cancellation.hoursBefore,
        allowed: cancellation.allowed,
    });

    // Handle Submit
    const submit = ({ text, disabled }) => ({
        text,
        disabled,
        endpoint: `/admin/settings/${_id}`,
        method: 'patch',
        data: {
            cancellation: {
                fees: {
                    flat: state.flat,
                    percent: state.percent
                },
                hoursBefore: state.hours,
                allowed: state.allowed
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
        <div className="account__fields animate-children">
            <h5>Edit Cancellation Policy</h5>
            <AccountField
                title="Cancellation Allowed"
                label="Cancellation Allowed"
                value={state.allowed ? 'Yes' : 'No'}
                submit={submit({
                    text: "Save Settings",
                    disabled: state.allowed === cancellation.allowed
                })}
            >
                <p className="small animate-item">Enable or disable cancellation for user reservations.</p>
                <Toggle
                    checked={state.allowed}
                    onChange={e => setState({ allowed: e.target.checked })}
                    name="cancellation-allowed"
                    label="Allow Cancellation"
                />
            </AccountField>

            <AccountField
                title="Minimum Notice"
                label="Minimum Notice"
                value={`${state.hours} Hours`}
                submit={submit({
                    text: "Update Minimum Notice",
                    disabled: state.hours === cancellation.hoursBefore
                })}
            >
                <p className="small animate-item">A percentage fee used to withold a certian percentage of the transaction from being refunded.</p>
                <Input
                    id="cancellation-fixed-fee"
                    type="number"
                    icon="clock"
                    label="Hours Before"
                    placeholder="0"
                    value={state.hours}
                    onChange={hours => setState({ hours })}
                />
            </AccountField>
            
            <AccountField
                title="Cancellation Fee - Fixed"
                label="Cancellation Fee - Fixed"
                value={`$${(state.flat / 100).toFixed(2)}`}
                submit={submit({
                    text: "Update Fixed Fee",
                    disabled: state.flat === cancellation.fees.flat
                })}
            >
                <p className="small animate-item">Value in CENTS. This value is used to assess a fixed fee for cancellations.</p>
                <Input
                    id="cancellation-fixed-fee"
                    type="number"
                    icon="credit-card"
                    label="Fixed Fee"
                    placeholder="0"
                    value={state.flat}
                    onChange={flat => setState({ flat })}
                />
            </AccountField>

            <AccountField
                title="Cancellation Fee - Percent"
                label="Cancellation Fee - Percent"
                value={`${state.percent}%`}
                submit={submit({
                    text: "Update Variable Fee",
                    disabled: state.percent === cancellation.fees.percent
                })}
            >
                <p className="small animate-item">A percentage fee used to withold a certian percentage of the transaction from being refunded.</p>
                <Input
                    id="cancellation-fixed-fee"
                    type="number"
                    icon="credit-card"
                    label="Variable Fee"
                    placeholder="0"
                    value={state.percent}
                    onChange={percent => setState({ percent })}
                />
            </AccountField>

        </div>
    )

}


export default CancellationSettings;