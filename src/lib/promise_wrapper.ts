import { InternalServerError } from "./api_error";
import { Rejector, Resolver } from "../core/interfaces/promise";

const promiseWrapper = <T>(fn: (resolve: Resolver<T>, reject: Rejector) => Promise<void>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        fn(resolve, reject).catch((error) => {
            const custom_error = new InternalServerError((error as Error).message);
            reject(custom_error);
        });
    });
}

export default promiseWrapper;