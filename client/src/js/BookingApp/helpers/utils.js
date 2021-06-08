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