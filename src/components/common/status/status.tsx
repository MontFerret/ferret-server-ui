import { Tag } from 'antd';
import React from 'react';
import { ExecutionStatus } from '../../../models/api/model/executionStatus';

const COLORS = {
    [ExecutionStatus.Completed]: 'green',
    [ExecutionStatus.Running]: 'blue',
    [ExecutionStatus.Errored]: 'red',
    [ExecutionStatus.Cancelled]: 'grey',
    [ExecutionStatus.Queued]: 'orange',
    [ExecutionStatus.Unknown]: 'black',
};

export interface Props {
    value: ExecutionStatus;
}

export const StatusTag = React.memo<Props>(({ value }: Props) => {
    return <Tag color={COLORS[value]}>{value}</Tag>;
});
