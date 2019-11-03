import authEndpoints from "../modules/auth/auth.endpoints";
import categoriesEndpoints from "../modules/categories/categories.endpoints";
import businessesEndpoints from "../modules/businesses/businesses.endpoints";


export default [
    ...authEndpoints,
    // ...contactEndpoints,
    ...categoriesEndpoints,
    ...businessesEndpoints
];