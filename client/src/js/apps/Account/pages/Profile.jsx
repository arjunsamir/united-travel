import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Sections
import EditProfile from '../sections/EditProfile';
import EditAccount from '../sections/EditAccount';
import DeleteAccount from '../sections/DeleteAccount';

// Import Components
import AccountPage from '../components/AccountPage';
import Icon from '../../components/Icon';



// Create Profile
const Profile = () => {

    const { state: user } = useContext(AppContext);

    return (
        <AccountPage showTitle={false}>

            <div className="account__profile-header">
                <div className="account__profile-photo animate-item">
                    <img src={user.photo} alt="Profile Photo" />
                </div>
                <div className="account__profile-info animate-children">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                </div>
                
            </div>

            <hr className="booking-view__divider animate-item" />
            
            {!!user.oAuth.length && (
                <div className="account__profile-details animate-children">
                    <h5>Linked Accounts</h5>
                    {user.oAuth.map(auth => (
                        <div
                            key={auth.provider}
                            className={$.join("account__profile-oauth", [auth.provider])}
                        >
                            <Icon icon={auth.provider} />
                            <h6 className="small">{auth.name} - {auth.email}</h6>
                        </div>
                    ))}
                </div>
            )}

            <EditProfile />
            
            <EditAccount />
            
            <DeleteAccount />

        </AccountPage>
    )

};


export default Profile;