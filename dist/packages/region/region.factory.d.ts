import type { Region } from "@prisma/client";
export declare class RegionFactory {
    /**
     * Define the model's default state.
     */
    static definition(): Omit<Region, 'id'>;
    /**
     * Create a single Region instance.
     */
    static make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>;
    /**
     * Create multiple Region instances.
     */
    static count(amount: number): {
        make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>[];
    };
    /**
     * Define a state modification.
     */
    static state(stateOverrides: Partial<Omit<Region, 'id'>>): {
        make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>;
        count(amount: number): {
            make(overrides?: Partial<Omit<Region, 'id'>>): Omit<Region, 'id'>[];
        };
    };
}
