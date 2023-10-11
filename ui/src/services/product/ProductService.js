export const getProducts = (category) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(`http://localhost:3001/product?category=${category}`)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    resolve(json)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        } catch (err) {
            reject(err);
        }
    });
};