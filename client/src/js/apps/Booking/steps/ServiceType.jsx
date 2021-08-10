// Import The Default Things
import React, { useContext, useState } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Options from '../../components/Options';


// Create Step
const ServiceType = ({ update, copy }) => {

    const { state } = useContext(AppContext);
    const { serviceType } = state.reservation;
    const selected = copy.options.find(o => o.value === serviceType);

    return (
        <BookingCard
            copy={copy}
            next={{
                text: copy.next,
                onClick: () => console.log('clicked next btn'),
                disabled: !selected
            }}
            disableExpand
            footer={selected && {
                title: selected.title,
                text: selected.description
            }}
        >
            <Options
                name="service-type"
                options={copy.options.map(o => ({
                    icon: o.icon,
                    label: o.name,
                    value: o.value
                }))}
                onChange={(checked, value) => checked && update("SERVICE-TYPE", value)}
                selected={serviceType}
            />
        </BookingCard>
    )

};


// Export Step
export default ServiceType;