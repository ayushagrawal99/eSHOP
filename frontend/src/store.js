import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    ProductListreducer,
    ProductDetailsreducer,
    ProductDeleteReducer,
    ProductCreateReducer,
    ProductUpdateReducer,
    ProductReviewCreateReducer,
    ProductTopRatedReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from "./reducers/userReducer";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from "./reducers/orderReducer";

const rootreducer = combineReducers({
    productList: ProductListreducer,
    productDetails: ProductDetailsreducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: ProductDeleteReducer,
    productCreate: ProductCreateReducer,
    productUpdate: ProductUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    ProductReviewCreate: ProductReviewCreateReducer,
    productTopRated: ProductTopRatedReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
        paymentMethod: paymentMethodFromLocalStorage,
    },
    userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
    rootreducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// "proxy": "http://127.0.0.1:5000",
