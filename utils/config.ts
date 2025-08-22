import Joi from 'joi';

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),

  // Database
  DATABASE_URL: Joi.string().uri().optional(),
  DB_HOST: Joi.string().when('DATABASE_URL', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  DB_NAME: Joi.string().when('DATABASE_URL', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  DB_USERNAME: Joi.string().when('DATABASE_URL', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  DB_PASSWORD: Joi.string().when('DATABASE_URL', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  DB_PORT: Joi.number().when('DATABASE_URL', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  DB_SSL: Joi.boolean().default(false),

  // Security / JWT
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_ISSUER: Joi.string().optional(),
  JWT_AUDIENCE: Joi.string().optional(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),

  // CORS / Rate limiting
  CORS_ORIGIN: Joi.string().optional(),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: Joi.number().default(100),

  LOG_LEVEL: Joi.string().default('info'),
}).unknown(true);

type AppConfig = {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL?: string;
  DB_HOST?: string;
  DB_NAME?: string;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_PORT?: number;
  DB_SSL: boolean;
  JWT_SECRET: string;
  JWT_ISSUER?: string;
  JWT_AUDIENCE?: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN?: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
  LOG_LEVEL: string;
};

export function validateEnv(raw: NodeJS.ProcessEnv): AppConfig {
  const { value, error } = envSchema.validate(raw, { abortEarly: false, allowUnknown: true, stripUnknown: false });
  if (error) {
    // throw formatted error
    const details = error.details.map(d => d.message).join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return value as AppConfig;
}

