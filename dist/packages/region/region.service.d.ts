import { Region } from "@prisma/client";
import { RegionRepository } from "./region.repo";
export declare class RegionService {
    private readonly regionRepository;
    constructor(regionRepository: RegionRepository);
    getAllRegions: () => Promise<unknown>;
    createRegion: (payload: Omit<Region, "id" | "created_at" | "updated_at">) => Promise<unknown>;
    deleteRegion: (id: number) => Promise<unknown>;
    getSingleRegion: (id: number) => Promise<unknown>;
    updateRegion: (id: number, payload: Omit<Partial<Region>, "id">) => Promise<unknown>;
}
