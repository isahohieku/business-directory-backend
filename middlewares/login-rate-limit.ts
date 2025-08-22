import rateLimit from 'express-rate-limit';

// Stricter limits for login endpoint to mitigate brute-force
export const loginRateLimiter = rateLimit({
  windowMs: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  limit: Number(process.env.LOGIN_RATE_LIMIT_MAX || 20),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

