import React from 'react';

const Image = props => {

    const { fileExt, fileName, webp } = props;

    const extension = fileExt || 'jpg';


    return (
        <div className="booking__image">
            <picture>
                {webp && <source srcSet={`/img/${fileName}.webp`} type="image/webp" />}
                <source srcSet={`/img/${fileName}.${extension}`} type={`image/jpeg`} />
                <img src={`/img/${fileName}.${extension}`} alt="Airport gate" />
            </picture>
        </div>
    )

}

export default Image;