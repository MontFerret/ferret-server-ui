import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Page, PageProps } from '../../../../common/page';

const LoadableQueueListPage = React.lazy(() => import('./queue') as any);

export type Params = never;
export interface Props extends PageProps<Params> {
    project: string;
}

export default class ProjectScriptsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__renderList = this.__renderList.bind(this);
    }

    public render(): any {
        const { match } = this.props;

        return (
            <Fragment>
                <Switch>
                    <Route
                        path={match.path}
                        component={this.__renderList}
                        exact
                    />
                </Switch>
            </Fragment>
        );
    }

    private __renderList(props: any): any {
        return (
            <LoadableQueueListPage {...props} projectId={this.props.project} />
        );
    }
}
