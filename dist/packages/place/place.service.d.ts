import { createPlaceSchema } from './place.schema';
import { PlaceRepository } from "./place.repo";
import z from 'zod';
import { updateRegionSchema } from '../region';
import { PlaceFilters } from './place.type';
export declare class PlaceService {
    private readonly placeRepository;
    constructor(placeRepository: PlaceRepository);
    getAllPlaces: ({ q, status, region_id }: PlaceFilters) => Promise<unknown>;
    getAllActivePlaces: () => Promise<unknown>;
    createPlace: ({ payload }: {
        payload: z.infer<typeof createPlaceSchema>;
    }) => Promise<unknown>;
    updatePlace: ({ id, payload }: {
        id: number;
        payload: z.infer<typeof updateRegionSchema>;
    }) => Promise<unknown>;
    deletePlace: ({ id }: {
        id: number;
    }) => Promise<unknown>;
    getPlace: ({ id }: {
        id: number;
    }) => Promise<unknown>;
}
