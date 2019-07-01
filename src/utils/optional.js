export default class Optional {
    constructor(value) {
        this.value = value;
    }

    get() {
        return this.value;
    }

    or(action) {
        return this.value || (action && action());
    }

    orError(message) {
        if (!this.value) {
            throw new Error(message);
        }

        return this.value;
    }

    static for(value) {
        return new Optional(value);
    }
}
