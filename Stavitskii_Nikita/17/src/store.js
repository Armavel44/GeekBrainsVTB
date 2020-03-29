import {createStore, applyMiddleware, compose} from 'redux';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {apiMiddleware} from 'redux-api-middleware';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {initReducer} from 'reducers';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {messageMiddleware} from 'middleware/messageMiddleware';
import {activeChatMiddleware} from 'middleware/activeChatMiddleware'

export const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chats', 'router']
};

export function initStore(){
    const initialStore = {};

    const store = createStore(
        persistReducer(persistConfig, initReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(logger, messageMiddleware, activeChatMiddleware, apiMiddleware, thunk, routerMiddleware(history)),
            //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        )
    );

    const persistor = persistStore(store);
    return {store, persistor};
}