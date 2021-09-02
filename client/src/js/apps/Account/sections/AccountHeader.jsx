import React, { useContext, useState, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import ImageUpload from '../../components/ImageUpload';
import { Button } from '../../components/Buttons';

// Import Helpers
import axios from 'axios';


const AccountHeader = () => {

    // Destructure Global State
    const { state: user, update } = useContext(AppContext);

    // Creeate Local State
    const [showModal, setShowModal] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();

    // Create Refs
    const modal = useRef();

    // Create Event Handlers
    const handleSubmit = async () => {

        // Set isFetching to true
        setIsFetching(true);
        const timer = $.timer(1000).start();

        // Update User
        await axios.patch("/users/me", {
            photo: profilePhoto
        });

        // Wait For Timer
        await timer.hold();

        // Update State
        update("photo")(profilePhoto);
        setIsFetching(false);
        setProfilePhoto(null);

        // Close Modal
        modal.current.close();

    }

    return (
        <>
            <div className="account__profile-header">
                <div
                    className="account__profile-photo animate-item"
                    onClick={() => setShowModal(true)}
                >
                    <img src={user.photo} alt="Profile Photo" />
                    <div className="account__profile-photo-icon">
                        <Icon icon="camera" />
                    </div>
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

            <Modal
                isOpen={showModal}
                close={setShowModal}
                preventClose={isFetching}
                closeRef={modal}
            >
                <div className="account__modal">
                    <h4 className="account__modal-title animate-item">Change Profile Photo</h4>
                    <ImageUpload
                        id="user-profile=photo-upload"
                        label="Upload New Photo"
                        placeholder="Click to upload a photo"
                        success="Upload Successful!"
                        endpoint="/api/upload/profile-photo"
                        onUpload={setProfilePhoto}
                        filename={user.name || "user-photo"}
                    />
                    <Button
                        text="Change Photo"
                        onClick={handleSubmit}
                        showLoader={isFetching}
                        disabled={!profilePhoto}
                    />
                </div>
            </Modal>
        </>
    )

};


export default AccountHeader;