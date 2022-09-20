## General information

Sportsee is an application for monitoring your physical activity. 12th project of the OpenClassrooms "Web app developer - JavaScript React" course. For this project I'm using React, D3.js and Recharts and is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Useful links:**
- [Live demo 🌍](https://jyjystudio.github.io/SportSee-P12) 
- [Repository 📖](https://github.com/JyjyStudio/SportSee-P12)
- [Documentation 📑](https://jyjystudio.github.io/jsdoc-p12/)
- [Figma mock-up 🖼️](https://www.figma.com/file/BMomGVZqLZb811mDMShpLu/UI-design-Sportify-FR?node-id=1%3A2)


## Installation

**Prerequisites**

- NodeJS version 12.18
- Yarn version 1.22.19 or npm version 8.15.0

**Launching the project**

1 - Fork the repository

2 - Clone it on your computer

2 - Install the dependencies with `npm install` or `yarn install`

3.1 - From home directory, open the terminal and run: `cd front/` then run `npm start` or `yarn start` (starts the app), App should start on port 3000.

3.2 - for using api data: 
    1 - From home directory, open a terminal and run: `cd back`
    2 - Open the server with `npm run dev` or `yarn dev`, backend should be runnning on port 3000
    3 - Go to "front/pages/Stats.jsx" and verify that "use_mocked_data" variable line 26 is on false (pass it to true if you want to use mocked data)
    4 - From home directory, open a new terminal and run: `cd front/` then run `npm start` or `yarn start` (starts the app), App should start on port 3001.



## Other Scripts

In the project directory, you can also run:

### `npm run jsdoc`

Builds the documentation to the `jsdoc` folder.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
