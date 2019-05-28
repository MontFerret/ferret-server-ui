import { Tag } from 'antd';
import React from 'react';
import { ExecutionCause } from '../../../models/api/model/executionCause';

const COLORS = {
    [ExecutionCause.Manual]: 'purple',
    [ExecutionCause.Schedule]: 'cyan',
    [ExecutionCause.Hook]: 'volcano',
    [ExecutionCause.Unknown]: 'black',
};

export interface Props {
    value: ExecutionCause;
}

export const CauseTag = React.memo<Props>(({ value }: Props) => {
    return <Tag color={COLORS[value]}>{value}</Tag>;
});
