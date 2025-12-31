export type PlaceFilters = {
  q: string,
  status: 'all' | 'active' | 'inactive',
  region_id?: number
}