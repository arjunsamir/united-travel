import React from 'react';

const SearchInput = (placeholder) => {

    return (params) => {
        return (
            <div ref={params.InputProps.ref}>
                <input placeholder={placeholder} type="text" {...params.inputProps} />
            </div>
        )
    }

}

export default SearchInput;