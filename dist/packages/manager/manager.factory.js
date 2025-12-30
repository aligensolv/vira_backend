"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerFactory = void 0;
const faker_1 = require("@faker-js/faker");
class ManagerFactory {
    /**
     * Define the model's default state.
     */
    static definition() {
        return {
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            created_at: new Date(),
            updated_at: new Date(),
        };
    }
    /**
     * Create a single Manager instance.
     */
    static make(overrides = {}) {
        return {
            ...this.definition(),
            ...overrides,
        };
    }
    /**
     * Create multiple Manager instances.
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
exports.ManagerFactory = ManagerFactory;
