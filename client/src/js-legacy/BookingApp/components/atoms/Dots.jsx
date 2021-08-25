import React from 'react';

const Dots = (props) => {

    const dots = new Array(props.count ?? 16).fill('');

    return (
        <div className="accent-dots">
            {dots.map((o, i) => <span className="accent-dots__dot" key={i}></span>)}
        </div>
    )

}

export default Dots;