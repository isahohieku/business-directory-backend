import { Route } from '../../lib/endpoint.type';
import { HttpMethod } from '../../lib/http.methods';
import { validateContact, validateContactUpdate } from './contact.validators';
import { verifyToken } from '../auth/auth.validators';
import ContactService from './contact.service';

const CONTACT_URL = '/api/contact';

const contactEndpoints: Route[] = [
    {
        path: CONTACT_URL,
        method: HttpMethod.GET,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method getContact is a member of the @class contact.Service to get contact
         */
        service: [ContactService.getContact]
    },

    {
        path: `${CONTACT_URL}`,
        method: HttpMethod.POST,
        /**
         * @method verifyToken to verify user token is valid and available
         * @method validateContact to validate contact data in the body
         */
        middlewares: [verifyToken, validateContact],
        /**
         * @method addContact is a member of the @class contact.Service to add contact
         */
        service: [ContactService.addContact]
    },

    {
        path: `${CONTACT_URL}`,
        method: HttpMethod.PUT,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken, validateContactUpdate],
        /**
         * @method updateContact is a member of the @class contact.Service to update contact
         */
        service: [ContactService.updateContact]
    },

    {
        path: `${CONTACT_URL}`,
        method: HttpMethod.DELETE,
        /**
         * @method verifyToken to verify user token is valid and available
         */
        middlewares: [verifyToken],
        /**
         * @method removeContact is a member of the @class contact.Service to remove contact
         */
        service: [ContactService.removeContact]
    }
];

export default contactEndpoints;
