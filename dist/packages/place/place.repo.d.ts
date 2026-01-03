import { Prisma } from "@prisma/client";
export declare class PlaceRepository {
    findMany(filter?: Prisma.PlaceWhereInput): Promise<({
        region: {
            name: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            places_count: number | null;
        } | null;
    } & {
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        region_id: number | null;
        price_per_hour: Prisma.Decimal;
        min_duration_minutes: number;
        is_active: boolean;
    })[]>;
    findById(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        region_id: number | null;
        price_per_hour: Prisma.Decimal;
        min_duration_minutes: number;
        is_active: boolean;
    } | null>;
    findOne(filter: Prisma.PlaceWhereInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        region_id: number | null;
        price_per_hour: Prisma.Decimal;
        min_duration_minutes: number;
        is_active: boolean;
    } | null>;
    exists(filter: Prisma.PlaceWhereInput): Promise<boolean>;
    count(filter: Prisma.PlaceWhereInput): Promise<number>;
    insert(data: Prisma.PlaceCreateInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        region_id: number | null;
        price_per_hour: Prisma.Decimal;
        min_duration_minutes: number;
        is_active: boolean;
    }>;
    updateById(id: number, data: Prisma.PlaceUpdateInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        region_id: number | null;
        price_per_hour: Prisma.Decimal;
        min_duration_minutes: number;
        is_active: boolean;
    }>;
    updateMany(filter: Prisma.PlaceWhereInput, data: Prisma.PlaceUpdateInput): Promise<Prisma.BatchPayload>;
    removeById(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        region_id: number | null;
        price_per_hour: Prisma.Decimal;
        min_duration_minutes: number;
        is_active: boolean;
    }>;
    removeMany(filter: Prisma.PlaceWhereInput): Promise<Prisma.BatchPayload>;
    search(filter?: Prisma.RegionWhereInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    } | null>;
}
