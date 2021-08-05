import React, { useRef, useEffect } from "react";

import anime from "animejs";

const KeySpec = ({ text, icon }) => {
    return (
        <div className="vehicle__key-spec">
            <span>
                <svg><use href={`/img/icons.svg#${icon}`}></use></svg>
            </span>
            <p>{text}</p>
        </div>
    )
}


const Vehicle = ({ vehicle, copy, nextVehicle, setNext, clearNext }) => {

    const info = vehicle[`info_${window.locale}`];

    const refs = {
        info: useRef(),
        img: useRef()
    }

    useEffect(() => {

        if (!nextVehicle) return;

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        tl.add({
            targets: $(refs.info.current).children().e(),
            opacity: 0,
            delay: anime.stagger(100, { start: 250 })
        });

        tl.add({
            targets: refs.img.current,
            translateX: 200,
            opacity: 0
        });

        tl.finished.then(() => setNext(nextVehicle));

    }, [nextVehicle]);

    useEffect(() => {

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration: 250
        });

        tl.add({
            targets: $(refs.info.current).children().e(),
            opacity: [0, 1],
            delay: anime.stagger(100)
        });

        tl.add({
            targets: refs.img.current,
            translateX: [200, 0],
            opacity: [0, 1]
        });

        tl.finished.then(clearNext)

    }, [vehicle]);

    return (
        <div className="fleet__vehicle">
            <div className="vehicle">
                <div className="vehicle__info" ref={refs.info}>
                    <h2>{info.name}</h2>
                    <p>{info.description}</p>
                    <div className="vehicle__key-specs">
                        <KeySpec text={`${vehicle.seats} ${copy.seats}`} icon="people" />
                        <KeySpec text={`${vehicle.bags} ${copy.bags}`} icon="briefcase" />
                    </div>
                </div>
                <div className="vehicle__image">
                    <img src={`/img/vehicles/${vehicle.image}`} alt={`${info.name} Vehicle`} ref={refs.img} />
                </div>
            </div>
        </div>
        
    )

}

export default Vehicle;