import { Col, Form, Input, Row } from 'antd';
import gql from 'graphql-tag';
import get from 'lodash/get';
import React, { Fragment } from 'react';
import { ScriptEntity } from '../../../../../../models/api/model/scriptEntity';
import DescriptionField from '../../../../../common/form/fields/descr';
import NameField from '../../../../../common/form/fields/name';
import Container, { FormContext } from '../../../../../common/form/form';
import { Page, PageProps } from '../../../../../common/page';

const getScriptQuery = gql`
    query findScriptsQuery($projectId: String!, $id: String!) {
        entity(projectId: $projectId, id: $id)
            @rest(type: "Script", path: "/projects/{args.projectId}/scripts/{args.id}" ) {
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

const createScriptMutation = gql`
    mutation createScriptMutation($projectId: String!, $input: Script!) {
        metadata(projectId: $projectId, input: $input) @rest(
            method: "POST",
            path: "projects/{args.projectId}/scripts"
        ) {
            id,
            rev
        }
    }
`;

const updateScriptMutation = gql`
    mutation updateScriptMutation($projectId: String!, $input: Script!) {
        metadata(projectId: $projectId, input: $input) @rest(
            method: "PUT",
            path: "projects/{args.projectId}/scripts/{args.input.id}"
        ) {
            id,
            rev
        }
    }
`;

const { TextArea } = Input;

export interface Params {
    id: string;
}

export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ScriptDetailsPage extends Page<Params, Props> {
    public render(): any {
        const { projectId } = this.props;
        const scriptId = this.getParam('id');

        return (
            <Container
                id={scriptId}
                projectId={projectId}
                fetch={getScriptQuery}
                create={createScriptMutation}
                update={updateScriptMutation}
                title="Script"
            >
                {({
                    form,
                    value = {} as ScriptEntity,
                }: FormContext<ScriptEntity>) => {
                    const { getFieldDecorator } = form;

                    return (
                        <Fragment>
                            <Row gutter={16}>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>General</legend>
                                        <NameField form={form} value={value.name} />
                                        <DescriptionField form={form} value={value.description} />
                                    </fieldset>
                                </Col>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Persistence</legend>
                                        <Form.Item label="Enable">
                                            {getFieldDecorator('persistence.enabled', {
                                                initialValue: get(value, 'persistence.enabled', false),
                                            })(
                                                <Input type="checkbox" />,
                                            )}
                                        </Form.Item>
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={24}>
                                    <Form.Item
                                        label="Query"
                                    >
                                        {getFieldDecorator('execution.query', {
                                            initialValue: get(value, 'execution.query'),
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Input script query',
                                                },
                                            ],
                                        })(
                                            <TextArea rows={10} />,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Fragment>
                    );
                }}
            </Container>
        );
    }
}
