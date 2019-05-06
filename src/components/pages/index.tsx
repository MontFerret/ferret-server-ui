import startsWith from 'lodash/startsWith';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../common/loader/loader';
import { Page, PageProps } from '../common/page';

const LoadableErrorPage = React.lazy(() => import('./error/index') as any);
const LoadableLoginPage = React.lazy(() => import('./login/index') as any);
const LoadableHomePage = React.lazy(() => import('./home') as any);

export interface Props extends PageProps {}

export class IndexPage extends Page<never, Props> {
    public render(): any {
        let redirect: any;

        const { location } = this.props;

        // if (data == null || data.isAuthenticated === false) {
        //     if (location.pathname !== '/login') {
        //         redirect = <Redirect to="/login"/>;
        //     }
        // } else
        if (startsWith(location.pathname, '/home') === false) {
            redirect = <Redirect to="/home" />;
        }

        return (
            <Suspense fallback={<Loader size="large" />}>
                <Switch>
                    {redirect}
                    <Route path="/login" component={LoadableLoginPage} />
                    <Route path="/home" component={LoadableHomePage} />
                    <Route path="/error" component={LoadableErrorPage} />
                </Switch>
            </Suspense>
        );
    }
}
