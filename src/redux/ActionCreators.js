import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

const collections = [
    {
        id: 1,
        name: "The Simpsons",
        masterAssetId: 13,
        tags: {
            name: "Cartoon",
            subTag: {
                name: "Simpsons family",
                subTag: {
                    name: "2014",
                },
            },
        },
    },
    {
        id: 2,
        name: "Super heroes",
        masterAssetId: 24,
        tags: {
            name: "DC Super heroes",
            subTag: {
                name: "2014",
            },
        },
    },
    {
        id: 3,
        name: "Toy story",
        masterAssetId: 31,
        tags: {
            name: "Disney",
            subTag: {
                name: "Pixar",
                subTag: {
                    name: "Original movie",
                    subTag: {
                        name: "2010",
                    },
                },
            },
        },
    },
    {
        id: 4,
        name: "Ninjago",
        masterAssetId: 42,
        tags: {
            name: "Ninja",
            subTag: {
                name: "Secret Ninja Force",
                subTag: {
                    name: "2017",
                },
            },
        },
    },
];

const assets = [
    {
        id: 11,
        name: "Homer Simpson",
        path: "Homer.jpg",
        collectionId: 1,
    },
    {
        id: 12,
        name: "Lisa Simpson",
        path: "Lisa.jpg",
        collectionId: 1,
    },
    {
        id: 13,
        name: "Bart Simpson",
        path: "Bart.jpg",
        collectionId: 1,
    },
    {
        id: 14,
        name: "Marge Simpson",
        path: "Marge.jpg",
        collectionId: 1,
    },
    {
        id: 15,
        name: "Grampa Simpson",
        path: "Grampa.jpg",
        collectionId: 1,
    },
    {
        id: 16,
        name: "Maggie Simpson",
        path: "Maggie.jpg",
        collectionId: 1,
    },
    {
        id: 21,
        name: "Green Lantern",
        path: "Green lantern.jpg",
        collectionId: 2,
    },
    {
        id: 22,
        name: "Flash",
        path: "Flash.jpg",
        collectionId: 2,
    },
    {
        id: 23,
        name: "Batman",
        path: "Batman.jpg",
        collectionId: 2,
    },
    {
        id: 24,
        name: "Superman",
        path: "Superman.jpg",
        collectionId: 2,
    },
    {
        id: 31,
        name: "Buzz Lightyear",
        path: "Buzz.jpg",
        collectionId: 3,
    },
    {
        id: 32,
        name: "Alien",
        path: "Alien.jpg",
        collectionId: 3,
    },
    {
        id: 41,
        name: "Spinjitzu training Nya",
        path: "Nya.jpg",
        collectionId: 4,
    },
    {
        id: 42,
        name: "Master Wu",
        path: "Wu.jpg",
        collectionId: 4,
    },
    {
        id: 43,
        name: "Lloyd",
        path: "Lloyd.jpg",
        collectionId: 4,
    },
];

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

export function getAssetsByCollectionAsync(collectionId) {
    return async (dispatch) => {
        try {
            const collectionAssets = assets.filter((asset) => asset.collectionId === collectionId);
            //const assetList = await new Promise((resolve) => setTimeout(() => resolve(collectionAssets), 1000));
            dispatch(addAssets(collectionAssets));

        } catch (error) {
            console.log('error' + error);
        }
    };
}

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