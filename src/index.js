import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import {Provider} from 'react-redux'
import rootReducer from './reducers/rootReducers';
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// Create store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
