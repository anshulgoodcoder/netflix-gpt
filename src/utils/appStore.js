import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../utils/userSlice";

export const appStore = configureStore(
    {
        reducer : {
            user:UserReducer,
        },
    }
)