import * as ActionTypes from './ActionTypes';

export const Collections = (state =
    {
        isLoading: true,
        errMsg: null,
        masterAssetId: null,
        collections: [],
        assets: []
    },
    action) => {
    switch (action.type) {

        case ActionTypes.ADD_COLLECTIONS:
            return { ...state, isLoading: false, errMsg: null, collections: action.payload };

        case ActionTypes.COLLECTIONS_LOADING:
            return { ...state, isLoading: true, errMsg: null, collections: [] };

        case ActionTypes.COLLECTIONS_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload };

        case ActionTypes.ADD_ASSETS:
            console.log('action', action.payload);
            return {

                ...state, isLoading: false, errMsg: null, assets: action.payload.assets,
                masterAssetId: action.payload.masterAssetId
            };


        case ActionTypes.UPDATE_MASTERASSETID:
            const newCollections = state.collections.filter((a) => a.id !== action.payload.collectionId);
            const selectedCollection = state.collections.find((a) => a.id == action.payload.collectionId);
            selectedCollection.masterAssetId = action.payload.selectedAssetItem.id;
            selectedCollection.imageName = action.payload.selectedAssetItem.name;
            selectedCollection.imagePath = action.payload.selectedAssetItem.path;
            debugger;
            newCollections.push(selectedCollection);
            const sortCollections = newCollections.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

            return {
                ...state, isLoading: false, errMsg: null, collections: [...sortCollections],
                masterAssetId: action.payload.selectedAssetItem.id
            };

        case ActionTypes.SORT_ASSETS:
            const newAssests = state.assets.sort((a, b) => (a[action.prop] > b[action.prop]) ? 1 : ((b[action.prop] > a[action.prop]) ? -1 : 0))
            return { ...state, assets: [...newAssests] };

        default:
            return state;

    }
}