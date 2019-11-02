import { Route } from '../../lib/endpoint.type';
import { HttpMethod } from '../../lib/http.methods';
import { validateBusinessCategories, validateBusinessCategoriesUpdate } from './businessCategories.validators';
import { verifyToken } from '../auth/auth.validators';
import BusinessCategoriesService from './businessCategories.service';

const BUSINESSCATEGORIES_URL = '/api/businessCategories';

const businessCategoriesEndpoints: Route[] = [
    {
        path: BUSINESSCATEGORIES_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method getBusinessCategories is a member of the @class BusinessCategories.Service to get businessCategories
         */
        service: [BusinessCategoriesService.getBusinessCategories]
    },

    {
        path: BUSINESSCATEGORIES_URL,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateBusinessCategories to validate businessCategories data in the body
         */
        middlewares: [verifyToken, validateBusinessCategories],
        /**
         * @method addBusinessCategories is a member of the @class businessCategories.Service to add contact
         */
        service: [BusinessCategoriesService.addBusinessCategories]
    },

    {
        path: BUSINESSCATEGORIES_URL,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateBusinessCategoriesUpdate],
        /**
         * @method updateBusinessCategories is a member of the @class businessCategories.Service to update contact
         */
        service: [BusinessCategoriesService.updateBusinessCategories]
    },

    {
        path: BUSINESSCATEGORIES_URL,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeBusinessCategories is a member of the @class businessCategories.Service to remove 
         * businessCategories
         */
        service: [BusinessCategoriesService.removeBusinessCategories]
    }
];

export default businessCategoriesEndpoints;
