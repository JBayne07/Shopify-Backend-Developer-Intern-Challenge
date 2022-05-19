## Goal<br>
The goal of this challenge was to create an inventory tracking web application. I built a backend to allow a user to add products to the inventory, update the current
stock of a specific product, delete a specific product, and view the name, manufacturer and current stock of a specific product. The web application also allows a user
to create a shipment, assigning products to the shipment, whilst also removing products from the inventory. The web applications also allows a user to delete a shipment
and to view the products in the shipment.

## Documentation<br><br>
###### (GET) /api/products/:id
  - (200) A JSON Object returning the product object
  - (400) Invalid id
  - (404) Product does not exist in the database
  - (500) Internal Server Error<br><br>
###### (GET) /api/products<br>
  - (200) An array of JSON Object returning all the product objects
  - (404) No products in the database
  - (500) Internal Server Error<br><br>
###### (POST) /api/products<br>
  - (201) A JSON Object returning the successful creation of the product object
  - (400) Product name or manufacturer name is empty
  - (409) Product already exists
  - (500) Internal Server Error<br><br>
###### (PATCH) /api/products/:id<br>
  - (200) A JSON Object returning the product object
  - (400) Invalid id
  - (404) Product does not exist in the database
  - (500) Internal Server Error<br><br>
###### (DELETE) /api/products/:id<br>
  - (200) A JSON Object returning the successful deletion of the product object
  - (400) Invalid id
  - (404) Product does not exist in the database
  - (500) Internal Server Error<br><br>
###### (GET) /api/shipments<br>
  - (200) A JSON Object returning the shipment object
  - (400) Invalid id
  - (404) Shipment does not exist in database
  - (500) Internal Server Error<br><br>
###### (POST) /api/shipments<br>
  - (201) A JSON Object returning the successful creation of the shipment object
  - (400) Shipment name is empty
  - (409) Shipment already exists
  - (500) Internal Server Error<br><br>
###### (PATCH) /api/shipments/:id<br>
  - (200) A JSON Object returning the shipment object
  - (400) Invalid shipment id or invalid product id
  - (404) Shipment does not exist in the database or product is not available
  - (500) Internal Server Error<br><br>
###### (DELETE) /api/shipments/:id<br>
  - (200) A JSON Object returning the shipment object
  - (400) Invalid id
  - (404) Shipment does not exist in the database
  - (500) Internal Server Error
