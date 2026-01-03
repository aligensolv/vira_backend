// import { faker } from "@faker-js/faker";
// import type { Booking } from "@prisma/client";

// export class BookingFactory {
//   /**
//    * Define the model's default state.
//    */
//   static definition(): Omit<Booking, 'id'> {
//     return {
//       // Customize the fields based on your Booking model

//     };
//   }

//   /**
//    * Create a single Booking instance.
//    */
//   static make(overrides: Partial<Omit<Booking, 'id'>> = {}): Omit<Booking, 'id'> {
//     return {
//       ...this.definition(),
//       ...overrides,
//     };
//   }

//   /**
//    * Create multiple Booking instances.
//    */
//   static count(amount: number): {
//     make(overrides?: Partial<Omit<Booking, 'id'>>): Omit<Booking, 'id'>[];
//   } {
//     return {
//       make: (overrides = {}) => {
//         return Array.from({ length: amount }, () => this.make(overrides));
//       },
//     };
//   }

//   /**
//    * Define a state modification.
//    */
//   static state(stateOverrides: Partial<Omit<Booking, 'id'>>): {
//     make(overrides?: Partial<Omit<Booking, 'id'>>): Omit<Booking, 'id'>;
//     count(amount: number): {
//       make(overrides?: Partial<Omit<Booking, 'id'>>): Omit<Booking, 'id'>[];
//     };
//   } {
//     return {
//       make: (overrides = {}) => this.make({ ...stateOverrides, ...overrides }),
//       count: (amount: number) => ({
//         make: (overrides = {}) => {
//           return Array.from({ length: amount }, () => this.make({ ...stateOverrides, ...overrides }));
//         },
//       }),
//     };
//   }
// }
