import { Prisma } from "@prisma/client";
export declare class RegionRepository {
    findMany(filter?: Prisma.RegionWhereInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    }[]>;
    findById(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    } | null>;
    insert(data: Prisma.RegionCreateInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    }>;
    updateById(id: number, data: Prisma.RegionUpdateInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    }>;
    removeById(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    }>;
    exists(id: number): Promise<boolean>;
    search(filter?: Prisma.RegionWhereInput): Promise<{
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        places_count: number | null;
    } | null>;
    count(filter?: Prisma.RegionWhereInput): Promise<number>;
}
