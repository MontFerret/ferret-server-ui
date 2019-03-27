import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { ScriptEntity } from '../../../../../../models/api/model/scriptEntity';
import { Page, PageProps } from '../../../../../common/page';
import Form from './form';

const getScriptQuery = gql`
    query findScripts($projectId: String!, $scriptId: String!) {
        script(projectId: $projectId, scriptId: $scriptId)
            @rest(type: "Script", path: "/projects/{args.projectId}/scripts/{args.scriptId}" ) {
                id,
                rev,
                createdAt,
                name,
                description,
                execution,
                persistence,
            }
    }
`;

interface QueryResultData {
    script: ScriptEntity;
}

// const createScriptMutation = gql``;

export interface Params {
    id: string;
}

export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ScriptDetailsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__renderForm = this.__renderForm.bind(this);
    }

    public render(): any {
        const { projectId } = this.props;
        const scriptId = this.getParam('id');

        const variables = {
            projectId,
            scriptId,
        };

        return (
            <Query query={getScriptQuery} variables={variables}>
                {this.__renderForm}
            </Query>
        );
    }

    private __renderForm({ loading, data }: QueryResult<QueryResultData>): any {
        return (
            <Form
                loading={loading}
                script={data ? data.script : undefined}
            />
        );
    }
}
