import capitalize from 'lodash/capitalize';
import BaseError from './error';

function writeArgs(args: string[]): string {
    if (args.length === 0) {
        return '';
    }

    return `: ${args.join(', ')}`;
}

export default class NotFoundError extends BaseError {
    public name: string;
    public args: string[];

    constructor(name: string, ...args: string[]) {
        super(`${capitalize(name)} not found${writeArgs(args)}`);

        this.name = name;
        this.args = args;
    }
}
