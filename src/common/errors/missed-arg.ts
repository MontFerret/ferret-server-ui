import capitalize from 'lodash/capitalize';
import BaseError from './error';

export default class MissedArgumentError extends BaseError {
    public argument: string;

    constructor(arg = 'argument') {
        const argCap = capitalize(arg);

        super(`"${argCap}" is required`);

        this.argument = arg;
    }
}
