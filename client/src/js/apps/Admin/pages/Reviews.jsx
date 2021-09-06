import React, { useEffect, useContext, useState } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';
import Review from '../components/Review';
import { Button } from '../../components/Buttons';

// Import Helpers
import axios from 'axios';

const Reviews = () => {

    // Destructure State
    const { state: { reviews }, update, transition } = useContext(AppContext);


    // Create Local State
    const [isLoading, setIsLoading] = useState(true);


    // Get Reservations on Load
    useEffect(() => {

        // Get And Sort Reservations
        const fetchReviews = async () => {

            const timer = $.timer(1000).start();

            const res = await axios('/api/reviews');

            if (!res?.data?.data?.data) return;

            await timer.hold();

            update("reviews")(res.data.data.data);

            setIsLoading(false);

        }

        // Initialize Load
        fetchReviews();

    }, []);


    // Create Component
    return (
        <AccountPage showLoader={isLoading} >
            <div className="account__group animate-children">
                <h5>All Reviews</h5>
                {reviews && reviews.map(r => (
                    <Review
                        key={r._id}
                        review={r}
                        onClick={() => {
                            update("current_review")(r);
                            transition.to("ManageReview");
                        }}
                    />
                ))}
                {(!reviews || !reviews?.length) && <p>No reviews yet</p>}
            </div>

            <div className="account__fields animate-children">
                <h5>Add Review</h5>
                <Button
                    text="Add New Review"
                    onClick={() => {
                        update("current_review")(null);
                        transition.to("ManageReview");
                    }}
                />
            </div>
        </AccountPage>
    )

};


export default Reviews;