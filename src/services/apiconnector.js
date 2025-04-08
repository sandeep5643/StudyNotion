import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`, // Request ka type (GET, POST, etc.)
        url:`${url}`, // API endpoint
        data: bodyData ? bodyData : null, //  Body me { email, password } send ho raha hai
        headers: headers ? headers: null, // Header me Authorization token ja raha hai
        params: params ? params : null,
    });
}


// Ye code ek custom API connector bana raha hai jo axios ka use karke HTTP requests send karega.


// Har API Call Ke Liye Same Code Nahi Likhnna Padega
// Axios Configuration Centralized Ho Gaya
//  Error Handling Implement Karna Easy Ho Gaya