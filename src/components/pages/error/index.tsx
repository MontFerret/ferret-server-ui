import React from 'react';

export interface Props {
    error: Error;
}

export default function ErrorPage(): any {
    return (
        <div>
            <span>Error has occured</span>
        </div>
    );
}
