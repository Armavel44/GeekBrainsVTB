import {PROFILE_LOAD, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE} from 'actions/profile';

const initialState = {
    loading: false,
    entries: []
}

export const profileReducer = (state = initialState, action) => {
    // if (action.type === PROFILE_LOAD) {
    //
    //     return ({...state, entries: backendData})
    // } else {
    //     return state;
    // }

    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case PROFILE_SUCCESS:
            const entryData = Array.isArray(state.entries) ? action.payload : state.entries;
            console.log(state)
            return {
                ...state,
                loading: false,
                entries: entryData,
            };
        case PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
}