// Import Base React Stuff
import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import pages
import Rides from '../pages/Rides';
import Settings from '../pages/Settings';
import Vehicles from '../pages/Vehicles';

// Import Components
import Nav from '../components/Nav';
import Visual from '../components/Visual';


// Register pages
const pages = {
    Rides,
    Settings,
    Vehicles
};


const SettingsView = () => {

    // Destructure State
    const { state } = useContext(AppContext);

    // Set Page
    const Page = pages[state.page] || <div>Hello</div>;

    return (
        <div className="account">
            <div className="account__container">
                <Visual />
                <div className="account__main">
                    <Page />
                </div>
            </div>
            {!!state.page && !state.page.startsWith("New") && <Nav />}
        </div>
    );
};


export default SettingsView;