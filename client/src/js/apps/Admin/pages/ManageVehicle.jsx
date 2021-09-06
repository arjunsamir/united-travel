// Import Base React Components
import React, { useContext, useState } from 'react';


// Import Context
import AppContext from '../store/AppContext';


// Import Components
import AccountPage from '../components/AccountPage';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import QuantitySelector from '../../components/QuantitySelector';
import Options from '../../components/Options';
import { Button, BackButton, LinkButton } from '../../components/Buttons';
import ImageUpload from '../../components/ImageUpload';


// Import Helpers
import { useObjectState } from '../../helpers/hooks';
import axios from 'axios';


const ManageVehicle = () => {

    const { state: { currentVehicle }, transition } = useContext(AppContext);

    const [state, setState] = useObjectState((currentVehicle && { ...currentVehicle }) || ({
        bags: 1,
        image: '',
        make: '',
        model: '',
        year: '',
        mpg: 20,
        seats: 4,
        size: 's',
        info_en: {
            name: '',
            description: '',
            features: []
        },
        info_es: {
            name: '',
            description: '',
            features: []
        },
        rates: {
            fee: 1500,
            base: 400,
            tourist: 250,
            extended: 175            
        }
    }));

    const [isFetching, setIsFetching] = useState(false);

    const isValid = !![state.bags, state.image, state.make, state.model, state.year, state.mpg, state.seats, state.info_en.name, state.info_en.description, state.info_es.name, state.info_es.description, state.rates.fee, state.rates.base, state.rates.tourist, state.rates.extended].filter(item => item === '').length;

    // Handle Submit
    const handleSubmit = async () => {

        try {
            setIsFetching(true);
            const timer = $.timer(1000).start();

            const { _id, __v, active, createdAt, ...data } = state;
            if (!data.thumbnail) data.thumbnail = data.image;

            if (_id) await axios.patch(`api/vehicles/${_id}`, data);
            else await axios.post('/api/vehicles', data);

            await timer.hold();
            setIsFetching(false);
            transition.to("Vehicles");

        }
        catch (error) {
            console.log(error);
            setIsFetching(false);
        }

    }


    const deleteVehicle = async () => {
        
        try {
            setIsFetching(true);
            const timer = $.timer(1000).start();

            await axios.delete(`api/vehicles/${state._id}`);

            await timer.hold();
            setIsFetching(false);
            transition.to("Vehicles");

        }
        catch (error) {
            console.log(error);
            setIsFetching(false);
        }

    }

    return (
        <AccountPage showTitle={false}>
            <BackButton
                text="Back"
                onClick={() => transition.to("Vehicles")}
            />

            {state.image && (
                <>
                    <div className="account__fields animate-children">
                        <div className="account__fields-img">
                            <img src={state.image} alt="Vehicle" />
                        </div>
                    </div>

                    <hr className="booking-view__divider animate-item" />
                </>
            )}

            <div className="account__fields animate-children">
                <h5>Vehicle Image</h5>
                <ImageUpload
                    id="vehicle-photo-upload"
                    label="Vehicle Photo"
                    placeholder="Click to upload photo"
                    endpoint="/api/upload/vehicle"
                    success="Success!"
                    onUpload={(image) => setState({ image })}
                    filename="vehicle-photo"
                />
            </div>

            <div className="account__fields animate-children">
                <h5>English Description</h5>
                <Input
                    id="english-name"
                    type="text"
                    label="Vehicle Name"
                    placeholder="Small"
                    value={state.info_en.name}
                    onChange={val => setState({ info_en: { ...state.info_en, name: val } })}
                />
                <TextArea
                    id="english-description"
                    label="Vehicle Description"
                    placeholder="The super stylish vehicle cruises down the road..."
                    value={state.info_en.description}
                    onChange={val => setState({ info_en: { ...state.info_en, description: val } })}
                />
            </div>
            
            <div className="account__fields animate-children">
                <h5>Spanish Description</h5>
                <Input
                    id="spanish-name"
                    type="text"
                    label="Vehicle Name"
                    placeholder="Pequeño"
                    value={state.info_es.name}
                    onChange={val => setState({ info_es: { ...state.info_es, name: val } })}
                />
                <TextArea
                    id="spanish-description"
                    label="Vehicle Description"
                    placeholder="El vehículo súper elegante navega por la carretera..."
                    value={state.info_es.description}
                    onChange={val => setState({ info_es: { ...state.info_es, description: val } })}
                />
            </div>

            <div className="account__fields animate-children">
                <h5>Vehicle Information</h5>
                <Input
                    id="vehicle-make"
                    type="text"
                    label="Vehicle Make"
                    placeholder="Acura"
                    value={state.make}
                    onChange={make => setState({ make })}
                />

                <Input
                    id="vehicle-model"
                    type="text"
                    label="Vehicle Model"
                    placeholder="MDX"
                    value={state.model}
                    onChange={model => setState({ model })}
                />

                <Input
                    id="vehicle-year"
                    type="text"
                    label="Vehicle Year"
                    placeholder="2022"
                    value={state.year}
                    onChange={year => setState({ year })}
                />
            </div>

            <div className="account__fields animate-children">
                <h5>Vehicle Specs</h5>
                <Options
                    name="vehicle-size"
                    options={["s", "m", "l", "xl"].map(size => ({
                        label: size.toUpperCase(),
                        value: size
                    }))}
                    onChange={(checked, size) => checked && setState({ size })}
                    selected={state.size}
                />

                <Input
                    id="vehicle-mpg"
                    type="number"
                    label="Vehicle MPG"
                    value={state.mpg}
                    onChange={mpg => setState({ mpg })}
                />

                <QuantitySelector
                    id="vehicle-seats"
                    label="Vehicle Seats"
                    text="Maximum Passengers"
                    value={state.seats}
                    onChange={seats => setState({ seats })}
                    min={0}
                />

                <QuantitySelector
                    id="vehicle-bags"
                    label="Vehicle Bags"
                    text="Maximum Luggage"
                    value={state.bags}
                    onChange={bags => setState({ bags })}
                    min={0}
                />
            </div>

            <div className="account__fields animate-children">
                <h5>Vehicle Pricing</h5>
                <p>Please enter all prices in cents.</p>
                <Input
                    id="vehicle-base-fee"
                    type="number"
                    label="Base Fee"
                    value={state.rates.fee}
                    onChange={fee => setState({ rates: { ...state.rates, fee } })}
                />
                <Input
                    id="vehicle-base-rate"
                    type="number"
                    label="Base Rate Per Mile"
                    value={state.rates.base}
                    onChange={base => setState({ rates: { ...state.rates, base } })}
                />
                <Input
                    id="vehicle-tourist-rate"
                    type="number"
                    label="Tourist Rate Per Mile"
                    value={state.rates.tourist}
                    onChange={tourist => setState({ rates: { ...state.rates, tourist } })}
                />
                <Input
                    id="vehicle-extended-rate"
                    type="number"
                    label="Extended Rate Per Mile"
                    value={state.rates.extended}
                    onChange={extended => setState({ rates: { ...state.rates, extended } })}
                />
            </div>

            <div className="account__fields">
                <Button
                    text="Save Vehicle"
                    onClick={handleSubmit}
                    showLoader={isFetching}
                    disabled={isValid}
                />
                {state._id && (
                    <p className="animate-item">
                        <LinkButton
                            text="Delete Vehicle"
                            animationClass="no"
                            onClick={deleteVehicle}
                        />
                    </p>
                )}
            </div>

            
        </AccountPage>
    )

};


export default ManageVehicle;