import toString from 'lodash/toString';

export default class BaseError extends Error {
    public static fromError(err: Error): BaseError {
        if (err instanceof BaseError) {
            return err;
        }

        if (err instanceof Error) {
            return new BaseError(err.message, err);
        }

        return new BaseError(toString(err));
    }

    public readonly cause?: Error;

    constructor(msg: string, cause?: Error) {
        super(msg);

        // restore prototype chain
        const actualProto = new.target.prototype;

        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            (this as any).__proto__ = new.target.prototype;
        }

        this.cause = cause;
    }
}
