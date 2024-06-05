# Vivipost Backend Interview

## Installation

1. Clone repository

2. install packages

```bash
npm i
```

3. in file .env change PORT.

```bash
 defautl: 8081
```

4. valide credentials in headers

```bash
 token: "VivipostInterview"
```

5. start the server locally with.

```bash
  npm run dev
```

6. test the endpoint with postman json file.

```bash
 viviPostInterview.postman_collection
```

## Ojective

Make it so the backend endpoint _/orders_ return the orders data with the following structure.

```json
    [
        {
            "id_order":1,
            "id_user":3,
            "tracking_number":"551354861575",
            "registration_date":"2024-09-03T18:05:00.000Z",
            /* HATA QUI DE TBL ORDER */
            "name":"Ronald E. Hernandez",
            "email":"RonaldEHernandez@rhyta.com",
            /* hasta aqui tbl user */
            "products": [/* TBL PRODUCTS */
                {
                    "id_product":3,
                    "name":"Luxurious Concrete Salad",
                    "price":"79.99",
                    "weight":800,
                    "height":35,
                    "length":23,
                    "width":28,
                    "registration_date":"2024-02-01T06:00:00.000Z",
                    /* desde aqui de tbl_order_product */
                    "id_order_product":1,
                    "id_order":1,
                    "quantity":1
                },
                ... other products
            ]
        },
        ... other orders
    ]
```

## Instructions

1. Prepare the development environment with the previous Installation instructions.

2. Connect to the MySQL database with the credentials available in the _/resources/.env_ file.

3. Follow the DB Diagram available in the _/resources/DB_Diagram.png_ file to get the necessary information to accomplish the objective.

## Bonus

1. Ensure a clear separation of concerns among business logic, model and controller layers.

2. Implement authorization using the 'token' header with the key 'VivipostInterview'.

3. Implement an algorithm to modify the price based on the following conditions:

- If the product weights less than 0.3kg the product is free.
- For each whole 100g increment the price by $0.5.
- Add an extra cost to the initial pricing based on the Tier of the product.

```bash
The products are spearated in different Tiers based on their volume.
  - Tier 1: 0cm^3 - 5,000cm^3
  - Tier 2: 5,001cm^3 - 10,000cm^3
  - Tier 3: 10,001cm^3 - 15,000cm^3
  ... and so on
The base extra cost for Tier 1 is $0.1 and each subsequent Tier multiply the cost
from the previous Tier by a factor of 1.2.
Ex. Tier 1: $0.1, Tier 2: $0.12, Tier 3: $0.144...
```

_IMPORTANT: The database weights are expressed in grams (g) and the dimensions in centimeters (cm)._
