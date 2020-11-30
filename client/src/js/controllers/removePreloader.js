const fadeAndRemove = async (preloader, instant) => {

    if (!instant) await preloader.hide();

    preloader.remove();

};


const removePreloader = async (timer, instant) => {

    // Define Elements
    const preloader = $('#preloader');


    // Remove Instantly In Development
    if (instant) return fadeAndRemove(preloader, true);


    // Hold For Minimum Load Time
    await timer.hold();
    

    // Add Load Class
    preloader.addClass('load-complete');


    // Wait For Animation
    await $.delay(1000);


    // Fade Out Preloader
    fadeAndRemove(preloader);

};

export default removePreloader;