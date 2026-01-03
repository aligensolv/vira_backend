export declare function generateHashedPassword(password: string, saltRounds?: number): Promise<string>;
interface IsPasswordValidPayload {
    hashed: string;
    plain: string;
}
export declare function isPasswordValid({ hashed, plain }: IsPasswordValidPayload): Promise<boolean>;
export {};
