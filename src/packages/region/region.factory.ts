import { faker } from "@faker-js/faker";
import type { Region } from "@prisma/client";

export class RegionFactory {
  /**
   * Define the model's default state.
   */
  static definition(): Omit<Region, 'id'> {
    return {
      name: faker.location.county(),
      places_count: faker.number.int({ min: 0, max: 100 }),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  /**
   * Create a single Region instance.
   */
  static make(overrides: Partial<Omit<Region, 'id'>> = {}): Omit<Region, 'id'> {
    return {
      ...this.definition(),
      ...overrides,
    };
  }

  /**
   * Create multiple Region instances.
   */
  static count(amount: number): {
    make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>[];
  } {
    return {
      make: (overrides = {}) => {
        return Array.from({ length: amount }, () => this.make(overrides));
      },
    };
  }

  /**
   * Define a state modification.
   */
  static state(stateOverrides: Partial<Omit<Region, 'id'>>): {
    make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>;
    count(amount: number): {
      make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>[];
    };
  } {
    return {
      make: (overrides = {}) => this.make({ ...stateOverrides, ...overrides }),
      count: (amount: number) => ({
        make: (overrides = {}) => {
          return Array.from({ length: amount }, () => this.make({ ...stateOverrides, ...overrides }));
        },
      }),
    };
  }
}
