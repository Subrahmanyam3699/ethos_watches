# Ethos Watches

## Description
This is a simple website, It fetches data (watches etc.) from server and shows content on screen

## Setup
- First of all from root dir do `cd server` and `npm install`
- And then `npm run config` (this will setup local database)
- Now start the server by `npm run start`
- Once server has started you can manually open `index.html`

## Libraries used
Mostly plain Javascript is used
Bootstrap is used for UI
Axios is used for sending requests to Express server

## What can be improved
SQL Injection prevention
Even better UI
Secure Authentication

## Pages
Thre are three pages in total;
### Home
Home page displays cards, with images, title and description of each watch.
All this data is fetched from server which in turn fetches from MySQL database
### Contact Us
A simple contact us page
### Log In
Login system also works using server and database
### Sign Up
Sign Up page is similar to Login page, Adds new user to database

## Screenshot
![alt text](https://i.snipboard.io/Iw5Tg8.jpg)