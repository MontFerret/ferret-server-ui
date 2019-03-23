import { History } from 'history';
import React from 'react';
import { GraphQLApi } from './api/graphql';
import { create } from './components/app';

export default class Application {
    private readonly __history: History;
    private readonly __graphQL: GraphQLApi;

    constructor(history: History) {
        this.__graphQL = new GraphQLApi();
        this.__history = history;
    }

    public createElement(): React.ReactElement<any> {
        return create(this.__history, this.__graphQL);
    }
}
