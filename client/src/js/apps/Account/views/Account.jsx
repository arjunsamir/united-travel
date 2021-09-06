// Import Base React Stuff
import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import pages
import Rides from '../pages/Rides';
import Profile from '../pages/Profile';
import Wallet from '../pages/Wallet';
import Invite from '../pages/Invite';

// Import Components
import Nav from '../components/Nav';
import Visual from '../components/Visual';


// Register pages
const pages = {
    Rides,
    Profile,
    Wallet,
    Invite
}


const Account = () => {

    // Destructure State
    const { state } = useContext(AppContext);

    // Set Page
    const Page = pages[state.page];

    return (
        <div className="account">
            <div className="account__container">
                <Visual />
                <div className="account__main">
                    <Page />
                </div>
            </div>
            <Nav />
        </div>
    );
};


export default Account;