import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';
import Icon from '../../components/Icon';

// Import Inputs
import Input from '../../components/Input';

// Create Profile
const Profile = () => {

    const { state: user } = useContext(AppContext);

    return (
        <AccountPage showTitle={false}>
            <div className="account__profile">

                <div className="account__profile-header">
                    <div className="account__profile-photo animate-item">
                        <img src={user.photo} alt="Profile Photo" />
                    </div>
                    <div className="account__profile-info animate-children">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                    </div>
                    
                </div>
                
                {!!user.oAuth.length && (
                    <div className="account__profile-details animate-children">
                        <h5>Linked Accounts</h5>
                        {user.oAuth.map(auth => (
                            <div
                                key={auth.provider}
                                className={$.join("account__profile-oauth", [auth.provider])}
                            >
                                <Icon icon={auth.provider} />
                                <p className="small">{auth.name} - {auth.email}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="account__form">
                    <h5 className="animate-item">Edit Your Profile</h5>
                    {/* <Input
                        label="email"
                    /> */}
                </div>
                
                <div className="account__form">
                    <h5 className="animate-item">Edit Your Account</h5>
                    {/* <Input
                        label="email"
                    /> */}
                </div>

            </div>

        </AccountPage>
    )

};


export default Profile;