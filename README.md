# OgieBank

CS554 Final Project 22F

## Team Members
* Jordan Wang - 10452069
* Johnny Wong - 10446964
* Maxwell Metzner - 10447997
* Eric Stazzone - 10445230
* Sophia Zuo - 10448401


## Project Description
There are over 48 million people that are student debt borrowers with an average of $28,400 in federal and private debt. It can be difficult keeping up with spreadsheets of information, so instead we want to create an easy space for budget organization and financial planning (especially for paying off debt). 

Users will be able to track their spending, get an overview of their budget and savings status, as well as view and sort their statements. Users will be able to easily and efficiently enter in information as well as export their information. We’ll be able to generate charts and infographics that display their various spending habits by category or amount. We’ll also provide paginated result pages, provide saving recommendations, and overall debt breakdown so users can see how far along they are in paying off loans or towards a savings goal. 

## Technologies Used
Node.js, Express, React, Redux, Firebase Authentication, Firebase Firestore, Heroku, Docker

## How to Setup

1. Make sure you're in the root folder of the project
2. Run `npm run install-all` to install all dependencies for the server and client
3. Run `npm run seed` to seed the Firebase Firestore

## Pre-made Accounts with Seed
1. Username: **INSERT USERNAME HERE**, Password: **INSERT PASSWORD HERE**
1. Username: **INSERT USERNAME HERE**, Password: **INSERT PASSWORD HERE**

## How to Start Project Locally

1. Run `npm run dev` to run the server and client concurrently
2. The local app will be on `localhost:3000`
3. All API calls will be made to the server on `localhost:8080/api`

## Docker setup

1. Download Docker desktop from `https://www.docker.com/products/docker-desktop/`
2. Run `docker compose up`
3. To stop the containers, run docker-compose stop or press Ctrl-C to stop a docker-compose process running in the foreground then run docker-compose stop to ensure the project containers have stopped.