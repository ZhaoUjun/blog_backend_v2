import { Component,  } from '@nestjs/common';
import * as redis from 'redis';
import * as util from 'util';

const client = redis.createClient({
    host:"localhost",
    port:"6379"
});

@Component()
export class RedisService {

    getVal(key:string){
        return util.promisify(client.get).call(client,key)
    }

    setVal(key:string,val:string,unit:string='EX',expiredTime?:number){
        return util.promisify(client.set).apply(client,arguments)
    }

}