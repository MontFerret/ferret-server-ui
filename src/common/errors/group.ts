import BaseError from './error';

export default class GroupError extends BaseError {
    public readonly errors: BaseError[];

    constructor(msg: string, errors: BaseError[]) {
        super(`${msg}: ${errors.map(i => i.message).join(':')}`);

        this.errors = errors;
    }
}
