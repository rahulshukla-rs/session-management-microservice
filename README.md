# session-management-microservice
Basic Session Management Micro Services.

##  Requirement 
- Node: 14.X 
- NPM: 6.X
- MongoDB: 4.X

## Souce Code (Github)

https://github.com/rahulshukla-rs/session-management-microservice

## Local Setup Steps

https://github.com/rahulshukla-rs/session-management-microservice/blob/master/README.md


## API Document

https://documenter.getpostman.com/view/7448136/TVt2d41w

## Postman Collection

https://github.com/rahulshukla-rs/session-management-microservice/blob/master/session-management.postman_collection.json

## Setup
Clone this repository:

git clone https://github.com/rahulshukla-rs/session-management-microservice

## Navigate to the project Folder:

cd session-management-microservice

## Install dependencies:

npm install

## Run App:

Note: MongoDB Running on local before start
(If mongo on diffrent host & port, Please change in config/server.js)

npm start

++++++++++++++

## Folder Structure:

Inside the MainApp directory, I have created the following four subdirectories

- app.js
- config
  - server.js
  - session.js
- api
  - controllers
  - models
  - routes
  - middleware
- package.json
- .gitignore
- node_modules