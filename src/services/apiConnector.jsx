import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    // Console logs to debug the request details
    console.log("API Method:", method);
    console.log("API URL:", url);
    console.log("Body Data:", bodyData);
    console.log("Headers:", headers);
    console.log("Params:", params);

    return axiosInstance({
        method: method,          // Simplified
        url: url,                // No need to use template strings here
        data: bodyData || null,  // Simplified ternary operator
        headers: headers || {},  // Default to an empty object
        params: params || null,  // Simplified ternary operator
    });
};
