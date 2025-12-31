"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const faker_1 = require("@faker-js/faker");
class UserFactory {
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
     * Create a single User instance.
     */
    static make(overrides = {}) {
        return {
            ...this.definition(),
            ...overrides,
        };
    }
    /**
     * Create multiple User instances.
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
exports.UserFactory = UserFactory;
