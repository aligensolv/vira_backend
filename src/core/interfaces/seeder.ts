export interface Seeder {
  run(): Promise<void>;
  truncate(): Promise<void>;
}