import type { Place } from "@prisma/client";
export declare class PlaceFactory {
    /**
     * Define the model's default state.
     */
    static definition(): Omit<Place, 'id'>;
    /**
     * Create a single Place instance.
     */
    static make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>;
    /**
     * Create multiple Place instances.
     */
    static count(amount: number): {
        make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>[];
    };
    /**
     * Define a state modification.
     */
    static state(stateOverrides: Partial<Omit<Place, 'id'>>): {
        make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>;
        count(amount: number): {
            make(overrides?: Partial<Omit<Place, 'id'>>): Omit<Place, 'id'>[];
        };
    };
}
