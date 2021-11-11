## API Takehome Challenge - Shipping 

### Context
In many businesses, the final step of a process is delivery of goods.
A generic flow might be the following:

Orders can have multiple items, but items may not all be ready at the same time.
Therefore, when creating shipments, only goods that are ready to be shipped should be packed.

It is good practice to first create a package and try to get as many items into it before a shipping deadline as possible.
A package should be shipped off before its due date with as many complete items as possible to reduce the number of overdue deliveries.

### Assignment
You are to create an API to handle a robust packing & shipping log with the following specifications:

- Orders
  - Each order will have a human readable customerId which is unique alphabetical code (e.g. Customer 'Astro Botic Commercial' will have id ABC)
  - Orders consist of batches. Each batch will have: a part (String) and quantity (Number)
- Packages
  - A package consists of the following:
    - An identifying string (recommended: `<customer id>-PS<package #>`; e.g. ABC-PS1. You can use the method model.count provided by mongoose)
    - Contents of the package (batches & quantities; not necessarily full batch qty)
  - You should be able to create, edit the contents, delete (contents or whole), or view packages from completed items (readyToShip === true)
- Shipments
  - A shipment consiste of the following:
    - An identifying string (recommended: `<customer id>-SH<shipment #>`; e.g. ABC-SH1)
    - Contents of the shipment (packages that have already been created)
  - You should be able to create, edit, delete, or view shipments from packages created

Shipments can be edited any time but once shipped, packages cannot be edited anymore.

The following endpoint(s) have been completed for you:
- `/reset` Create a randomzied list of orders & items, some of which will be completed (i.e. ready to be packed and shipped). Run this at the start of a trial.

Fork this repo and clone it to your environment to fill out the missing logic.

A brief description of all required endpoints is written out in the Postman collection included in this repo. (Import postman_endpoints.json to your Postman environment)

### Required env vars
`DB_URI` your mongoDB connection string. E.g. mongodb://localhost:27017/cp-shipping-task


### Questions
If you have any questions, including if you believe there's a mistake somewhere, contact jose@conturoprototyping.com