import { Form, Spin, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { DataProxy } from 'apollo-cache';
import { ApolloError } from 'apollo-client';
import { DocumentNode, FetchResult } from 'apollo-link';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment, ReactElement } from 'react';
import {
    Mutation,
    MutationFunc,
    MutationResult,
    Query,
    QueryResult,
} from 'react-apollo';
import isFormValid from '../../../common/form/is-valid';
import { updateFormCache } from '../../../common/graphql/mutation/cache-update';
import { MutationResultData } from '../../../common/graphql/mutation/result';
import { QueryResultData } from '../../../common/graphql/query/result';
import { Entity } from '../../../models/api/model/entity';
import { FormCard } from './card';
import Panel from './panel';

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
    onCreate?: (id: string) => void;
    onDelete?: () => void;
    onBack?: () => void;
    children: (props: FormContext<any>) => React.ReactNode;
}

interface InnerProps extends Props, FormComponentProps {}

interface State {
    rev?: string;
    refresh: boolean;
}

class FormContainer<T extends Entity = any> extends React.Component<
    InnerProps,
    State
> {
    constructor(props: InnerProps) {
        super(props);

        this.__renderForm = this.__renderForm.bind(this);
        this.__handleCompletedMutation = this.__handleCompletedMutation.bind(
            this,
        );
        this.__handleError = this.__handleError.bind(this);
        this.__updateCache = this.__updateCache.bind(this);
    }

    public render(): any {
        const { id, projectId, fetch, create, update } = this.props;

        const mutation = !isEmpty(id) && id !== 'new' ? update : create;

        const variables = {
            id,
            projectId,
        };

        return (
            <Query
                query={fetch}
                variables={variables}
                skip={this.__isNew()}
                onError={this.__handleError}
            >
                {(query: QueryResult<QueryResultData<T>>) => {
                    return (
                        <Mutation
                            mutation={mutation}
                            variables={variables}
                            update={this.__updateCache}
                            onCompleted={this.__handleCompletedMutation}
                            onError={this.__handleError}
                        >
                            {(
                                fn: MutationFunc,
                                mr: MutationResult<MutationResultData>,
                            ) => {
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
            onDelete,
            delete: del,
        } = this.props;

        const loading = qr.loading || mr.loading;
        const value = qr.data ? qr.data.output : undefined;
        const error = qr.error || mr.error;
        const touched = form.isFieldsTouched();
        const valid = isFormValid(form.getFieldsError());
        const titleStr =
            typeof title === 'string' ? title : title(value, loading, error);
        const handleSave = () => {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    mutate({
                        variables: {
                            id,
                            projectId,
                            input: { ...values, id },
                        },
                    });
                }
            });
        };
        const handleCancel = () => {
            this.props.form.resetFields();
        };

        let handleDelete: () => void;

        if (!this.__isNew() && del != null) {
            handleDelete = () => {
                mr.client
                    .mutate({
                        mutation: del,
                        variables: {
                            id,
                            projectId,
                        },
                    })
                    .then((_: FetchResult) => {
                        if (typeof onDelete === 'function') {
                            onDelete();
                        }
                    })
                    .catch(this.__handleError);
            };
        }

        const c = children({
            form,
            touched,
            valid,
            loading,
            value,
        });

        let resolvedChildren = c;

        if (c != null && (c as ReactElement).type != null) {
            resolvedChildren =
                (c as ReactElement).type === Fragment
                    ? (c as ReactElement).props.children
                    : children;
        }

        return (
            <Spin spinning={loading}>
                <Form>
                    {React.Children.map(resolvedChildren, (child, idx) => {
                        const key = idx.toFixed();

                        if (idx === 0) {
                            return (
                                <FormCard key={key}>
                                    <Panel
                                        title={titleStr}
                                        touched={touched}
                                        valid={valid}
                                        onBack={onBack}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                        onDelete={handleDelete}
                                    />
                                    {child}
                                </FormCard>
                            );
                        }

                        return <FormCard key={key}>{child}</FormCard>;
                    })}
                </Form>
            </Spin>
        );
    }

    private __isNew(): boolean {
        const id = this.props.id;

        return isEmpty(id) || id === 'new';
    }

    private __handleCompletedMutation(data: MutationResultData): void {
        const { form, onCreate } = this.props;

        form.resetFields();

        if (this.__isNew() && typeof onCreate === 'function') {
            onCreate(data.output.id);
        }
    }

    private __handleError(error: ApolloError): void {
        notification.error({
            message: error.message,
        });
    }

    private __updateCache(
        cache: DataProxy,
        mutationResult: FetchResult<MutationResultData>,
    ): void {
        const { projectId, fetch } = this.props;
        const id = mutationResult.data
            ? mutationResult.data.output.id
            : this.props.id;

        updateFormCache(
            'output',
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

export default (Form.create({ name: 'form_container ' })(
    FormContainer,
) as any) as React.SFC<Props>;
