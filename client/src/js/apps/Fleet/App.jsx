import React, { useState } from "react";

// Import Context
import AppContext from './AppContext';

// Import Components
import Vehicle from "./components/Vehicle";
import VehiclePicker from "./components/VehiclePicker";

const App = ({ copy, vehicles }) => {

    const [vehicle, setVehicle] = useState(vehicles[0]);
    const [change, setChange] = useState();

    return (
        <AppContext.Provider value={{
            copy,
            vehicles,
            vehicle,
            setVehicle
        }}>
            <section className="fleet">
                <Vehicle
                    vehicle={vehicle}
                    copy={copy} 
                    nextVehicle={change}
                    setNext={setVehicle}
                    clearNext={() => setChange(null)}
                />
                <VehiclePicker
                    vehicles={vehicles}
                    selected={vehicle}
                    setVehicle={setChange}
                />
            </section>
        </AppContext.Provider>
    )

};

export default App;