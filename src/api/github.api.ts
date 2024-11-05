import axios from "axios";

const API_URL = `https://api.github.com/repos/facebook/react`;

export const githubApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        //TODO! Add GitHub apiKey
    },
});
