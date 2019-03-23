import BaseError from './error';

export default class NetworkError extends BaseError {
    constructor() {
        super('Network issues. Try again later');
    }
}
