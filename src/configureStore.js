import {createStore} from 'redux';
import reducer from './reducer';

export default (initialState) => {
    const store = createStore(reducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducer);
        });
    }
    return store;
};
