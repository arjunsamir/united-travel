import React from 'react';

// Import Components
import Icon from '../../components/Icon';


// Create Component
const RideItem = ({ date, service, origin, destination }) => {

    let icon;

    switch (service) {
        case 'cruise':
            icon = 'ship';
            break;

        case 'airport':
            icon = 'airplane';
            break;
        
        default:
            icon = 'location-pin';
    }

    return (
        <div className="ride-item">
            <h6 className="ride-item__date">{date}</h6>
            <div className="ride-item__main">
                <div className="ride-item__icon">
                    <Icon icon={icon} />
                </div>
                <div className="ride-item__route">
                    <p className="small">{origin}</p>
                    <p className="small">{destination}</p>
                </div>
                <div className="ride-item__expand">
                    <Icon icon="more" size="xl" />
                </div>
            </div>
        </div>
    )

}

export default RideItem;