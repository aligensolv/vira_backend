"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardFactory = void 0;
class DashboardFactory {
    /**
     * Define the model's default state.
     */
    static definition() {
        return {
        // Customize the fields based on your Dashboard model
        };
    }
    /**
     * Create a single Dashboard instance.
     */
    static make(overrides = {}) {
        return {
            ...this.definition(),
            ...overrides,
        };
    }
    /**
     * Create multiple Dashboard instances.
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
exports.DashboardFactory = DashboardFactory;
