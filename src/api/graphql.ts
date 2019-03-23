import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
    uri: '/'
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = sessionStorage.getItem('auth_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
            'client-name': 'Ferret Server UI',
            'client-version': '1.0.0',
        },
    };
});

export class GraphQLApi extends ApolloClient<any> {
    constructor() {
        super({
            link: ApolloLink.from([authLink, restLink]),
            cache: new InMemoryCache(),
        });
    }
}
