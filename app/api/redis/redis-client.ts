
import Redis from 'ioredis';
import config from '../../config';

const redis = new Redis(config.redis);

redis.on('connect', () => {
    console.log('connected to redis');
});

redis.on('error', () => {
    console.error('error connecting to redis');
})

export default redis;

