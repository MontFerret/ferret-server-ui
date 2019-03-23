import gq from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Page, PageProps } from '../../../common/page';

const findQuery = gq`
    query findProjects {
        projects @rest(type: "Project", path: "/projects") {
            id
        }
    }
`;

export interface Params {
    page: number;
    pageSize: number;
}

export interface Props extends PageProps<Params> {}

export default class ProjectsIndexPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.renderResults = this.renderResults.bind(this);
    }

    public render(): any {
        return (
            <Query query={findQuery}>
                {this.renderResults}
            </Query>
        );
    }

    private renderResults({ data }: QueryResult): any {
        return (
            <span>{JSON.stringify(data)}</span>
        );
    }
}
