import authEndpoints from "../modules/auth/auth.endpoints";
import categoriesEndpoints from "../modules/categories/categories.endpoints";
import businessesEndpoints from "../modules/businesses/businesses.endpoints";
import businessViewsEndpoints from "../modules/businessviews/businessviews.endpoints";


export default [
    ...authEndpoints,
    // ...contactEndpoints,
    ...categoriesEndpoints,
    ...businessesEndpoints,
    ...businessViewsEndpoints
];