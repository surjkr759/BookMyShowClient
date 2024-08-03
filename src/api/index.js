import axios from "axios";

export const apiV1Instance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    responseType: "json",
    // headers: {
    //     Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined
    // }
})


apiV1Instance.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    if(token)
        request.headers.Authorization = `Bearer ${token}`

    return request
})

//anytime there is a request made, if there is a token in my localstorage, I will add it to my headers and then return the request

//My instance is ready, using this instance I can make any kind of API call to this particular server, and in production
//change this url to the original server's address

//apiV1Instance.post('/auth/signin')

//Every API call will use this instance to interact with the server, so on every call to the server.. check if there is token in localstorage
//If yes, take token alongwith you