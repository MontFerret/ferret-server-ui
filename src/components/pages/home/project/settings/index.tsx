import React from 'react';
import { Page, PageProps } from '../../../../common/page';

export type Params = never;
export interface Props extends PageProps<Params> {}

export default class ProjectSettingsPage extends Page<Params, Props> {
    public render(): any {
        return <span>Settings</span>;
    }
}
