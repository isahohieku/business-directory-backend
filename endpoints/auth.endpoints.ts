import { Route } from '../lib/endpoint.type';
import { HttpMethod } from '../lib/http.methods';
import { validateLogin, validateSignup } from '../validators/auth.validators';
import AuthService from '../services/auth.service';

const AUTH_URL = '/api/auth';

const authEndpoints: Route[] = [
    {
        path: AUTH_URL,
        method: HttpMethod.POST,
        middlewares:[validateSignup],
        service: [AuthService.registerUser]
    },
    {
        path: `${AUTH_URL}/login`,
        method: HttpMethod.POST,
        middlewares:[validateLogin],
        service: [AuthService.loginUser]
    }
];

export default authEndpoints;
