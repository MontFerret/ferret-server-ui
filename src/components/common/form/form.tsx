import { Alert, Card, Form, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { DataProxy } from 'apollo-cache';
import { DocumentNode, FetchResult } from 'apollo-link';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment, ReactElement } from 'react';
import { Mutation, MutationFunc, MutationResult, Query, QueryResult } from 'react-apollo';
import isFormValid from '../../../common/form/is-valid';
import { updateFormCache } from '../../../common/graphql/mutation/cache-update';
import { MutationResultData } from '../../../common/graphql/mutation/result';
import { QueryResultData } from '../../../common/graphql/query/result';
import { Entity } from '../../../models/api/model/entity';
import Panel from './panel';
const css = require('./form.module.scss');

export interface FormContext<T extends Entity> extends FormComponentProps {
    value?: T;
    loading: boolean;
    touched: boolean;
    valid: boolean;
}

export type TitleFn = (data: any, loading: boolean, err?: Error) => string;

export interface Props {
    projectId: string;
    title: TitleFn | string;
    id?: string;
    className?: string;
    fetch: DocumentNode;
    create: DocumentNode;
    update: DocumentNode;
    delete?: DocumentNode;
    onBack?: () => void;
    children: (props: FormContext<any>) => React.ReactNode;
}

interface InnerProps extends Props, FormComponentProps {}

interface State {
    rev?: string;
    refresh: boolean;
}

class FormContainer<T extends Entity = any> extends React.Component<InnerProps, State> {
    constructor(props: InnerProps) {
        super(props);

        this.__renderForm = this.__renderForm.bind(this);
        this.__handleCompletedMutation = this.__handleCompletedMutation.bind(this);
        this.__updateCache = this.__updateCache.bind(this);
    }

    public render(): any {
        const {
            id,
            projectId,
            fetch,
            create,
            update,
        } = this.props;

        const mutation = !isEmpty(id) && id !== 'new'
            ? update
            : create
        ;

        const variables = {
            id,
            projectId,
        };

        return (
            <Query
                query={fetch}
                variables={variables}
            >
                {(query: QueryResult<QueryResultData<T>>) => {
                    return (
                        <Mutation
                            mutation={mutation}
                            variables={variables}
                            update={this.__updateCache}
                            onCompleted={this.__handleCompletedMutation}
                        >
                            {(fn: MutationFunc, mr: MutationResult<MutationResultData>) => {
                                return this.__renderForm(query, fn, mr);
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

    private __renderForm(
        qr: QueryResult<QueryResultData<T>>,
        mutate: MutationFunc,
        mr: MutationResult<MutationResultData>,
    ): any {
        const {
            id,
            projectId,
            form,
            children,
            title,
            onBack,
        } = this.props;

        const loading = qr.loading || mr.loading;
        const value = qr.data ? qr.data.entity : undefined;
        const error = qr.error || mr.error;
        const touched = form.isFieldsTouched();
        const valid = isFormValid(form.getFieldsError());
        const titleStr = typeof title === 'string' ? title : title(value, loading, error);
        const handleSave = () => {
            mutate({
                variables: {
                    id,
                    projectId,
                    input: this.__getFormValues(),
                },
            });
        };
        const handleCancel = () => {
            this.props.form.resetFields();
        };

        const c = children({
            form,
            touched,
            valid,
            loading,
            value,
        });

        let resolvedChildren = c;

        if (c != null && (c as ReactElement).type != null) {
            resolvedChildren = (c as ReactElement).type === Fragment
                ? (c as ReactElement).props.children
                : children;
        }

        return (
            <Spin spinning={loading}>
                <Form>
                    { error ? <Alert className={css.error} message={error.message} type="error" /> : null}
                    {React.Children.map(resolvedChildren, (child, idx) => {
                        const key = idx.toFixed();

                        if (idx === 0) {
                            return (
                                <Card
                                    key={key}
                                    className={css.section}
                                >
                                    <Panel
                                        title={titleStr}
                                        touched={touched}
                                        valid={valid}
                                        onBack={onBack}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                    />
                                    {child}
                                </Card>
                            );
                        }

                        return (
                            <Card
                                key={key}
                                className={css.section}
                            >
                                {child}
                            </Card>
                        );
                    })}
                </Form>
            </Spin>
        );
    }

    private __handleCompletedMutation(): void {
        this.props.form.resetFields();
    }

    private __updateCache(cache: DataProxy, mutationResult: FetchResult<MutationResultData>): void {
        const {
            id,
            projectId,
            fetch,
        } = this.props;

        updateFormCache(
            'entity',
            fetch,
            { id, projectId },
            this.__getFormValues(),
            cache,
            mutationResult,
        );
    }

    private __getFormValues(): any {
        const id = this.props.id;
        const values = this.props.form.getFieldsValue();

        return { ...values, id };
    }
}

export default Form.create<Props>({ name: 'form_container ' })(FormContainer);
