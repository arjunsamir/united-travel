import React from 'react';


const Vehicle = ({ vehicle, onClick }) => {

    const info = vehicle[`info_${window.locale}`];

    return (
        <div
            className="booking-view__vehicle" style={{
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <div>
                <h6>{info.name}</h6>
                <p>{vehicle.year} {vehicle.make} {vehicle.model}</p>
            </div>
            <div className="booking-view__vehicle-image">
                <img src={vehicle.image} alt="Vehicle image" />
            </div>
        </div>
    );

};


export default Vehicle;