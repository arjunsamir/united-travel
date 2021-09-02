import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Sections
import AccountHeader from '../sections/AccountHeader';
import EditProfile from '../sections/EditProfile';
import EditAccount from '../sections/EditAccount';
import DeleteAccount from '../sections/DeleteAccount';

// Import Components
import AccountPage from '../components/AccountPage';




// Create Profile
const Profile = () => {

    const { state: user } = useContext(AppContext);

    return (
        <AccountPage showTitle={false}>

            <AccountHeader />

            <EditProfile />
            
            {user.passwordSet && <EditAccount />}
            
            <DeleteAccount />

        </AccountPage>
    )

};


export default Profile;