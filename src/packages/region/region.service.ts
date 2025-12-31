import { Region } from "@prisma/client";
import promiseWrapper from "../../lib/promise_wrapper";
import { toRegionDTO } from "./region.mapper";
import { RegionRepository } from "./region.repo";
import { ConflictError, NotFoundError } from "../../lib/api_error";

export class RegionService {
  private readonly regionRepository: RegionRepository

  constructor(regionRepository: RegionRepository) {
    this.regionRepository = regionRepository
  }

  public getAllRegions = async () => promiseWrapper(
    async (resolve) => {
      const result = await this.regionRepository.findMany()
      return resolve(
        result.map(toRegionDTO)
      );
    }
  )

  public createRegion = async (payload: Omit<Region, 'id' | 'created_at' | 'updated_at'>) => promiseWrapper(
    async (resolve) => {
      const result = await this.regionRepository.insert(payload)
      return resolve(
        toRegionDTO(result)
      );
    }
  )

  public deleteRegion = async (id: number) => promiseWrapper(
    async (resolve, reject) => {
      const isRegionExists = await this.regionRepository.exists(id)
      if (!isRegionExists) {
        const error = new NotFoundError("No region found to be deleted")
        return reject(error)
      }

      await this.regionRepository.removeById(id)
      return resolve(true);
    }
  )

  public getSingleRegion = async (id: number) => promiseWrapper(
    async (resolve, reject) => {
      const isRegionExists = await this.regionRepository.exists(id)
      if (!isRegionExists) {
        const error = new NotFoundError("No region was found")
        return reject(error)
      }

      const region = await this.regionRepository.findById(id)
      
      return resolve(
        toRegionDTO(region!)
      );
    }
  )

  public updateRegion = async (id: number, payload: Omit<Partial<Region>, 'id'>) => promiseWrapper(
    async (resolve, reject) => {
      const isRegionExists = await this.regionRepository.search({ id })
      if (!isRegionExists) {
        const error = new NotFoundError("No region found to be updated")
        return reject(error)
      }

      const isNameDuplicated = await this.regionRepository.search({ name: payload.name })
     
      if (isNameDuplicated) {
        const error = new ConflictError("Region name already exists")
        return reject(error)
      }

      const result = await this.regionRepository.updateById(id, payload)
      return resolve(
        toRegionDTO(result)
      );
    }
  )
}

