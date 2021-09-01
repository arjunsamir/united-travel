// Import Base React Shit
import React, { useState, useRef } from 'react';


// Import Components
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';
import { Button } from '../../components/Buttons';


// Import Helpers
import axios from 'axios';


const AccountField = ({ title, label, value, children, submit = {} }) => {

    // Cretate Local State
    const [showModal, setShowModal] = useState(false);
    const [isFetching, setIsFetching] = useState(false);


    // Create Refs
    const modal = useRef();


    // Create Submission handler
    const handleSubmit = async () => {

        // Start Timer
        const timer = $.timer(1000).start();

        // Set Fetch Status
        setIsFetching(true);

        try {
            // Start Request
            const res = await axios[submit.method || "patch"](submit.endpoint || '/users/me', submit.data);

            console.log(res);

            // Throw Error
            if (res.data.status === 'ERROR' || res.data.status === 'FAIL') throw res;

            // Hold For Timer
            await timer.hold();

            // Set Fetch Status
            setIsFetching(false);

            // Execute Submit Callback
            submit.callback({
                data: res?.data,
                close: modal.current && modal.current?.close
            });
        }

        catch (error) {
            // Set Fetch Status
            setIsFetching(false);

            // Execte Error Callback
            submit.callback({
                error: true,
                close: modal.current && modal.current?.close
            });
        }

    }

    // Create Modal
    return (
        <>
            <div className="account__field" onClick={() => setShowModal(true)}>
                <div>
                    <h6>{label}</h6>
                    <p>{value}</p>
                </div>
                <Icon icon="create" size="lg" />
            </div>
            <Modal
                isOpen={showModal}
                close={setShowModal}
                preventClose={isFetching}
                closeRef={modal}
            >
                <div className="account__modal">
                    {title && <h4 className="account__modal-title animate-item">{title}</h4>}
                    {children}
                    <Button
                        text={submit.text}
                        onClick={handleSubmit}
                        showLoader={isFetching}
                        disabled={submit.disabled}
                    />
                </div>
            </Modal>
        </>
    )

};


export default AccountField;