import React, { useContext, useState, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import Modal from '../../components/Modal';
import { LinkButton, Button } from '../../components/Buttons';
import Input from '../../components/Input';

// Import Helpers
import axios from 'axios';

// Create Component
const EditProfile = () => {

    const { state: user } = useContext(AppContext);

    // Create Local State
    const [showModal, setShowModal] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [confirm, setConfirm] = useState("");

    // Create Refs
    const modal = useRef();

    const handleDelete = async () => {

        // Set Fetching
        setIsFetching(true);
        const timer = $.timer(1000).start();

        // Delete Account
        axios.delete('/auth/account');

        // Hold
        await timer.hold();
        setIsFetching(false);

        // Close Modal
        await modal.current.close();

        // Redirect
        window.location.reload();

    };

    return (
        <>
            <div className="account__fields animate-children">
                <h5>Additional Options</h5>
                <LinkButton
                    text={"Delete Your Account"}
                    animationClass="nill"
                    onClick={() => setShowModal(true)}
                />
            </div>
            <Modal
                isOpen={showModal}
                close={setShowModal}
                preventClose={isFetching}
                closeRef={modal}
            >
                <div className="account__modal account__modal--delete">
                    <h4 className="account__modal-title animate-item">Delete Your Account</h4>
                    <p className="animate-item">This cannot be undone. Please type <span>{user.email}</span> to confirm that you want to delete your account.</p>
                    <Input
                        id="confirm-account-delete"
                        label="Confirm Delete"
                        placeholder={user.email}
                        value={confirm}
                        onChange={setConfirm}
                    />
                    <Button
                        text="Delete Account"
                        showLoader={isFetching}
                        disabled={confirm.toLowerCase() !== user.email.toLowerCase()}
                        onClick={handleDelete}
                    />
                </div>
            </Modal>
        </>
    )

};


export default EditProfile;