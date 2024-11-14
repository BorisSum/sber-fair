import axios from "axios";

const host = 'http://localhost:8081/api/v1';
// const host = `${window.location.protocol}//${window.location.hostname}/api/v1`;

export const httpClient = axios.create({
    baseURL: host
})