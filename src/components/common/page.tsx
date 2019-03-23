import React from 'react';
import { RouteComponentProps } from 'react-router';

export interface LocationQuery {
    [key: string]: string;
}

export interface PageProps<TParams = never> extends RouteComponentProps<TParams> {}

export interface PageState {
    query: LocationQuery;
}

export abstract class Page<
    TParams,
    TProps extends PageProps<TParams>,
    TState extends PageState = { query: LocationQuery }
> extends React.Component<TProps, TState> {}
