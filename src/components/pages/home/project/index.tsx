import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { Page, PageProps } from '../../../common/page';

export interface Params {
    id: string;
}

export interface Props extends PageProps<Params> {}

export default class ProjectDetailsPage extends Page<Params, Props> {
    public render(): any {
        const { match } = this.props;
        let redirect;

        if (location.pathname === match.url) {
            redirect = <Redirect to={`${match.url}/projects`} />;
        }

        return (
            <Fragment>
                {redirect}
                Project details
            </Fragment>
        );
    }
}
