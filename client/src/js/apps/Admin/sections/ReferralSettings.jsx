import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';



const ReferralSettings = () => {

    // Destructure Context
    const {
        state: {
            settings: {
                referrals: { recruiter, candidate },
                _id
            },
        },
        update
    } = useContext(AppContext);

    // Creeate Local State
    const [state, setState] = useObjectState({
        recruiterBonus: recruiter.bonus,
        recruiterExpiration: recruiter.expiration,
        candidateBonus: candidate.bonus,
        candidateExpiration: candidate.expiration,
    });

    // Handle Submit
    const submit = ({ text, disabled }) => ({
        text,
        disabled,
        endpoint: `/admin/settings/${_id}`,
        method: 'patch',
        data: {
            referrals: {
                recruiter: {
                    bonus: state.recruiterBonus,
                    expiration: state.recruiterExpiration,
                },
                candidate: {
                    bonus: state.candidateBonus,
                    expiration: state.candidateExpiration,
                }
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
            <h5>Edit Referral Settings</h5>
            <AccountField
                title="Recruiter Bonus"
                label="Recruiter Bonus"
                value={`$${(state.recruiterBonus / 100).toFixed(2)}`}
                submit={submit({
                    text: "Update Bonus",
                    disabled: state.recruiterBonus === recruiter.bonus,
                })}
            >
                <p className="small animate-item">Please enter value in CENTS, not dollars.</p>
                <Input
                    id="recruiter-bonus"
                    type="number"
                    icon="credit-card"
                    label="Recruiter Bonus"
                    placeholder="1500"
                    value={state.recruiterBonus}
                    onChange={v => setState({ recruiterBonus: v })}
                />
            </AccountField>

            <AccountField
                title="Recruiter Expiration"
                label="Recruiter Expiration"
                value={`${state.recruiterExpiration} Days`}
                submit={submit({
                    text: "Update Expiration",
                    disabled: state.recruiterExpiration === recruiter.expiration,
                })}
            >
                <p className="small animate-item">Please enter value in days.</p>
                <Input
                    id="recruiter-expiration"
                    type="number"
                    icon="calendar"
                    label="Recruiter Expiration"
                    placeholder="365"
                    value={state.recruiterExpiration}
                    onChange={v => setState({ recruiterExpiration: v })}
                />
            </AccountField>

            <AccountField
                title="Candidate Bonus"
                label="Candidate Bonus"
                value={`$${(state.candidateBonus / 100).toFixed(2)}`}
                submit={submit({
                    text: "Update Bonus",
                    disabled: state.candidateBonus === candidate.bonus,
                })}
            >
                <p className="small animate-item">Please enter value in CENTS, not dollars.</p>
                <Input
                    id="candidate-bonus"
                    type="number"
                    icon="credit-card"
                    label="Candidate Bonus"
                    placeholder="1500"
                    value={state.candidateBonus}
                    onChange={v => setState({ candidateBonus: v })}
                />
            </AccountField>

            <AccountField
                title="Candidate Expiration"
                label="Candidate Expiration"
                value={`${state.candidateExpiration} Days`}
                submit={submit({
                    text: "Update Expiration",
                    disabled: state.candidateExpiration === candidate.expiration,
                })}
            >
                <p className="small animate-item">Please enter value in days.</p>
                <Input
                    id="candidate-bonus"
                    type="number"
                    icon="calendar"
                    label="Candidate Expiration"
                    placeholder="365"
                    value={state.candidateExpiration}
                    onChange={v => setState({ candidateExpiration: v })}
                />
            </AccountField>

        </div>
    )

}


export default ReferralSettings;