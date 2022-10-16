# Airdnd

## About Airdnd

Airdnd is a full-stack application clone of Airbnb deployed on Heroku. The app uses React and Redux on the front-end and Express and Sequelize on the back-end.

Live site: https://airdnd.herokuapp.com/

## Site Information
- [Api Documentation](https://github.com/matt-fong/Airbnb-Project/wiki/API-Routes-Documentation)
- [App Features](https://github.com/matt-fong/Airbnb-Project/wiki/App-Features)
- [DB Schema](https://github.com/matt-fong/Airbnb-Project/wiki/Database-Schema-Design)
- [Redux State Shape](https://github.com/matt-fong/Airbnb-Project/wiki/Redux-State-Shape)

## Technologies Used

### This app was built with:

* Javascript
* React
* Redux
* HTML
* CSS
* Express
* Sequelize
* PostgresSQL

## Features

Home Page

![splashpage](https://user-images.githubusercontent.com/103220965/196019470-fa815c36-5bcd-4cd1-8156-1d91e275e865.PNG)

Spot Detail Page

![spot detail](https://user-images.githubusercontent.com/103220965/196019473-605bd5c3-f385-4307-927f-136369b7aae2.PNG)

## Locally
If you would like to launch the site locally please do the following:

1. Clone this repo using a terminal by going to a directory where you would like to download and typing `git clone git@github.com:matt-fong/Airbnb-Project.git`.
* Alternatively, you may download the zip file and extract it to a folder on your computer.

2. Go into the 'backend' directory and in the terminal type `npm install`.

3. Create a .env in your 'backend' directory and add your own values to these variables: PORT, DB_FILE (location of the database), JWT_SECRET, and JWT_EXPIRES_IN

4. Still in your 'backend' directory, load the migrations database using `npx dotenv sequelize db:migrate`.

5. Still in you 'backend' directory, load the seed data into your database using `npx dotenv sequelize db:seed:all`.

6. Type `npm start` to start your backend.

7. Open up a second terminal, go into the 'frontend' directory and in the terminal type `npm install`.  

8. Type `npm start` to start your frontend. If you have Google Chrome, this should automatically launch the browser and direct you to `localhost:3000`.  If it did not launch automatically, manually open up a browser and go to `localhost:3000`.

9. Congrats, you have launched the app.
