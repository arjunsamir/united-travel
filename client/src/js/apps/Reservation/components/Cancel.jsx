import React, { useState, useRef, useContext } from 'react';

// Import Context
import AppContext from '../AppContext';

// Import Components
import Modal from '../../components/Modal';
import { LinkButton, Button } from '../../components/Buttons';

// Import Helpers
import dayjs from 'dayjs';
import axios from 'axios';

// Create Component
const Cancel = () => {

    const { reservation, updateApp, user, copy } = useContext(AppContext);

    console.log(reservation);

    // Create Refs and State
    const modal = useRef();
    const [showModal, setShowModal] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    return (
        <>
            <div className="booking-view__block">
                <p>
                    <LinkButton
                        text="Cancel Reservation"
                        onClick={() => setShowModal(true)}
                    />
                </p>
            </div>
            <Modal
                isOpen={showModal}
                closeRef={modal}
                preventClose={isFetching}
                close={setShowModal}
            >
                <div className="account__modal animate-children">
                    <h4>Confirm Cancellation</h4>
                    <p>Once you cancel, your original payment will be refunded the full amount within 10 business days.</p>
                    <Button
                        text="Confirm Cancellation"
                        animationClass="no-animate"
                        showLoader={isFetching}
                        onClick={async () => {

                            // Create Visual Animations
                            setIsFetching(true);
                            const timer = $.timer(1000).start();

                            // Make Request
                            const res = await axios.post('/api/booking/issue-refund', {
                                id: reservation._id,
                                locale: user.preferredLocale || window.locale || 'en',
                                name: user.preferredName,
                                date: dayjs(reservation.schedule.pickup, "MM-DD-YYYY H:mm").format('dddd MMMM D, YYYY')
                            });

                            // Check Response
                            console.log(res);

                            // Update App
                            updateApp(res.data.reservation)

                            // Wait For Delay
                            await timer.hold();
                            setIsFetching(false);

                            // Close Modal
                            modal.current.close();

                        }}
                    />
                </div>
                
            </Modal>
        </>
    )

};


export default Cancel;