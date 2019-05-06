import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Page, PageProps } from '../../../../common/page';

const LoadableScriptsListPage = React.lazy(() => import('./scripts') as any);
const LoadableScriptDetailsPage = React.lazy(
    () => import('./script/index') as any
);

export type Params = never;
export interface Props extends PageProps<Params> {
    project: string;
}

export default class ProjectScriptsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__renderScriptsList = this.__renderScriptsList.bind(this);
        this.__renderScriptDetails = this.__renderScriptDetails.bind(this);
    }

    public render(): any {
        const { match } = this.props;

        return (
            <Fragment>
                <Switch>
                    <Route
                        path={match.path}
                        component={this.__renderScriptsList}
                        exact
                    />
                    <Route
                        path={`${match.path}/new`}
                        component={this.__renderScriptDetails}
                    />
                    <Route
                        path={`${match.path}/:id`}
                        component={this.__renderScriptDetails}
                    />
                </Switch>
            </Fragment>
        );
    }

    private __renderScriptsList(props: any): any {
        return (
            <LoadableScriptsListPage
                {...props}
                projectId={this.props.project}
            />
        );
    }

    private __renderScriptDetails(props: any): any {
        return (
            <LoadableScriptDetailsPage
                {...props}
                projectId={this.props.project}
            />
        );
    }
}
