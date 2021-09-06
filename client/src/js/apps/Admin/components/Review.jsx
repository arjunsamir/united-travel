import React from 'react';

// Import Helpers
import dayjs from 'dayjs';


const Review = ({ review, onClick }) => {

    const { photo, author, date, locale } = review;

    const locales = {
        en: 'English',
        es: 'Español'
    }

    return (
        <div
            className="reviewer"
            onClick={onClick}
        >
            <div className="reviewer__image">
                <img src={photo} alt={author} />
            </div>
            <div className="reviewer__info">
                <h5>{author}</h5>
                <p>{locales[locale]} - {dayjs(date, "MM-DD-YYYY H:mm").format("MMMM D, YYYY")}</p>
            </div>
        </div>
    )

};


export default Review;