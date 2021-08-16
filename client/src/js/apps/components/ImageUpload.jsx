import React, { useRef } from 'react';

import { useObjectState } from '../helpers/hooks';

import Icon from './Icon';

import axios from 'axios';

const ImageUpload = ({ label, placeholder, success, error, id, endpoint, onUpload, filename }) => {

    // Set Up Object State
    const [state, setState] = useObjectState({
        image: null,
        isUploading: false,
        error: "false"
    });


    // Define Refs
    const input = useRef();


    // Create Change Handler
    const onFileChange = async (e) => {

        // Set State
        setState({ isUploading: true });

        // Create Variables For Upload
        const files = Array.from(e.target.files);
        const formData = new FormData();

        // Append Form Files
        files.forEach(file => {
            formData.append('photo', file);
        });

        formData.append('name', filename.replaceAll(' ', '-').toLowerCase());

        const timer = $.timer(1000).start();

        // Upload File
        const res = await axios.post(endpoint, formData);

        await timer.hold();

        setState({
            isUploading: false,
            image: res?.data?.file
        });

        onUpload && onUpload(res.data.file);

    }

    
    return (
        <>
            <div className="input__input file animate-item" onClick={() => input.current.click()}>
                <div className="input__main">
                    {state.image ? 
                        (<div className="input__photo">
                            <img src={state.image} alt="uploaded photo" />
                        </div>)
                        : 
                        (<div className="input__icon">
                            <Icon icon="upload" />
                        </div>)
                    }
                    <div className="input__field">
                        <label htmlFor={id}>{label}</label>
                        <input
                            type="file"
                            id={id}
                            className="input__file"
                            ref={input}
                            onChange={onFileChange}
                        />
                        <p className={$.join("small", [state.image, "success"], [state.error, "error"])}>{state.image ? success : placeholder}</p>
                    </div>
                </div>
                {state.isUploading && (<div className="input__loader">
                    <p>
                        <span></span>
                        <span></span>
                        <span></span>
                    </p>
                </div>)}
            </div>
        </>
    )

}

export default ImageUpload;