// // ============================================
// // CACHE SERVICE
// // src/services/cache/index.ts
// // ============================================

// import Redis from 'ioredis';
// import { logger } from '../logger';

// /**
//  * Cache service using Redis for high-performance caching
//  */
// export class CacheService {
//   private static instance: CacheService;
//   private redis: Redis | null = null;
//   private isConnected: boolean = false;
//   private config: CacheConfig;

//   private constructor(config?: CacheConfig) {
//     this.config = config || this.getDefaultConfig();
//   }

//   /**
//    * Get singleton instance of CacheService
//    */
//   static getInstance(config?: CacheConfig): CacheService {
//     if (!CacheService.instance) {
//       CacheService.instance = new CacheService(config);
//     }
//     return CacheService.instance;
//   }

//   /**
//    * Connect to Redis
//    */
//   async connect(): Promise<void> {
//     if (this.isConnected) return;

//     try {
//       this.redis = new Redis({
//         host: this.config.host,
//         port: this.config.port,
//         password: this.config.password,
//         db: this.config.database,
//         retryStrategy: (times) => {
//           const delay = Math.min(times * 50, 2000);
//           return delay;
//         },
//         maxRetriesPerRequest: 3,
//       });

//       this.redis.on('connect', () => {
//         this.isConnected = true;
//         logger.info('Cache service connected to Redis');
//       });

//       this.redis.on('error', (error) => {
//         logger.error('Redis connection error:', error);
//       });

//       await this.redis.ping();
//     } catch (error) {
//       logger.error('Failed to connect to Redis:', error);
//       throw new CacheServiceError('Redis connection failed', error);
//     }
//   }

//   /**
//    * Disconnect from Redis
//    */
//   async disconnect(): Promise<void> {
//     if (!this.isConnected || !this.redis) return;

//     await this.redis.quit();
//     this.isConnected = false;
//     logger.info('Disconnected from Redis');
//   }

//   /**
//    * Get value from cache
//    * @param key Cache key
//    * @returns Cached value or null
//    */
//   async get<T = any>(key: string): Promise<T | null> {
//     this.ensureConnected();

//     try {
//       const value = await this.redis!.get(this.prefixKey(key));
      
//       if (!value) return null;

//       try {
//         return JSON.parse(value) as T;
//       } catch {
//         // If parsing fails, return as string
//         return value as unknown as T;
//       }
//     } catch (error) {
//       logger.error(`Failed to get cache key ${key}:`, error);
//       throw new CacheServiceError(`Failed to get cache key ${key}`, error);
//     }
//   }

//   /**
//    * Set value in cache
//    * @param key Cache key
//    * @param value Value to cache
//    * @param options Set options
   