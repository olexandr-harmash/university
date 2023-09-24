
import { redisConnection } from "./redis/RedisConnection";
import { RedisAuthServiceImp } from "./redis/AuthRedisService";

const authService = new RedisAuthServiceImp(
    redisConnection
)

authService.testConnection().then(i => console.log(i)).catch(err => console.log(err))

export { authService }