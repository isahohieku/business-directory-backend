import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import express, { Router } from "express";
import rateLimit from "express-rate-limit";
import { main } from "../constants/main.constants";
import morgan from "morgan";


export const handleRequestParsing = (router: Router): void => {
    router.use(express.urlencoded({ limit: main.BODY_PARSER_LIMIT, extended: true }));
    router.use(express.text({ limit: main.BODY_PARSER_LIMIT }));
    router.use(express.json({ limit: main.BODY_PARSER_LIMIT }));
};

export const handleCompression = (router: Router): void => {
    router.use(compression());
};

export const handleCors = (router: Router): void => {
    const origin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : undefined;
    router.use(cors({ origin, credentials: true }));
};


export const handleRequestLogging = (router: Router): void => {
    const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    router.use(morgan(format));
};

export const handleHelmet = (router: Router): void => {
    router.use(helmet());
};

export const handleRateLimiter = (router: Router): void => {
    const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
    const limit = Number(process.env.RATE_LIMIT_MAX || 100);
    const limiter = rateLimit({ windowMs, limit, standardHeaders: "draft-7", legacyHeaders: false });
    router.use(limiter);
}
