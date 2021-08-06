import { useState } from 'react';

export const useObjectState = (initialState) => {

    const [state, setState] = useState(initialState);

    return [state, (newState) => setState(Object.assign({}, state, newState))]

}