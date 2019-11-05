import authEndpoints from "./auth.endpoints";
import categoriesEndpoints from "./categories.endpoints";
import businessesEndpoints from "./businesses.endpoints";
import businessViewsEndpoints from "./businessviews.endpoints";


export default [
    ...authEndpoints,
    // ...contactEndpoints,
    ...categoriesEndpoints,
    ...businessesEndpoints,
    ...businessViewsEndpoints
];