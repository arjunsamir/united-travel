import React, { useEffect, useRef, useState } from 'react';

import Icon from './Icon';

import anime from 'animejs';


const animateModalOpen = (element) => {

    const e = $(element);

    const tl = anime.timeline({
        easing: 'easeOutQuad',
        duration: 250
    });

    // First Fade In Background
    tl.add({
        targets: e.children(".modal__escape").e(),
        opacity: [0, 1]
    });

    // Then Fade In Window
    tl.add({
        targets: e.children(".modal__window").e(),
        opacity: [0, 1]
    });

    // Then Fade In Content
    tl.add({
        targets: e.children(".animate-item, .animate-children > *").e(),
        translateY: [anime.stagger([100, 25]), 0],
        opacity: [0, 1],
        delay: anime.stagger([0, 250])
    });

    return tl.finished;

}

const animateModalClose = (element) => {

    const e = $(element);

    // Create Anime Timeline
    const tl = anime.timeline({
        easing: 'easeOutQuad',
        duration: 250
    });

    // First Fade Out Content
    tl.add({
        targets: e.children(".animate-item, .animate-children > *").e(),
        translateY: anime.stagger([0, -50]),
        opacity: 0,
        delay: anime.stagger([0, 250])
    });

    // Then Fade Out Window
    tl.add({
        targets: e.children(".modal__window").e(),
        opacity: 0
    });

    // Then Fade Out Background
    tl.add({
        targets: e.children(".modal__escape").e(),
        opacity: 0
    });

    return tl.finished;

};


const Modal = ({ children, isOpen, close, preventClose, closeRef }) => {

    // Create Refs & State
    const [isAnimating, setIsAnimating] = useState(false);
    const element = useRef();

    // Animate Opening And Closing
    useEffect(() => {

        const triggerOpen = async () => {
            if (!element.current || isAnimating) return
            setIsAnimating(true);
            await animateModalOpen(element.current);
            setIsAnimating(false);
        }

        if (isOpen) triggerOpen();

    }, [isOpen]);

    // Create Close Function
    const closeModal = async () => {

        // Prevent Double Clicking
        if (isAnimating || preventClose) return

        // Update State
        setIsAnimating(true);

        // Do Some Animation
        await animateModalClose(element.current);

        // Update State
        setIsAnimating(false);

        // Close Modal State
        close(false);

    }

    // Pass Close Function Updwards
    if (closeRef) closeRef.current = { close: closeModal };

    return isOpen ? (
        <div className="modal" ref={element}>
            <div className="modal__escape" onClick={closeModal}></div>
            <div className="modal__window">
                <div className="modal__close animate-item" onClick={closeModal}>
                    <Icon icon="close" size="xl" />
                </div>
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>
    ) : null;

};


export default Modal;