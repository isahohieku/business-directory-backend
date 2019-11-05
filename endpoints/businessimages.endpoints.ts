import { Route } from '../lib/endpoint.type';
import { HttpMethod } from '../lib/http.methods';
import { validateBusinessImages, 
    validateBusinessImagesUpdate } from '../validators/businessimages.validators';
import { verifyToken } from '../validators/auth.validators';
import BusinessImagesService from '../services/businessImages.service';

const BUSINESSIMAGES_URL = '/api/businessImages';

const businessImagesEndpoints: Route[] = [
    {
        path: BUSINESSIMAGES_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method getBusinessImages is a member of the @class BusinessImages.Service to get businessImages
         */
        service: [BusinessImagesService.getBusinessImages]
    },

    {
        path: BUSINESSIMAGES_URL,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateBusinessImages to validate businessImages data in the body
         */
        middlewares: [verifyToken, validateBusinessImages],
        /**
         * @method addBusinessImages is a member of the @class businessImages.Service to add contact
         */
        service: [BusinessImagesService.addBusinessImages]
    },

    {
        path: BUSINESSIMAGES_URL,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateBusinessImagesUpdate],
        /**
         * @method updateBusinessImages is a member of the @class businessImages.Service to update contact
         */
        service: [BusinessImagesService.updateBusinessImages]
    },

    {
        path: BUSINESSIMAGES_URL,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeBusinessImages is a member of the @class businessImages.Service to remove businessImages
         */
        service: [BusinessImagesService.removeBusinessImages]
    }
];

export default businessImagesEndpoints;
