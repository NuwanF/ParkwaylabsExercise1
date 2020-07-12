import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Collections } from './collections';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            collections: Collections
        }),
        applyMiddleware(thunk)
    );
    return store;
}
