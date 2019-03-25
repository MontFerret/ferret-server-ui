import React from 'react';
import Loader from '../../../../common/loader/loader';
import { Page, PageProps } from '../../../../common/page';

export type Params = never;
export interface Props extends PageProps<Params> {}

export default class ProjectDashboardPage extends Page<Params, Props> {
    public render(): any {
        return <Loader size="large" />;
    }
}
