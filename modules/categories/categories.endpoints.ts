import { Route } from '../../lib/endpoint.type';
import { HttpMethod } from '../../lib/http.methods';
import { validateCategories, validateUpdateCategories } from './categories.validators';
import { verifyToken } from '../auth/auth.validators';
import CategoriesService from './categories.service';

const CATEGORIES_URL = '/api/categories';

const categoriesEndpoints: Route[] = [
    {
        path: CATEGORIES_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method getCategories is a member of the @class Categories.Service to get categories
         */
        service: [CategoriesService.getCategories]
    },

    {
        path: `${CATEGORIES_URL}/search`,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateCategories to validate categories data in the body
         */
        middlewares: [verifyToken],
        /**
         * @method addCategories is a member of the @class categories.Service to add contact
         */
        service: [CategoriesService.getCategories]
    },

    {
        path: CATEGORIES_URL,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateCategories],
        /**
         * @method updateCategories is a member of the @class categories.Service to update contact
         */
        service: [CategoriesService.addCategories]
    },

    {
        path: CATEGORIES_URL,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateUpdateCategories],
        /**
         * @method updateCategories is a member of the @class categories.Service to update contact
         */
        service: [CategoriesService.updateCategories]
    },

    {
        path: CATEGORIES_URL,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeCategories is a member of the @class categories.Service to remove categories
         */
        service: [CategoriesService.removeCategories]
    }
];

export default categoriesEndpoints;
