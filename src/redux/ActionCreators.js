import * as ActionTypes from './ActionTypes';
import { collections, assets } from '../shared/data'

export const fetchCollections = () => (dispatch) => {

    dispatch(collectionsLoading(true));

    const prom = new Promise((resolve) => setTimeout(() => resolve(collections), 1000))
    prom.then(data => {
        console.log(data);

        const status = Promise.all(data.map((item, index) => getAssetByIdAsync(item.masterAssetId)));
        status.then(results => {
            const newData = data.map(a => {
                const index = results.findIndex(x => x.id === a.masterAssetId);
                a.imageName = results[index].name;
                a.imagePath = results[index].path;
                return a;
            });
            console.log("new data set >>>>", newData);
            dispatch(addCollections(newData));
        })

    })
        .catch(err => {
            console.log(err);
            dispatch(collectionsFailed(err.message));
        }

        );
}

const getAssetByIdAsync = (assetId) => {
    const asset = assets.find((a) => a.id === assetId);

    if (!asset) {
        throw new Error("Asset not found" + assetId);
    }

    return new Promise((resolve) => setTimeout(() => resolve(asset), 500));
};

export function getAssetsByCollectionAsync(collection) {
    return async (dispatch) => {
        try {
            const collectionAssets = assets.filter((asset) => asset.collectionId === collection.id);
            const assetList = await new Promise((resolve) => setTimeout(() => resolve(collectionAssets), 1000));
            dispatch(addAssets({ assets: assetList, masterAssetId: collection.masterAssetId }));

        } catch (error) {
            console.log('error' + error);
        }
    };
}

export function makeMasterAsync(collectionId, assetId) {
    return async (dispatch) => {
        try {
            const selectedAssetItem = assets.find((a) => a.id === assetId)
            dispatch(updateMasterAssetId({ collectionId, selectedAssetItem }));

        } catch (error) {
            console.log('error' + error);
        }
    };
}

export const updateMasterAssetId = (data) => ({
    type: ActionTypes.UPDATE_MASTERASSETID,
    payload: data
});

export const collectionsLoading = () => ({
    type: ActionTypes.COLLECTIONS_LOADING
});

export const collectionsFailed = (errmess) => ({
    type: ActionTypes.COLLECTIONS_FAILED,
    payload: errmess
});

export const addCollections = (collections) => ({
    type: ActionTypes.ADD_COLLECTIONS,
    payload: collections
});

export const addAssets = (assets) => ({
    type: ActionTypes.ADD_ASSETS,
    payload: assets
});

export const sortByProp = (propName) => ({
    type: ActionTypes.SORT_ASSETS,
    prop: propName
});