import authEndpoints from "../modules/auth/auth.endpoints";
import categoriesEndpoints from "../modules/categories/categories.endpoints";


export default [
    ...authEndpoints,
    // ...contactEndpoints,
    ...categoriesEndpoints
];