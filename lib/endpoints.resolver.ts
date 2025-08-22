import { Router } from 'express';
import { Route } from './endpoint.type';

export const resolveEndpoints = (routes: Route[], router: Router): void => {
    for (const route of routes) {
        const { method, path, middlewares, service } = route;
        (router)[method](path, middlewares, service);
    };
};
