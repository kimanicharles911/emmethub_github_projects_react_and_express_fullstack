
<h1 align="center"><a href="https://emmethubgithubprojectsmern.herokuapp.com" target="_blank">🌐 emmethub github projects react and express fullstack</a></h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/kimanicharles911/emmethub_nodejs_modules/blob/master/LICENSE.txt" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> This is the repository of a fullstack web application. It enables Emmethub to view, create, edit and delete data and projects of it's github repositories. This is achieved using a Reactjs frontend, a Nodejs/Expressjs backend REST-API and JSON file database. It has been created using Reactjs, Expressjs, bootstrap and the axios http client. The REST-API manages how data on projects by Emmethub is changed. The comments the file app.js allow easy understanding of how it functions.

## Deployed at
* https://emmethubgithubprojectsmern.herokuapp.com

***
## Frontend

* It is located in the folder called frontend in this repository.

#### Setup/Installation Requirements
##### Install Dependencies

```
npm install
```

##### Run React Development Server

```
npm run start
```

##### To Build for Production

```
Nothing is done inside the frontend folder all building configuration is done in the backend.
```

## How It Was Built
##### Create React App
```
npx create-react-app
npm i --save bootstrap
npm i --save react-bootstrap
npm i --save react-router-bootstrap
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save font-awesome
npm i --save axios
npm i --save helmet
```
##### Dependencies
* Bootstrap
* React Bootstrap
* fortawesome
* font-awesome
* axios

##### src folder structure
```
src/
  Components/
    modals/
      CreateModalComponent.css
      CreateModalComponent.jsx
      DeleteModalComponent.jsx
      EditModalComponent.css
      EditModalComponent.jsx
      ViewModalComponent.css
      ViewModalComponent.jsx
    MainComponent.css 
    MainComponent.jsx
    NavbarComponent.css
    NavbarComponent.jsx
    index.js
  images/
    index.js
    nav-icon.svg
  App.css
  App.js
  App.test.js
  index.css
  logo.svg
  reportWebVitals.js
  setupTests.js
```

***
## Backend

* It is located in the root of this repository.
#### Deployed at
* https://emmethubgithubprojectsmern.herokuapp.com/api

#### API Usage
| HTTP method      |   EndPoint   |   Public Access   |   Example   |
| ---- |:---- |:---- |:---- |
| GET     | /api/    |  TRUE    |  https://emmethubgithubprojectsmern.herokuapp.com/api/    |
| GET     | /api?id=2    |  TRUE    |  https://emmethubgithubprojectsmern.herokuapp.com/api?id=2    |
| POST     | /api/repositories/new/    |  TRUE    |  https://emmethubgithubprojectsmern.herokuapp.com/api/repositories/new/    |
| PUT     | /api/repository?id=2    |  TRUE    |  https://emmethubgithubprojectsmern.herokuapp.com/api/repository?id=2    |
| DELETE     | /api/repository?id=2    |  TRUE    |  https://emmethubgithubprojectsmern.herokuapp.com/api/repository?id=2    |

#### Setup/Installation Requirements

##### Install Dependencies

```sh
sudo apt install nodejs #(for linux platform)
npm i
```

* Add the below line in your package.json file as one of the scripts value:
```sh
"dev": "nodemon app.js"
```

##### Development Usage

```sh
npm run dev
```

##### Test Helmet protection
* The result of running the below command should be different. Refer to [this video](https://youtu.be/tGMPWVl_l9Y) for more details.
* Replace the port with the one you use.
```sh
curl http://localhost:8080 --include
```

## No Data/JSON returned ?
> If while using the GET endpoint no JSON data is returned it means that someone used the DELETE endpoint to delete all the data provided by this API. Hence you can:
1.Clone this repo and run it locally, that way it will work well with all the original data.
2.or use the projectsData.json file in this repo together with the PUT method to add data to the hosted api. 

## How It Was Built
##### Node
```sh
npm init
npm i express
npm i nodemon --save-dev
npm i --save path
```

##### Dependencies
* Node
* Express
* Nodemon
* Path

##### Deploy to Heroku
* Add this in package.json
```sh
"engines": {
  "node": "14.15.1",
  "npm": "8.1.1"
}
```
* Add the below LOC to the app.js file
```sh
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
```

* Then run the following terminal commands:
```sh
install heroku
heroku login
touch Procfile
```

* Add this line in the Procfile which will depend with the name of your server file which in my case is app.js:
```sh
web: node app.js
```

* Then run the following terminal commands:
```sh
heroku create emmethubgithubprojectsmern
heroku login
touch Procfile
git add . 
git commit -m"first deploy to heroku"
## optional for pushing to github: git push -u origin master
git push heroku master
```

### folder structure
```
app.js 
package-lock.json      
projectsData.json
LICENSE.txt  
package.json  
permaProjectData.json  
README.md
```

## License and Copyright Information.

This project is MIT licensed see [my MIT LICENSE](https://github.com/kimanicharles911/emmethub_github_projects_react_and_express_fullstack/blob/master/LICENSE.txt) for details.<br />
Copyright © 2021 [Charles Kimani & Emmethub](https://github.com/kimanicharles911).

### Author

###### 👤 **Charles Kimani**

* Website: https://emmethub.com/founder
* Github: [@kimanicharles911](https://github.com/kimanicharles911)
* LinkedIn: [@kimanicharles](https://linkedin.com/in/kimanicharles)

#### Show your support

Give a ⭐️ if this project helped you!

***