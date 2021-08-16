// Import The Default Things
import React, { useContext, useEffect, useState } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Autocomplete from "../../components/Autocomplete";


// Import Helpers
import axios from 'axios';


// Create Step
const CruiseLocation = ({ update, updateApp, copy }) => {

    // Destructure Global State
    const { state } = useContext(AppContext);
    const { ports } = state.app;
    const { cruise } = state.reservation;


    // Create Local State
    const [cruiseLines, setCruiseLines] = useState([]);
    const [loaded, setLoaded] = useState(false);


    // Fetch Data On Mount
    useEffect(() => {

        const load = async () => {

            const timer = $.timer(1000).start();

            const promises = [axios('/api/data/cruise-lines').then(res => setCruiseLines(res.data))];

            if (!state.app.ports) promises.push(axios('/api/data/ports').then(res => updateApp('PORTS', res.data)));

            await Promise.all(promises);

            await timer.hold();

            setLoaded(true);

        }

        if (!loaded) load();

    }, []);

    return (
        <BookingCard
            back
            showLoader={!loaded}
        >

            <fieldset>

                <Dropdown
                   id="port-select"
                   label={copy.labels[0]}
                   placeholder={copy.placeholders[0] || "Placeholder Value"}
                   options={(ports || []).map(port => ({
                       text: port.name,
                       value: port.code
                   }))}
                   selected={cruise.port.code}
                   onSelect={(selected) => update('CRUISE-PORT', selected.value)}
                />

            </fieldset>

            <fieldset>

                <h5 className="animate-item">{copy.infoTitle}</h5>

                <Autocomplete
                    id="cruise-search"
                    icon="ship"
                    label={copy.labels[1]}
                    placeholder={copy.placeholders[1]}
                    errors={[]}
                    options={cruiseLines}
                    onInputChange={(e, term) => {
                        if (!e) return;
                        update('CRUISE-LINE', term);
                    }}
                    limit={5}
                    freeSolo
                    inputValue={cruise.line}
                    customProps={{
                        autoHighlight: true
                    }}
                />

                <Input
                    id="ship-name-input"
                    icon="ticket"
                    label={copy.labels[2]}
                    placeholder={copy.placeholders[2]}
                    value={cruise.ship}
                    onChange={(val) => update("CRUISE-SHIP", val)}
                />

            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default CruiseLocation;