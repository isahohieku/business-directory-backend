import authEndpoints from "../modules/auth/auth.endpoints";
import contactEndpoints from "../modules/contact/contact.endpoints";


export default [
    ...authEndpoints,
    ...contactEndpoints
];