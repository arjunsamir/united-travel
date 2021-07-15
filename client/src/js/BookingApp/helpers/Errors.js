export class DevError extends Error {

    constructor(details, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DevError)
        }

        this.name = 'DevError';

        this.additionalDetails = details;
    }

}