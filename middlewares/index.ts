import {
    handleCors,
    handleHelmet,
    // handlePaginate,
    // handleRateLimiter,
    handleCompression,
    handleRequestParsing
} from './common.middlewares';

export default [
    handleHelmet,
    handleCompression,
    handleCors,
    // handlePaginate, 
    // handleRateLimiter, 
    handleRequestParsing
];