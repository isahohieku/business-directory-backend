import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { Router } from "express";
import { main } from "../constants/main.constants";

export const handleRequestParsing = (router: Router): void => {
    router.use(bodyParser.urlencoded({ limit: main.BODY_PARSER_LIMIT, extended: true }));
    router.use(bodyParser.text({ limit: main.BODY_PARSER_LIMIT }));
    router.use(bodyParser.json({ limit: main.BODY_PARSER_LIMIT }));
};

export const handleCompression = (router: Router): void => {
    router.use(compression());
};

export const handleCors = (router: Router): void => {
    router.use(cors());
};

export const handleHelmet = (router: Router): void => {
    router.use(helmet({ noCache: true }));
};