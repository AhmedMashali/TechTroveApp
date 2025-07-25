import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const jwtExpirePattern = /^(\d+|(\d+)(s|m|h|d|w|y))$/;

const envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    MONGODB_URI: Joi.string().uri().required(),
    JWT_SECRET: Joi.string().min(10).required(),
    JWT_EXPIRE: Joi.string().pattern(jwtExpirePattern).default('7d'),
    JWT_REFRESH_SECRET: Joi.string().min(10).required(),
    JWT_REFRESH_EXPIRE: Joi.string().pattern(jwtExpirePattern).default('15m'),
    DEV_ORIGIN: Joi.string().uri().required(),
    PROD_ORIGIN: Joi.string().uri().required()
}).unknown(true);

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
}

export const env = {
    PORT: envVars.PORT,
    NODE_ENV: envVars.NODE_ENV,
    MONGODB_URI: envVars.MONGODB_URI,
    JWT_SECRET: envVars.JWT_SECRET,
    JWT_EXPIRE: /^\d+$/.test(envVars.JWT_EXPIRE)
        ? parseInt(envVars.JWT_EXPIRE, 10)
        : envVars.JWT_EXPIRE,
    JWT_REFRESH_SECRET: envVars.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRE: /^\d+$/.test(envVars.JWT_REFRESH_EXPIRE)
        ? parseInt(envVars.JWT_REFRESH_EXPIRE, 10)
        : envVars.JWT_REFRESH_EXPIRE,
    isProduction: envVars.NODE_ENV === 'production',
    isDevelopment: envVars.NODE_ENV === 'development',
    ORIGINS: envVars.NODE_ENV === 'development' ? [envVars.DEV_ORIGIN] : [envVars.PROD_ORIGIN]
};
