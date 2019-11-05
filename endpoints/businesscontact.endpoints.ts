import { Route } from '../lib/endpoint.type';
import { HttpMethod } from '../lib/http.methods';
import { validateBusinessContact, 
    validateBusinessUpdateContact } from '../validators/businesscontact.validators';
import { verifyToken } from '../validators/auth.validators';
import BusinessContactService from '../services/businesscontact.service';

const BUSINESSCONTACT_URL = '/api/businesscontact';

const businessContactEndpoints: Route[] = [
    {
        path: BUSINESSCONTACT_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method getBusinessContact is a member of the @class BusinessContact.Service to get businessContact
         */
        service: [BusinessContactService.getBusinessContact]
    },

    {
        path: BUSINESSCONTACT_URL,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateBusinessContact to validate businessContact data in the body
         */
        middlewares: [verifyToken, validateBusinessContact],
        /**
         * @method addBusinessContact is a member of the @class businessContact.Service to add contact
         */
        service: [BusinessContactService.addBusinessContact]
    },

    {
        path: BUSINESSCONTACT_URL,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateBusinessUpdateContact],
        /**
         * @method updateBusinessContact is a member of the @class businessContact.Service to update contact
         */
        service: [BusinessContactService.updateBusinessContact]
    },

    {
        path: BUSINESSCONTACT_URL,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeBusinessContact is a member of the @class businessContact.Service to remove businessContact
         */
        service: [BusinessContactService.removeBusinessContact]
    }
];

export default businessContactEndpoints;
