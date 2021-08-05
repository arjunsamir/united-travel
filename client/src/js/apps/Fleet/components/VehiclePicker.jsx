import React from "react";

const VehiclePicker = ({ vehicles, selected, setVehicle }) => {
    
    return (
        <div className="fleet__picker">
            {vehicles.map(v => (
                <div
                    className={`fleet__picker-item${v._id === selected._id ? ' selected' : ''}`}
                    key={v._id}
                    onClick={() => setVehicle(v)}
                >
                    <div>
                        <img
                            src={`/img/vehicles/${v.thumbnail}`}
                            alt={`Thumbnail for ${v[`info_${window.locale}`].name}`}
                        />
                    </div>
                    <p>{v[`info_${window.locale}`].name}</p>
                </div>
            ))}
        </div>
    )

}

export default VehiclePicker;