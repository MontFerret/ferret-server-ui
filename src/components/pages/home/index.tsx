import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../../common/loader/loader';
import { Page, PageProps, PageState } from '../../common/page';

const LoadableProjectsListPage = React.lazy(
    () => import('./projects/index') as any,
);
const LoadableProjectDetailsPage = React.lazy(
    () => import('./project/index') as any,
);

export interface State extends PageState {
    collapsed: boolean;
}

export interface Props extends PageProps {}

export default class HomePage extends Page<never, Props, State> {
    public render(): any {
        const { match, location } = this.props;
        let redirect;

        if (location.pathname === match.url) {
            redirect = <Redirect to={`${match.url}/projects`} />;
        }

        return (
            <Suspense fallback={<Loader size="large" />}>
                <Switch>
                    {redirect}
                    <Route
                        path={`${match.url}/projects/:id`}
                        component={LoadableProjectDetailsPage}
                    />
                    <Route
                        path={`${match.url}/projects`}
                        component={LoadableProjectsListPage}
                    />
                </Switch>
            </Suspense>
        );
    }
}
