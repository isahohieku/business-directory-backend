import { Router } from "express";

type Wrapper = ((router: Router) => void)

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router): void => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};