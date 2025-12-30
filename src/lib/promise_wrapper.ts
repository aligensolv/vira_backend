import { ApiError } from "./api_error";
import { StatusCode } from "./status_codes";
import { ErrorCode } from "./error_codes";
import { Rejector, Resolver } from "../core/interfaces/promise";

const promiseWrapper = <T>(fn: (resolve: Resolver<T>, reject: Rejector) => Promise<void>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        fn(resolve, reject).catch((error) => {
            const custom_error = new ApiError((error as Error).message, ErrorCode.INTERNAL_SERVER_ERROR, StatusCode.INTERNAL_SERVER);
            reject(custom_error);
        });
    });
}

export default promiseWrapper;