import { Prisma } from "@prisma/client";
export declare class BookingRepository {
    findMany(filter?: Prisma.BookingWhereInput): Promise<{
        status: import("@prisma/client").$Enums.BookingStatus;
        id: number;
        user_id: number;
        place_id: number;
        start_time: Date;
        end_time: Date;
        duration_minutes: number;
        total_price: Prisma.Decimal;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findById(id: number): Promise<({
        user: {
            email: string;
            password: string;
            name: string;
            id: number;
            created_at: Date;
            updated_at: Date;
            role: import("@prisma/client").$Enums.UserRole;
        };
    } & {
        status: import("@prisma/client").$Enums.BookingStatus;
        id: number;
        user_id: number;
        place_id: number;
        start_time: Date;
        end_time: Date;
        duration_minutes: number;
        total_price: Prisma.Decimal;
        created_at: Date;
        updated_at: Date;
    }) | null>;
    findOne(filter: Prisma.BookingWhereInput): Promise<{
        status: import("@prisma/client").$Enums.BookingStatus;
        id: number;
        user_id: number;
        place_id: number;
        start_time: Date;
        end_time: Date;
        duration_minutes: number;
        total_price: Prisma.Decimal;
        created_at: Date;
        updated_at: Date;
    } | null>;
    exists(filter: Prisma.BookingWhereInput): Promise<boolean>;
    insert(data: Prisma.BookingCreateInput): Promise<{
        status: import("@prisma/client").$Enums.BookingStatus;
        id: number;
        user_id: number;
        place_id: number;
        start_time: Date;
        end_time: Date;
        duration_minutes: number;
        total_price: Prisma.Decimal;
        created_at: Date;
        updated_at: Date;
    }>;
    updateById(id: number, data: Prisma.BookingUpdateInput): Promise<{
        status: import("@prisma/client").$Enums.BookingStatus;
        id: number;
        user_id: number;
        place_id: number;
        start_time: Date;
        end_time: Date;
        duration_minutes: number;
        total_price: Prisma.Decimal;
        created_at: Date;
        updated_at: Date;
    }>;
    updateMany(filter: Prisma.BookingWhereInput, data: Prisma.BookingUpdateInput): Promise<Prisma.BatchPayload>;
    removeById(id: number): Promise<{
        status: import("@prisma/client").$Enums.BookingStatus;
        id: number;
        user_id: number;
        place_id: number;
        start_time: Date;
        end_time: Date;
        duration_minutes: number;
        total_price: Prisma.Decimal;
        created_at: Date;
        updated_at: Date;
    }>;
    removeMany(filter: Prisma.BookingWhereInput): Promise<Prisma.BatchPayload>;
}
