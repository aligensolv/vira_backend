import 'dotenv/config';
type NodeEnvironment = 'development' | 'production';
export declare const appConfig: {
    name: string;
    url: string;
    env: NodeEnvironment;
    port: string | number;
    host: string;
    logLevel: string;
};
export declare const securityConfig: {
    jwtSecret: string;
    jwtExpiresIn: string;
};
export declare const corsConfig: {
    whitelist: string[];
};
export declare const emailConfig: {
    host: string;
    port: string | number;
    user: string;
    pass: string;
    from: string;
};
export declare const uploadConfig: {
    dir: string;
};
export {};
