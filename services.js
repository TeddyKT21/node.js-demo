import axios from "axios";



export async function addProduct(user) {
    const url = 'https://dummyjson.com/products';
    const products = await (await axios.get(url)).data.products
    console.log(products[0]);
    const index = Math.floor(Math.random(0, 30));
    const product = products[index];
    user.product = product;
    return user;
}

export async function sendUser(user) {
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url, {
        method: "POST",
        body: JSON.stringify(user)
    }).then(res => console.log(res))
        .catch(err => console.log(err));
}