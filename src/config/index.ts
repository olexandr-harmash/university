import { resolve } from "path";

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TMP = process.env.tmp || '/tmp';

export default {
    secret: 'dsad',
    tokenExpiryTime: 43024024,
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    port: 3001,
    bodyParser: {
        limit: '50mb',
        extended: true,
        verify: (req, res, buf) => {
            req.rawBody = buf
        }
    },

    logs: {
        directory: resolve(__dirname, '..', 'logs'),
        filename: 'logfile.log',
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 25,
        colorize: false
    },

    dateFormat: 'DD MMM YY, H:mm:ss',

    authentication: {
        userPasswordSalt: 8,
        expiresIn: 60 * 60 * 24,
        jwtSecret: "super-secret",
    },
    // Database
    storageLimits: {
        userLoginHistory: 12
    },
    development: {
        database: "uts",
        username: "postgres",
        password: "postgres",
        host: "sequelize",
        dialect: "postgres",
        logging: true
    },
    test: {
        database: "uts",
        username: "postgres",
        password: "postgres",
        host: "sequelize",
        dialect: "postgres",
        logging: true,
    },
    production: {
        database: "uts",
        username: "postgres",
        password: "postgres",
        host: "sequelize",
        dialect: "postgres",
        logging: true
    },

    redis: {
        port: 6379,
        host: "redis",
        connection: "some"
    },

    stripe: {
        endpointSecret: process.env.STRIPE_ENDPOINT_SECRET || 'whsec_242a1692eb286988f7a4aa9aae4179ee8cf399770b7f1212b275838b7680e5e8',
        secret: process.env.STRIPE_SECRET || 'sk_test_51NGrkXA5h3jP6DtBdROjN5vuRge89e0SDKqxrFK36MEYzpePJ1p3VEyRxG6wV8S9NU4I3unqW82CylOqQ0FZ3ev500wQ9q0sNj',
        apiVersion: '2023-08-16',
    }
};