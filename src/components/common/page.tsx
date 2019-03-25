import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import qs from 'qs';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from '../../common/models/query/query';

export interface PageProps<TParams = never> extends RouteComponentProps<TParams> {}

export interface PageState {
    query: Query;
}

export abstract class Page<
    TParams,
    TProps extends PageProps<TParams>,
    TState extends PageState = { query: Query }
> extends React.Component<TProps, TState> {
    public static parseQuery(props: PageProps<any>): Query {
        return qs.parse(get(props, 'location.search'));
    }

    public static stringifyQuery(q: Query): string {
        return qs.stringify(q);
    }

    public static getDerivedStateFromProps(props: PageProps): PageState {
        return {
            query: Page.parseQuery(props),
        };
    }

    constructor(props: TProps, state?: Partial<TState>) {
        super(props);

        set(this, 'state', {
            query: Page.parseQuery(props),
            ...state,
        });
    }

    public getPath(): string {
        return this.props.location.pathname;
    }

    public getParam(name: string, defaultValue?: string): string | undefined {
        return get(this.props.match, `params.${name}`, defaultValue);
    }

    public getQuery(): Query {
        return this.state.query;
    }

    public getQueryParam(name: string): string | undefined {
        if (this.state.query == null) {
            return undefined;
        }

        return this.state.query[name];
    }

    public getQueryParamOr(name: string, defaultValue: string): string {
        return this.getQueryParam(name) || defaultValue;
    }

    public navigate(path: string, query?: any): void {
        if (isEmpty(query) === true) {
            this.props.history.push(path);

            return;
        }

        this.props.history.push(`${path}?${qs.stringify(query)}`);
    }

    public goBack(): void {
        this.props.history.goBack();
    }

    public goForward(): void {
        this.props.history.goForward();
    }
}
