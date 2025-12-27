import { ApiError } from "../../lib/api_error";

type Resolver<T> = (value: T | PromiseLike<T>) => void;
type Rejector = (reason: ApiError) => void;


export type { Resolver, Rejector }