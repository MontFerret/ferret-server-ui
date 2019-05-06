import ApolloClient from 'apollo-client';
import { History } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router';
import { IndexPage } from './pages/index';

export interface Props {
    history: History;
    graphql: ApolloClient<any>;
}

export class AppComponent extends React.PureComponent<Props> {
    public render(): any {
        const { graphql, history } = this.props;

        return (
            <ApolloProvider client={graphql}>
                <Router history={history}>
                    <Route path="/" component={IndexPage as any} />
                </Router>
            </ApolloProvider>
        );
    }
}

export function create(
    history: History,
    graphql: ApolloClient<any>,
): React.ReactElement<any> {
    return <AppComponent history={history} graphql={graphql} />;
}
