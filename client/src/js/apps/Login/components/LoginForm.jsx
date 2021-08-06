import React from 'react';

import { BackButton } from '../../components/Buttons';
import Loader from '../../components/Loader';


const LoginForm = ({ back, backText, onSubmit, title, text, children, showLoader }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit();
    }

    return (
        <div className="login__content">
            {showLoader ? 
                (
                    <Loader />
                ) : (
                    <form className="login__form" onSubmit={handleSubmit}>
                        {back && <BackButton onClick={back} text={backText} />}
                        {title && (
                            <div className="login__header">
                                <h3 className="animate-item">{title}</h3>
                                {text && <p className="animate-item">{text}</p>}
                            </div>
                        )}
                        {children}   
                    </form>
                )
            }
        </div>
        
    )

}

export default LoginForm;