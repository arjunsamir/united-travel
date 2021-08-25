import React from "react";

const Referral = ({ name, photo, copy, amount }) => {


    return (
        <div className="referral">

            <div className="referral__bg"></div>

            <div className="referral__photo">
                <img src={photo} alt={`picture of ${name}`} />
            </div>

            <div className="referral__content">
                <h6 className="bold">{copy.title.replace("{name}", name)}</h6>
                <p className="small">{copy.subtitle.replace("{amount}", amount || 15)}</p>
            </div>

        </div>
    )
}

export default Referral;