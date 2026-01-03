import type { User } from "@prisma/client";
export declare class UserFactory {
    /**
     * Define the model's default state.
     */
    static definition(): Omit<User, 'id'>;
    /**
     * Create a single User instance.
     */
    static make(overrides?: Partial<Omit<User, 'id'>>): Omit<User, 'id'>;
    /**
     * Create multiple User instances.
     */
    static count(amount: number): {
        make(overrides?: Partial<Omit<User, 'id'>>): Omit<User, 'id'>[];
    };
}
