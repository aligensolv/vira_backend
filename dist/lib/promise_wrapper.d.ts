import { Rejector, Resolver } from "../core/interfaces/promise";
declare const promiseWrapper: <T>(fn: (resolve: Resolver<T>, reject: Rejector) => Promise<void>) => Promise<T>;
export default promiseWrapper;
