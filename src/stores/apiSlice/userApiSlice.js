import { createApi } from "@reduxjs/toolkit/query/react";
import { apiServiceSlice } from "./apiServiceSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: apiServiceSlice.baseQueryWithInterceptor,
  tagTypes: ["USER"],
  endpoints: (qb) => ({
    signup: qb.mutation({
      query: ({ username, email, password }) => ({
        url: "/signup",
        method: "POST",
        body: { username, email, password },
      }),
      invalidatesTags: ["USER"],
    }),
    login: qb.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: qb.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: `/change-password`,
        method: "PUT",
        body: { oldPassword, newPassword, confirmPassword },
      }),
    }),
    forgotPassword: qb.mutation({
      query: ({ email }) => ({
        url: `/forget-password`,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: qb.mutation({
      query: ({ token, password, confirmPassword }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { password, confirmPassword },
      }),
    }),
  }),
});

export const userApiReducer = userApi.reducer;

export const userApiAction = {
  middleware: userApi.middleware,
  reducerPath: userApi.reducerPath,
  signup: userApi.useSignupMutation,
  login: userApi.useLoginMutation,
  changePassword: userApi.useChangePasswordMutation,
  forgotPassword: userApi.useForgotPasswordMutation,
  resetPassword: userApi.useResetPasswordMutation,
};
