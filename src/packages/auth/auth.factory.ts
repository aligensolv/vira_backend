import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";

export class UserFactory {
  /**
   * Define the model's default state.
   */
  static definition(): Omit<User, 'id'> {
    return {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'USER',
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    };
  }

  /**
   * Create a single User instance.
   */
  static make(overrides: Partial<Omit<User, 'id'>> = {}): Omit<User, 'id'> {
    return {
      ...this.definition(),
      ...overrides,
    };
  }

  /**
   * Create multiple User instances.
   */
  static count(amount: number): {
    make(overrides?: Partial<Omit<User, 'id'>>): Omit<User, 'id'>[];
  } {
    return {
      make: (overrides = {}) => {
        return Array.from({ length: amount }, () => this.make(overrides));
      },
    };
  }
}
