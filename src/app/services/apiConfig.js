import axios from "axios";
import { navigateToNearestOpenRoute } from "utils/helpers";
import { storage } from "./storage";

const NO_AUTH_HEADER_ROUTES = ["/auth/sso-token-generation"];

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers = {} }) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    ...(!NO_AUTH_HEADER_ROUTES?.includes(url) &&
                    storage.fetch.authToken()?.length > 0
                        ? {
                              Authorization: `Bearer ${storage.fetch.authToken()}`,
                          }
                        : {}),
                    ...headers,
                },
            });
            return {
                data: {
                    data: result.data,
                    status: result.status,
                    statusText: result.statusText,
                },
            };
        } catch (axiosError) {
            console.log("axiosError", axiosError);
            const err = axiosError;
            if (err?.response?.status === 401) {
                // logout user
                navigateToNearestOpenRoute();
            }
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

// sanitise video response
