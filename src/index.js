import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import rootReducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history';
import {Router} from "react-router";
import {routerReducer, syncHistoryWithStore} from "react-router-redux";
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import './index.less';
injectTapEventPlugin();

const
    browserHistory = createBrowserHistory(),
    store = createStore(
        combineReducers({
            ...rootReducer,
            routing: routerReducer
        }),
        composeWithDevTools()
    ),
    history = syncHistoryWithStore(browserHistory, store);
browserHistory.push(window.location.href.replace(window.location.origin, ''));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                    <App/>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
};

if (module.hot) {
    module.hot.accept("./App", () => {
        setTimeout(render);
    });
}
render();




