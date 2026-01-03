import { PlaceRepository } from "../place";
import { RegionRepository } from "../region";
export declare class DashboardService {
    private readonly placeRepository;
    private readonly regionRepository;
    constructor(placeRepository: PlaceRepository, regionRepository: RegionRepository);
    getDashboardMetrics: () => Promise<unknown>;
}
