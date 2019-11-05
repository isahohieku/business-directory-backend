import { Route } from '../lib/endpoint.type';
import { HttpMethod } from '../lib/http.methods';
import { validateBusinessViews, validateBusinessViewsUpdate } from '../validators/businessviews.validators';
import { verifyToken } from '../validators/auth.validators';
import BusinessViewsService from '../services/businessviews.service';

const BUSINESSVIEWS_URL = '/api/businessViews';

const businessViewsEndpoints: Route[] = [
    {
        path: BUSINESSVIEWS_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method getBusinessViews is a member of the @class BusinessViews.Service to get businessViews
         */
        service: [BusinessViewsService.getBusinessViews]
    },

    {
        path: BUSINESSVIEWS_URL,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateBusinessViews to validate businessViews data in the body
         */
        middlewares: [verifyToken, validateBusinessViews],
        /**
         * @method addBusinessViews is a member of the @class businessViews.Service to add contact
         */
        service: [BusinessViewsService.addBusinessViews]
    },

    {
        path: BUSINESSVIEWS_URL,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [],
        /**
         * @method updateBusinessViews is a member of the @class businessViews.Service to update contact
         */
        service: [BusinessViewsService.updateBusinessViews]
    },

    {
        path: BUSINESSVIEWS_URL,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeBusinessViews is a member of the @class businessViews.Service to remove businessViews
         */
        service: [BusinessViewsService.removeBusinessViews]
    }
];

export default businessViewsEndpoints;
