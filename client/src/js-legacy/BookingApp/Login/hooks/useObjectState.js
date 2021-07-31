import { useState } from 'react';

export default function useObjectState(initialState) {

    const [state, setState] = useState(initialState);

    return [state, (newState) => setState(Object.assign({}, state, newState))]

}