export const bemify = (block) => {

    return (element) => element ? `${block}__${element}` : block

}

export const constructWrappers = (...pairs) => {

    const wrapper = {};

    pairs.forEach(([Component, steps]) => {
        Object.keys(steps).forEach(key => wrapper[key] = Component)
    })

    return wrapper;

}

export const toUSD = (val) => {

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(val)

}


export const insertScript = (src, id) => {

    return new Promise(resolve => {

        const ref = document.querySelector('script');

        if (document.getElementById(id)) return resolve();

        const js = document.createElement('script');
        js.id = id;
        js.src = src;
        js.addEventListener('load', resolve);

        ref.parentNode.insertBefore(js, ref);

    });

}

export const validateEmail = (val) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val ? val.toLowerCase() : '');
}

export const validateName = (val) => {
    // Allow for apostrophes!!!
    return val && /^[a-zA-Z]+ [a-zA-Z]+$/.test(val)
}

export const validatePassword = (val) => {
    return val && val.length >=8
}

export const lettersOnly = (val) => {
    return val.replace(/[^A-Za-z ]+$/, '');
}