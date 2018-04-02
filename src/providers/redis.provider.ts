import * as redis from 'redis';
import * as bluebird from 'bluebird';



export const client = redis.createClient({
    host:"localhost",
    port:"6379"
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const RedisProvider:any= {
    provide: 'RedisProvider',
    useValue: client
};