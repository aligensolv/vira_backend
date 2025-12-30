"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionFactory = void 0;
const faker_1 = require("@faker-js/faker");
class RegionFactory {
    /**
     * Define the model's default state.
     */
    static definition() {
        return {
            name: faker_1.faker.location.county(),
            places_count: faker_1.faker.number.int({ min: 0, max: 100 }),
            created_at: new Date(),
            updated_at: new Date(),
        };
    }
    /**
     * Create a single Region instance.
     */
    static make(overrides = {}) {
        return {
            ...this.definition(),
            ...overrides,
        };
    }
    /**
     * Create multiple Region instances.
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
exports.RegionFactory = RegionFactory;
