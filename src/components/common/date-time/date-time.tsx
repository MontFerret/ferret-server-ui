import fmt from 'date-fns/format';
import React from 'react';

export interface Props {
    value?: Date | string | number;
    format?: string;
}

export const DateTime = React.memo<Props>(
    ({ value, format = 'DD/MM/YY hh:mm:ss' }: Props) => {
        return <span>{value ? fmt(value, format) : ''}</span>;
    },
);
