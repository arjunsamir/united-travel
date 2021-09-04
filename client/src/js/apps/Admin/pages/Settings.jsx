import React from 'react';

// Import Sections
import ContactSettings from '../sections/ContactSettings';
import PricingSettings from '../sections/PricingSettings';
import CancellationSettings from '../sections/CancellationSettings';
import ReferralSettings from '../sections/ReferralSettings';

// Import Components
import AccountPage from '../components/AccountPage';




// Create Profile
const Profile = () => {

    return (
        <AccountPage showTitle={false}>
            <ContactSettings />
            <PricingSettings />
            <CancellationSettings />
            <ReferralSettings />
        </AccountPage>
    )

};


export default Profile;