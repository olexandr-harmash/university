
import { RedisClientType } from 'redis'

export abstract class AbstractRedisClient {
    protected tokenExpiryTime: number = 604800;
    protected client: RedisClientType;

    constructor(client: RedisClientType) {
        this.client = client;
    }

    public async count(key: string): Promise<number> {
        const allKeys = await this.getAllKeys(key);
        return allKeys.length;
    }

    public getOne<T>(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client.get(key).then((key) => {
                return resolve(key as T);
            }).catch((err) => {
                return reject(err)
            });
        })
    }

    public exists(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return this.count(key)
                .then((count) => {
                    return resolve(count >= 1 ? true : false)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    }

    public async getAllKeys(wildcard: string): Promise<string[]> {
        const results = await new Promise<string[]>((resolve, reject) => {
            return this.client.keys(wildcard)
                .then((results: string[]) => resolve(results))
                .catch((error: Error) => reject(error));
        });
        return results;
    }

    public async getAllKeyValue(wildcard: string): Promise<any[]> {
        const results = await this.getAllKeys(wildcard);

        return results.map(async (key) => {
            const value = await this.getOne(key);
            return { key, value };
        });
    }

    public async set(key: string, value: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            return this.client.set(key, value)
                .then((reply) => {
                    this.client.expire(key, this.tokenExpiryTime);
                    resolve(reply);
                })
                .catch((error: Error) => reject(error));
        });
    }

    public async deleteOne(key: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            return this.client.del(key)
                .then((reply) => resolve(reply))
                .catch((error: Error) => reject(error));
        });
    }

    public async testConnection(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            return this.client.set('test', 'connected')
                .then(() => resolve(true))
                .catch((error: Error) => reject(error));
        });
    }
}