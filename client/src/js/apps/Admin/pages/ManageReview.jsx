// Import Base React Components
import React, { useContext, useState } from 'react';


// Import Context
import AppContext from '../store/AppContext';


// Import Components
import AccountPage from '../components/AccountPage';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import QuantitySelector from '../../components/QuantitySelector';
import Options from '../../components/Options';
import { Button, BackButton, LinkButton } from '../../components/Buttons';
import ImageUpload from '../../components/ImageUpload';
import DateTimePicker from '../../components/DateTimePicker';


// Import Helpers
import { useObjectState } from '../../helpers/hooks';
import dayjs from 'dayjs';
import axios from 'axios';


const ManageReview = () => {

    // Destructure Global State
    const { state: { currentReview }, transition } = useContext(AppContext);


    // Create Local Object State
    const [state, setState] = useObjectState((currentReview && { ...currentReview }) || ({
        body: '',
        rating: 5,
        author: '',
        title: '',
        date: dayjs().format("MM-DD-YYYY H:mm"),
        photo: '',
        locale: 'en'
    }));


    // Create Local State
    const [isFetching, setIsFetching] = useState(false);


    // Determine If Form Is valid
    const isValid = !![state.body, state.rating, state.author, state.title, state.date, state.photo, state.locale].filter(item => item === '').length;

    // console.log(state)

    // Handle Submit
    const handleSubmit = async () => {

        try {
            setIsFetching(true);
            const timer = $.timer(1000).start();

            const { _id, __v, active, ...data } = state;

            if (_id) await axios.patch(`api/reviews/${_id}`, data);
            else await axios.post('/api/reviews', data);

            await timer.hold();
            setIsFetching(false);
            transition.to("Reviews");

        }
        catch (error) {
            console.log(error);
            setIsFetching(false);
        }

    }


    // Handle Delete
    const deleteReview = async () => {
        
        try {
            setIsFetching(true);
            const timer = $.timer(1000).start();

            await axios.delete(`api/reviews/${state._id}`);

            await timer.hold();
            setIsFetching(false);
            transition.to("Reviews");

        }
        catch (error) {
            console.log(error);
            setIsFetching(false);
        }

    }


    // Create Component
    return (
        <AccountPage showTitle={false}>
            <BackButton
                text="Back"
                onClick={() => transition.to("Reviews")}
            />

            {state.photo && (
                <>
                    <div className="account__fields animate-children">
                        <div className="account__fields-profile">
                            <img src={state.photo} alt="Reviewer" />
                        </div>
                    </div>

                    <hr className="booking-view__divider animate-item" />
                </>
            )}

            <div className="account__fields animate-children">
                <h5>Review Author</h5>
                <ImageUpload
                    id="review-photo-upload"
                    label="Review Photo"
                    placeholder="Click to upload photo"
                    endpoint="/api/upload/profile-photo"
                    success="Success!"
                    onUpload={(photo) => setState({ photo })}
                    filename="reviewer-photo"
                />
                <Input
                    id="review-author"
                    type="text"
                    label="Author Name"
                    placeholder="Arthur Shelby"
                    value={state.author}
                    onChange={author => setState({ author })}
                />
            </div>

            <div className="account__fields animate-children">
                <h5>Review Information</h5>
                <QuantitySelector
                    id="review-rating"
                    label="Review Rating"
                    text="Between 1 and 5 stars"
                    value={state.rating}
                    onChange={rating => setState({ rating })}
                    min={1}
                    max={5}
                />
                <Input
                    id="review-title"
                    type="text"
                    label="Review Title"
                    placeholder="Amazing Service!"
                    value={state.title}
                    onChange={title => setState({ title })}
                />
                <Textarea
                    ida="review-body"
                    label="Review Body"
                    placeholder="The super stylish vehicle cruises down the road..."
                    value={state.body}
                    onChange={body => setState({ body })}
                />
            </div>
            
            <div className="account__fields animate-children">
                <h5>Review Meta</h5>
                <Options
                    name="review-locale"
                    options={[["en", "English"], ["es", "Español"]].map(arr => ({
                        label: arr[1],
                        value: arr[0]
                    }))}
                    onChange={(checked, locale) => checked && setState({ locale })}
                    selected={state.locale}
                />
                <DateTimePicker
                    value={state.date}
                    onChange={date => setState({ date })}
                    useMinDate={false}
                    datePicker={{
                        label: "Review Date",
                        placeholder: "Select Date",
                        customProps: {
                            disablePast: false
                        }
                    }}
                />
            </div>

            <div className="account__fields">
                <Button
                    text="Save Review"
                    onClick={handleSubmit}
                    showLoader={isFetching}
                    disabled={isValid}
                />
                {state._id && (
                    <p className="animate-item">
                        <LinkButton
                            text="Delete Review"
                            animationClass="no"
                            onClick={deleteReview}
                        />
                    </p>
                )}
            </div>

            
        </AccountPage>
    )

};


export default ManageReview;