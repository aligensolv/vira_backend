/**
 * Represents a generic authentication strategy.
 */
export interface AuthStrategy<TCredentials, TUser> {
  /**
   * The name of the strategy provider.
   */
  name: StrategyProvider;

  /**
   * Authenticates a user based on the provided credentials.
   * @param credentials The user's credentials.
   * @returns A promise that resolves to the user object if authentication is successful, otherwise null.
   */
  authenticate(credentials: TCredentials): Promise<TUser | null>;

  /**
   * Logs out a user.
   * @param subject_id The ID of the user to log out.
   * @returns A promise that resolves when the user is logged out.
   */
  logout?(subject_id: number): Promise<void>;

  /**
   * Registers a new user.
   * @param credentials The credentials for the new user.
   * @returns A promise that resolves to the newly created user object.
   */
  register?(credentials: TCredentials): Promise<TUser>;

  /**
   * Issues access and refresh tokens for a user.
   * @param user The user object.
   * @returns A promise that resolves to an object containing the access and refresh tokens.
   */
  issueTokens(user: TUser): Promise<{ accessToken: string; refreshToken?: string }>;

  /**
   * Verifies a token.
   * @param token The token to verify.
   * @returns A promise that resolves to the user object if the token is valid, otherwise null.
   */
  verify?(token: string): Promise<TUser | null>;

  /**
   * Fetches a user based on the provided credentials.
   * @param credentials The user's credentials.
   * @returns A promise that resolves to the user object if found, otherwise null.
   */
  getUser?(credentials: TCredentials): Promise<TUser | null>;

  /**
   * Logs in a user.
   * @param credentials The user's credentials.
   * @returns A promise that resolves to an object containing the user and tokens if login is successful, otherwise null.
   */
  login?(credentials: TCredentials): Promise<{ user: TUser; token: { accessToken: string; refreshToken?: string; } } | null>;
}

export type AuthStrategyConstructor<TCredentials, TUser> = new () => AuthStrategy<TCredentials, TUser>;

export type StrategyProvider = 'manager' | 'user'