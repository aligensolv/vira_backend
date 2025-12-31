import { faker } from "@faker-js/faker";
import type { Place } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

export class PlaceFactory {
  /**
   * Define the model's default state.
   */
  static definition(): Omit<Place, 'id'> {
    return {
      name: faker.location.street(),
      is_active: faker.datatype.boolean(),
      min_duration_minutes: faker.number.int({ min: 15, max: 120 }),
      price_per_hour: faker.number.int({ min: 5, max: 100 }) as unknown as Decimal,
      region_id: null,
      
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  /**
   * Create a single Place instance.
   */
  static make(overrides: Partial<Omit<Place, 'id'>> = {}): Omit<Place, 'id'> {
    return {
      ...this.definition(),
      ...overrides,
    };
  }

  /**
   * Create multiple Place instances.
   */
  static count(amount: number): {
    make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>[];
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
  static state(stateOverrides: Partial<Omit<Place, 'id'>>): {
    make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>;
    count(amount: number): {
      make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>[];
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
