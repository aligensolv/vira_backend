import { createPlaceSchema } from './place.schema';
import promiseWrapper from "../../lib/promise_wrapper";
import { toPlaceDTO } from "./place.mapper";
import { PlaceRepository } from "./place.repo";
import z from 'zod';
import { updateRegionSchema } from '../region';
import { NotFoundError } from '../../lib/api_error';



export class PlaceService {
  private readonly placeRepository

  constructor(placeRepository: PlaceRepository) {
    this.placeRepository = placeRepository
  }

  public getAllPlaces = async () => promiseWrapper(
    async (resolve) => {
      const result = await this.placeRepository.findMany()
      return resolve(
        result.map(toPlaceDTO)
      );
    }
  )

  public getAllActivePlaces = async () => promiseWrapper(
    async (resolve) => {
      const result = await this.placeRepository.findMany({
        is_active: true
      })
      return resolve(
        result.map(toPlaceDTO)
      );
    }
  )

  public createPlace = async ({ payload }: { payload: z.infer<typeof createPlaceSchema> }) => promiseWrapper(
    async (resolve) => {
      const result = await this.placeRepository.insert(payload)
      return resolve(
        toPlaceDTO(result)
      );
    }
  )

  public updatePlace = async ({ id, payload }: { id: number, payload: z.infer<typeof updateRegionSchema> }) => promiseWrapper(
    async (resolve, reject) => {
      const is_place_exists = await this.placeRepository.exists({ id })
      if (!is_place_exists) {
        const error = new NotFoundError("No region found to be deleted")
        return reject(error)
      }
      
      const result = await this.placeRepository.updateById(id, payload)

      return resolve(
        toPlaceDTO(result)
      );
    }
  )

  public deletePlace = async ({ id }: { id: number }) => promiseWrapper(
    async (resolve, reject) => {
      const is_place_exists = await this.placeRepository.exists({ id })
      if (!is_place_exists) {
        const error = new NotFoundError("No region found to be deleted")
        return reject(error)
      }

      await this.placeRepository.removeById(id)
      return resolve(null);
    }
  )
  
  public getPlace = async ({ id }: { id: number }) => promiseWrapper(
    async (resolve) => {
      const place = await this.placeRepository.findById(id)
      return resolve(place);
    }
  )
}
