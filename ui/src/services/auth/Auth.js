import axios from 'axios';

export const setTokens= (tokens) => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
};

export const getTokens= () => {
    return {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken")
    };
};

export const postLogin = (creds) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`http://localhost:3001/login`, creds)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        } catch (err) {
            reject(err);
        }
    });
};

export const postSignin = (creds) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`http://localhost:3001/user`, creds)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        } catch (err) {
            reject(err);
        }
    });
};