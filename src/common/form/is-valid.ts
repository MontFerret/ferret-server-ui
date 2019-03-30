import every from 'lodash/every';
import isPlainObject from 'lodash/isPlainObject';

export default function isFormValid(errors: any): boolean {
    if (errors == null) {
        return false;
    }

    return every(errors, (field) => {
        if (field == null) {
            return true;
        }

        if (isPlainObject(field)) {
            return isFormValid(field);
        }

        return false;
    });
}
