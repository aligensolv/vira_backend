"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceFactory = void 0;
const faker_1 = require("@faker-js/faker");
class PlaceFactory {
    /**
     * Define the model's default state.
     */
    static definition() {
        return {
            name: faker_1.faker.location.street(),
            is_active: faker_1.faker.datatype.boolean(),
            min_duration_minutes: faker_1.faker.number.int({ min: 15, max: 120 }),
            price_per_hour: faker_1.faker.number.int({ min: 5, max: 100 }),
            region_id: null,
            created_at: new Date(),
            updated_at: new Date(),
        };
    }
    /**
     * Create a single Place instance.
     */
    static make(overrides = {}) {
        return {
            ...this.definition(),
            ...overrides,
        };
    }
    /**
     * Create multiple Place instances.
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
exports.PlaceFactory = PlaceFactory;
