import authEndpoints from "../modules/auth/auth.endpoints";
import contactEndpoints from "../modules/contact/contact.endpoints";
import phoneEndpoints from "../modules/phone/phone.endpoints";
import emailEndpoints from "../modules/email/email.endpoints";
import socialEndpoints from "../modules/social/social.endpoints";
import occupationEndpoints from "../modules/occupation/occupation.endpoints";


export default [
    ...authEndpoints,
    ...contactEndpoints,
    ...phoneEndpoints,
    ...emailEndpoints,
    ...socialEndpoints,
    ...occupationEndpoints
];