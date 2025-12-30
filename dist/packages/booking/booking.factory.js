"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingFactory = void 0;
class BookingFactory {
    /**
     * Define the model's default state.
     */
    static definition() {
        return {
        // Customize the fields based on your Booking model
        };
    }
    /**
     * Create a single Booking instance.
     */
    static make(overrides = {}) {
        return {
            ...this.definition(),
            ...overrides,
        };
    }
    /**
     * Create multiple Booking instances.
     */
    static count(amount) {
        return {
            make: (overrides = {}) => {
                return Array.from({ length: amount }, () => this.make(overrides));
            },
        };
    }
    /**
     * Define a state modification.
     */
    static state(stateOverrides) {
        return {
            make: (overrides = {}) => this.make({ ...stateOverrides, ...overrides }),
            count: (amount) => ({
                make: (overrides = {}) => {
                    return Array.from({ length: amount }, () => this.make({ ...stateOverrides, ...overrides }));
                },
            }),
        };
    }
}
exports.BookingFactory = BookingFactory;
