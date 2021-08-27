import React, { useContext } from 'react';

// Import AppContext
import AppContext from '../store/AppContext';

// Import Components
import Icon from '../../components/Icon';



// Create Item Component
const NavItem = ({ icon, label, onClick, name }) => {

    const { state } = useContext(AppContext);

    return (
        <div className={$.join("account-nav__item", [state.step === name, "active"])} onClick={onClick}>
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
                        icon="person-circle"
                        label="Profile"
                        name="Profile"
                    />
                    <NavItem
                        icon="credit-card"
                        label="Wallet"
                        name="Wallet"
                    />
                    <NavItem
                        icon="person-plus"
                        label="Invite"
                        name="Invite"
                    />
                </div>
            </div>
        </div>
        
    )

}

export default Nav;