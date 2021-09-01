import React, { useContext } from 'react';

// Import AppContext
import AppContext from '../store/AppContext';

// Import Components
import Icon from '../../components/Icon';



// Create Item Component
const NavItem = ({ icon, label, name }) => {

    const { state, transition } = useContext(AppContext);

    return (
        <div
            className={$.join("account-nav__item", [state.page === name, "active"])}
            onClick={() => state.page !== name && transition.to(name)}
        >
            <Icon icon={icon} />
            <p>{label}</p>
        </div>
    )

}


// Create Main Component
const Nav = () => {

    return (
        <div className="account__nav">
            <div className="account-nav">
                <div className="account-nav__items">
                    <NavItem
                        icon="calendar"
                        label="Rides"
                        name="Rides"
                    />
                    <NavItem
                        icon="settings"
                        label="Settings"
                        name="Settings"
                    />
                    <NavItem
                        icon="car"
                        label="Vehicles"
                        name="Vehicles"
                    />
                </div>
            </div>
        </div>
        
    )

}

export default Nav;