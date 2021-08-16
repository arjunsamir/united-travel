import React from 'react';


const Image = ({ src, domRef, children }) => {

    const img = src || "https://storage.googleapis.com/utravel-site-content/img/login-1.jpg";

    return (
        <div className="login__visual" ref={domRef}>
            <div className="login__image">
                <img src={img} alt="Login Visual" />
                <img src={img} alt="Login Visual" />
            </div>
            {children}
        </div>
    )

}

export default Image;