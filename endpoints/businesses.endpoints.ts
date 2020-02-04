import { Route } from '../lib/endpoint.type';
import { HttpMethod } from '../lib/http.methods';
import { validateBusinesses, validateBusinessesUpdate } from '../validators/businesses.validators';
import { verifyToken } from '../validators/auth.validators';
import BusinessesService from '../services/businesses.service';

const BUSINESSES_URL = '/api/businesses';

const businessesEndpoints: Route[] = [
    {
        path: BUSINESSES_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [],
        /**
         * @method getBusinesses is a member of the @class Businesses.Service to get businesses
         */
        service: [BusinessesService.getBusinesses]
    },

    {
        path: `${BUSINESSES_URL}/search`,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [],
        /**
         * @method getBusinesses is a member of the @class Businesses.Service to get businesses
         */
        service: [BusinessesService.getBusinesses]
    },

    {
        path: `${BUSINESSES_URL}/recent`,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [],
        /**
         * @method getBusinesses is a member of the @class Businesses.Service to get businesses
         */
        service: [BusinessesService.getRecentBusinesses]
    },

    {
        path: BUSINESSES_URL,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateBusinesses to validate businesses data in the body
         */
        middlewares: [],
        /**
         * @method addBusinesses is a member of the @class businesses.Service to add contact
         */
        service: [BusinessesService.addBusinesses]
    },

    {
        path: BUSINESSES_URL,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateBusinessesUpdate],
        /**
         * @method updateBusinesses is a member of the @class businesses.Service to update contact
         */
        service: [BusinessesService.updateBusinesses]
    },

    {
        path: BUSINESSES_URL,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeBusinesses is a member of the @class businesses.Service to remove businesses
         */
        service: [BusinessesService.removeBusinesses]
    }
];

export default businessesEndpoints;
