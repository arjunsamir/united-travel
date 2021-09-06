import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountField from '../components/AccountField';
import Input from '../../components/Input';
import Icon from '../../components/Icon';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';


const PricingSettings = () => {

    // Destructure Context
    const {
        state: {
            settings: { thresholds, touristZips, _id },
        },
        update
    } = useContext(AppContext);


    // Creeate Local State
    const [state, setState] = useObjectState({
        tourist: thresholds.tourist,
        extended: thresholds.extended,
        zips: touristZips,
        zip: '',
    })


    // Handle Submit
    const submit = ({ text, disabled }) => ({
        text,
        disabled,
        endpoint: `/admin/settings/${_id}`,
        method: 'patch',
        data: {
            touristZips: state.zips,
            thresholds: {
                extended: state.extended,
                tourist: state.tourist,
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
            <h5>Edit Pricing Algorithm</h5>
            <AccountField
                title="Tourist Threshold"
                label="Tourist Threshold"
                value={`${thresholds.tourist} Miles`}
                submit={submit({
                    text: "Update Tourist Threshold",
                    disabled: state.tourist === thresholds.tourist,
                })}
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

            <AccountField
                title="Minimum Extended Threshold"
                label="Minimum Extended Threshold"
                value={`${thresholds.extended} Miles`}
                submit={submit({
                    text: "Update Extended Threshold",
                    disabled: state.extended === thresholds.extended,
                })}
            >
                <p className="small animate-item">This is the minimum number of miles necessart for the extended mileage discount to start taking effect</p>
                <Input
                    id="extended-threshold"
                    type="number"
                    icon="location-pin"
                    label="Threshold"
                    placeholder="100"
                    value={state.extended}
                    onChange={t => setState({ extended: t })}
                />
            </AccountField>

            <AccountField
                title="Tourist Zip Codes"
                label="Tourist Zip Codes"
                value={touristZips.slice(0, 3).join(', ') + " ..."}
                submit={submit({
                    text: "Update Zip Codes",
                })}
            >
                <p className="small animate-item">These are the zip codes that are eligible for the tourist mileage rates.</p>
                <div className="tags">
                    <div className="tags__container animate-item">
                        {state.zips.map((zip, i) => (
                            <div
                                key={`${i}-${zip}`}
                                className="tags__tag"
                            >
                                <p className="small">{zip}</p>
                                <div className="tags__tag-x" onClick={() => {
                                    const zips = state.zips.filter(z => z !== zip);
                                    setState({ zips });
                                }}>
                                    <Icon icon="close" size="sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Input
                    id="add-zip-code"
                    type="text"
                    icon="location-pin"
                    label="Add Zip Code"
                    placeholder="12345"
                    value={state.zip}
                    onChange={zip => setState({ zip })}
                    onEnter={() => {
                        if (state.zip.length === 5 && !state.zips.includes(state.zip)) {
                            setState({
                                zips: [...state.zips, state.zip],
                                zip: ''
                            });
                        }
                    }}
                />
            </AccountField>
        </div>
    )

}


export default PricingSettings;