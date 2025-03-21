class Events {
    callbacks = [];
    next_id = 0;

    emit(event_name, value) {
        this.callbacks.forEach(stored => {
            if (stored.event_name === event_name) {
                stored.callback(value)
            }
        })
    }

    on(event_name, caller, callback) {
        this.next_id += 1;
        this.callbacks.push({
            id: this.next_id,
            event_name,
            caller,
            callback
        });

        return this.next_id;
    }

    off(id) {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller);
    }
}

export const events = new Events();