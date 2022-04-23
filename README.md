## Project Name & Pitch
Team11-CM-FrontEnd

This is a software project of subject COMP90082 at The University of Melbourne. The repository aims to design a single front-end and do data visualization from the back-end. This project was bootstrapped with Create React App and built with Kendo framework. This the master branch of our project.


## Project Status

This project is currently in development.

1. Provide an initial design of the layout
2. Connect and retrieve data from the backend
3. User can choose to connect the Garmin watch to the dashboard through Garmin Connect. (complete the first element of the user story)


## Package introduction

- /src/data/models.tsx: provide data interface and initialize all the data
- /src/layout/DrawerRouterContainer.tsx: design a dashboard banner(including user avatar, router info, etc)
- /src/layout/Loading.tsx: design the animation of loading the data
- /src/panels/*: design functions to parse the data
- /src/services/dataServices.ts: interact with backend
- /src/styles/*: css design
- /src/App.tsx & /src/index.tsx: define display logics
- /src/Dashboard.tsx: Dashboard page implementation
- /src/Home.tsx: Home page implementation
- /src/Login.js: Login page implementation
- /src/Register.js: Register page implementation
- /src/Activity.js: Single Activity page implementation
- /src/react-app-env.d.ts: environment settings


## Installation and Setup Instructions

Clone down this repository. You will need some node modules installed globally on your machine.

`git clone https://github.com/agogear/Cm-frontend.git`

Installation of the node dependencies:

`cd Cm-frontend` <br>
`yarn`

To run:

`yarn start`

