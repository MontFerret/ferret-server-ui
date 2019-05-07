import { Button } from 'antd';
import cn from 'classnames';
import 'rc-pagination/assets/index.css';
import React from 'react';
import { PaginationCursors as Cursors } from '../../../common/models/query/pagination';

const css = require('./pagination.module.scss');

export interface Props {
    cursors?: Cursors;
    onChange: (cursor: string) => void;
}

export const Pagination = React.memo<Props>(({ cursors, onChange }: Props) => {
    const hasPrev =
        cursors != null && cursors.before != null && cursors.before !== '';
    const onPrev =
        cursors && hasPrev
            ? onChange.bind(null, cursors.before as string)
            : undefined;
    const hasNext =
        cursors != null && cursors.after != null && cursors.after !== '';
    const onNext =
        cursors && hasNext
            ? onChange.bind(null, cursors.after as string)
            : undefined;

    return (
        <ul className={cn('rc-pagination', css.pager)}>
            <li aria-disabled={!hasPrev}>
                <Button
                    className={css.left}
                    icon="left"
                    size="small"
                    onClick={onPrev}
                    disabled={!hasPrev}
                />
            </li>
            <li aria-disabled={!hasNext}>
                <Button
                    className={css.right}
                    icon="right"
                    size="small"
                    onClick={onNext}
                    disabled={!hasNext}
                />
            </li>
        </ul>
    );
});
