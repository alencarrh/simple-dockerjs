export default class Optional {
    constructor(value) {
        this.value = value;
    }

    get() {
        return this.value;
    }

    map(mapper) {
        return this.isPresent() ? Optional.of(mapper(this.value)) : Optional.empty();
    }

    orElse(otherValue) {
        return this.value || otherValue;
    }

    orElseDo(action) {
        return this.value || action();
    }

    orError(message) {
        if (!this.isPresent()) {
            throw new Error(message);
        }

        return this.value;
    }

    ifPresent(action) {
        action(this.value);
    }

    isPresent() {
        return !!this.value;
    }

    static empty() {
        return new Optional(undefined);
    }

    static of(value) {
        return new Optional(value);
    }
}
