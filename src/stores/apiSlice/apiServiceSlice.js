import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { addToast } from "../slices/toastSlice";
import { resetAuthorization, selectAuthState } from "../slices/authSlice";
import { localStore } from "../localStore";
import { TOAST_CONFIG } from "@/helpers/constants/commonContants";
import { appConstants } from "@/helpers/constants/appConfig";

const apiServiceSlice = {};

apiServiceSlice.baseQuery = fetchBaseQuery({
  baseUrl: appConstants.apiBaseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const user = selectAuthState(state);
    const token = user?.accessToken || null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

apiServiceSlice.baseQueryWithInterceptor = async (args, api, extraOptions) => {
  try {
    const result = await apiServiceSlice.baseQuery(args, api, extraOptions);

    if (result.error) {
      const { status, data } = result.error;
      let toastMessage = "Oops, Something went wrong. Please try again later.";

      // Handle Unauthorized (401) - Logout User & Reset Token
      if (status === 401) {
        localStore.resetToken();
        api.dispatch(resetAuthorization());

        api.dispatch(
          addToast({
            title: TOAST_CONFIG.error.title,
            description:
              data?.message || "Session expired. Please log in again.",
            variant: TOAST_CONFIG.error.variant,
          })
        );
      }

      // Handle Server Downtime / Backend Issues (5xx)
      else if ([500, 502, 503, 504].includes(status)) {
        toastMessage =
          "Server is currently unavailable. Please try again later.";
      }

      // Handle API-Specific Error Messages
      else if (data?.message) {
        toastMessage = data.message;
      }

      // Prevent Duplicate Toasts (Server Down Errors)
      if (!api.getState().toast?.messages?.includes(toastMessage)) {
        api.dispatch(
          addToast({
            title: TOAST_CONFIG.error.title,
            description: toastMessage,
            variant: TOAST_CONFIG.error.variant,
          })
        );
      }
    }

    // Show Success Toast for Write Operations
    if (
      result.data?.message &&
      ["POST", "PATCH", "PUT", "DELETE"].includes(result?.meta?.request?.method)
    ) {
      api.dispatch(
        addToast({
          title: TOAST_CONFIG.success.title,
          description:
            result.data?.message || "Operation completed successfully.",
          variant: TOAST_CONFIG.success.variant,
        })
      );
    }

    return result;
  } catch (error) {
    console.error("Network Request Failed:", error);
    api.dispatch(
      addToast({
        title: TOAST_CONFIG.error.title,
        description: "Something went wrong. Please try again later.",
        variant: TOAST_CONFIG.error.variant,
      })
    );

    return {
      error: { status: "FETCH_ERROR", message: "Network request failed" },
    };
  }
};

apiServiceSlice.baseQueryWithRetry = retry(
  apiServiceSlice.baseQueryWithInterceptor,
  { maxRetries: 3 }
);

export { apiServiceSlice };
