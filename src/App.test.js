import {cleanup, render, fireEvent} from '@testing-library/react';
import React from "react";
import Authors from "./views/Authors";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/rootReducers";
import rootSaga from "./sagas";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreateAuthor from "./views/Authors/create";

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

afterEach(cleanup);

it('test user form', async () => {
    const {getByText, container} = render(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    <Authors/>
                    <Switch>
                        <Route exact path="/author/create" component={CreateAuthor}/>
                    </Switch>
                </Router>
            </Provider>
        </ApolloProvider>
    );

    expect(getByText(/create/i)).toBeTruthy();
    fireEvent.click(getByText(/Create/));
    expect(getByText(/Save/)).toBeTruthy()
    expect(container).toMatchSnapshot();
});