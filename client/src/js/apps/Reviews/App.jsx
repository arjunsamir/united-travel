import React, { useRef, useEffect } from 'react';

import Oopsie from '../components/Oopsie';
import Icon from '../components/Icon';

// Import Helpers
import anime from 'animejs';
import { useObjectState } from '../helpers/hooks';

const getStars = (stars) => {
    const arr = new Array(5).fill("star-outline");
    return arr.map((itm, i) => {
        if (i < parseInt(stars)) return "star";
        else return itm;
    });
}

const App = ({ reviews, copy, scroll }) => {

    // Create Refs
    const reviewRef = useRef();

    // Set Up State
    const [state, setState] = useObjectState({
        selected: 0,
        isAnimating: false
    });

    // Get Current Review
    const review = reviews[state.selected];

    // Animate In Review
    useEffect(() => {

        // Create Timeline
        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        // Add Animation
        tl.add({
            targets: $(reviewRef.current).children().e(),
            translateY: [anime.stagger([100, 25]), 0],
            opacity: [0, 1],
            delay: anime.stagger([0, 250])
        });

        // Update Parallax Scroll 
        scroll && scroll.update();

    }, [state.selected]);

    return reviews.length ? (
        <section className="reviews">

            <div className="reviews__container">
                <div className="reviews__reviewers">

                    {reviews.map((review, i) => (
                        <div
                            className={$.join("reviewer", [i == state.selected, "selected"])}
                            key={i}
                            onClick={async () => {

                                // Disable Duplicate Clicks
                                if (state.isAnimating || i === state.selected) return;
                                setState({ isAnimating: true });

                                // Animate Current Review Out
                                const tl = anime.timeline({
                                    easing: 'easeOutQuad',
                                    duration: 250
                                });

                                // Add Animattion to Timeline
                                tl.add({
                                    targets: $(reviewRef.current).children().e(),
                                    translateY: anime.stagger([-25, -100]),
                                    opacity: 0,
                                    delay: anime.stagger([0, 250])
                                });

                                // Wait For Timeline To Complete
                                await tl.finished;

                                // Update The state
                                setState({ selected: i })
                            }}
                        >
                            <div className="reviewer__image">
                                <img src={review.photo} alt={review.author} />
                            </div>
                            <div className="reviewer__info">
                                <h5>{review.author}</h5>
                                <p>{new Date(review.date).toLocaleDateString(`${window.locale}-US`, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="reviews__review">

                    <div className="review" ref={reviewRef}>
                        <h3>{review.author}</h3>
                        <div className="review__stars">
                            {getStars(review.rating).map((icon, i) => <Icon icon={icon} key={`${icon}-${i}`} />)}
                        </div>
                        <p>{review.body}</p>
                    </div>

                </div>

            </div>

        </section>
    ) : (
        <section className="reviews fallback">

            <div className="reviews__fallback">
                <div className="reviews__fallback-img">
                    <img src="https://storage.googleapis.com/utravel-site-content/img/reviews-fallback.jpeg" alt="Woman sitting in back seat of car smiling" data-scroll data-scroll-speed="-1.25" />
                </div>
                <h2><q>A completely stress-free experience from start to finish.</q></h2>
            </div>

        </section>
    );
    

}

export default App;