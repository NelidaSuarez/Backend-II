/* 
{
    "status": "success",
    "product": {
        "title": "CocaCola",
        "description": "Para el Fernet",
        "price": 3300,
        "thumbnail": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1CQxRwW1gZ25HA9K5OvxIQ5L6u_d-NM1vig&s"
        ],
        "code": "1d",
        "stock": 15,
        "category": "Bebida sin alcohol",
        "status": true,
        "_id": "66cf778a1d58676ff3520b26",
        "__v": 0
    }
}

*/

export const respProductDto = (product) => {
    return {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock, 
    };
};