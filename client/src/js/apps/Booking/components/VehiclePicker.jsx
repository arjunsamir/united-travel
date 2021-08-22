import React, { useRef, useEffect } from 'react';

import Icon from '../../components/Icon';

import anime from 'animejs';
import { useDrag } from '@use-gesture/react';

const KeySpec = ({ icon, text }) => {

    return (
        <div className="vehicle-card__key-spec">
            <span>
                <Icon icon={icon} />
            </span>
            <p>{text}</p>
        </div>
    )

}

const scrollToSelected = (slider, index) => {

    const card = $(slider).children(".vehicle-card").first;
    const style = window.getComputedStyle(card);

    const width = parseFloat(style.getPropertyValue("width").replace("px", ""));
    const margin = parseFloat(style.getPropertyValue("margin-right").replace("px", ""));

    const offset = 0 - (index * (width + margin));

    anime({
        targets: slider,
        translateX: offset,
        easing: "spring(1, 100, 20, 0)"
    })

}


const VehiclePicker = ({ vehicles, onChange, selected, copy }) => {

    const bindDrag = useDrag(({ swipe: [x] }) => {
        if (!x) return;
        const index = vehicles.findIndex(v => v._id === selected._id) + (-1 * x);

        if (index < 0 || index !== index) return;

        onChange(vehicles[index]);

    }, {
        filterTaps: true,
        axis: 'x'
    });
    const slider = useRef();

    // Scroll To Slide
    useEffect(() => {
        const selectedIndex = selected ? vehicles.findIndex(v => v._id === selected._id) : 0;
        scrollToSelected(slider.current, selectedIndex < 0 ? 0 : selectedIndex);
    }, [selected]);

    return (
        <div className="vehicle-picker">

            <div className="vehicle-picker__dots">
                {vehicles.map(vehicle => (
                    <div
                        key={vehicle._id}
                        className={$.join("vehicle-picker__dot", "animate-item", [selected && selected._id === vehicle._id, "selected"])}
                        onClick={() => onChange(vehicle)}
                    >
                        <h6>{vehicle.size}</h6>
                    </div>
                ))}
            </div>

            <div className="vehicle-picker__slider-container" {...bindDrag()}>
                <div className="vehicle-picker__slider" ref={slider}>
                    {vehicles.map(vehicle => {

                        const info = vehicle[`info_${window.locale}`]

                        return (
                            <div
                                key={vehicle._id}
                                className={$.join("vehicle-card", "animate-item", [selected && selected._id === vehicle._id, "selected"])}
                                onClick={() => onChange(vehicle)}
                            >
                                <div className="vehicle-card__header">
                                    <h5>{info.name}</h5>
                                    <h6 className="h5 light">${vehicle.cost.dollars}</h6>
                                </div>
                                <div className="vehicle-card__img">
                                    <img src={vehicle.image} alt={info.name} />
                                </div>
                                <div className="vehicle-card__key-specs">
                                    <KeySpec icon="people" text={`${vehicle.seats} ${copy.seats}`} />
                                    <KeySpec icon="briefcase" text={`${vehicle.bags} ${copy.bags}`} />
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>    
        </div>
    )

}


export default VehiclePicker;