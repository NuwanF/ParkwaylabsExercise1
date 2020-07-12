import * as ActionTypes from './ActionTypes';

export const Collections = (state =
    {
        isLoading: true,
        errMsg: null,
        collections: []
    },
    action) => {
    switch (action.type) {

        case ActionTypes.ADD_COLLECTIONS:
            return { ...state, isLoading: false, errMsg: null, collections: action.payload };

        case ActionTypes.COLLECTIONS_LOADING:
            return { ...state, isLoading: true, errMsg: null, collections: [] };

        case ActionTypes.COLLECTIONS_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload };

        default:
            return state;

    }
}