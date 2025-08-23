import {
    handleCors,
    handleHelmet,
    handleRateLimiter,
    handleCompression,
    handleRequestParsing,
    handleRequestLogging
} from './common.middlewares';

export default [
    handleHelmet,
    handleCompression,
    handleCors,
    handleRequestLogging,

    handleRateLimiter,
    handleRequestParsing
];