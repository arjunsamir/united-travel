import React from 'react';

const Image = ({ src, domRef, children }) => {

    return (
        <div className="login__visual" ref={domRef}>
            <div className="login__image">
                <img src={`/img/${src || "login-1.jpg"}`} alt="Login Visual" />
                <img src={`/img/${src || "login-1.jpg"}`} alt="Login Visual" />
            </div>
            {children}
        </div>
    )

}

export default Image;