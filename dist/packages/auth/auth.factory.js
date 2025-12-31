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
            name: faker_1.faker.internet.username(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            role: 'USER',
            created_at: faker_1.faker.date.past(),
            updated_at: faker_1.faker.date.recent()
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
}
exports.UserFactory = UserFactory;
