import * as redis from 'redis';
import config from '../../../../config';
import app from '../../../../app';

const port = config.redis.port;
const host = config.redis.host;

const redisConnection = redis.createClient({ socket: { port, host } }); // creates a new client

redisConnection.connect();

redisConnection.on('connect', () => {
    app.logger.info(`[Redis]: Connected to redis server at ${host}:${port}`)
});


export { redisConnection }