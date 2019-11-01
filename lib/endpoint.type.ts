import { HttpMethod } from './http.methods';
import { EndpointHandler } from './endpoint.handler';

export interface Route {
    path: string;
    method: HttpMethod;
    middlewares: EndpointHandler | EndpointHandler[];
    service: EndpointHandler | EndpointHandler[];
}
