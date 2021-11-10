const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
const fileSystem = require('fs');

/* 
  * I defined a GET route that returns all repositories or specific repositories as per the client's query.
  * I utilized the fs readFile method to get the json data found in the file projectsData.json
  * I then converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * The top level if condition is executed when the client wants a specific repository. Hence the repository with the id is looked for with the find array method applied on the dataArr containing all repositories, the result is then stored on the repository variable.
  * The second nested if condition is used for validation purposes. This only occurs only if a repository with that id is not found. 
  Example test URLS: 
  1. http://localhost:8080/api
  2. http://localhost:8080/api?id=2 */
app.get('/api', (req, res) => {
  fileSystem.readFile('projectsData.json', (err, data) => {
    if(err) throw err;
    let dataArr = JSON.parse(data);
    if(req.query.id){
      const repository = dataArr.find(repository => repository.id === parseInt(req.query.id));
      if(!repository){
        return res.status(404).send("That repository doesn't exist");
      }
      // This LOC returns the repository with that id.
      return res.send(repository);
    }
    // This LOC returns all the repositories
    return res.json(dataArr);
  })
});

/* 
  * I defined a POST route that enables creation of a new repository by the client.
  * I created a variable dataArr that will be used to later store the data from the JSON file.
  * I utilized the fs readFile method to get the json data found in the file projectsData.json
  * I converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * I destructured the keys in the request body and stored them in the respective variables.
  * I used an if condition that returns an error if any field of a repository is not passed by the client when creating the repository.
  * If the repository has required fields the repository is added to the dataArr using push.
  * I then utilized the writeFile method to set new values to the projectsData.json file using the dataArr variable. I first converted the dataArr variable to a JSON object with JSON.stringify. The null and number 2 value after passing the data variable are used to make data written to projectsData.json readable.
  * A success message is returned after the repository has been added to the data array.
  * Example test URL: http://localhost:3000/api/repositories/new
      In the body of the request set this as the JSON content:
        {
          "name": "lorem",
          "description": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
          "url": "https://github.com/kimanicharles911/emmethub_projects_rest_api",
          "website_url": "N/A",
          "topics": ["express", "rest-api"],
          "branches":["master"],
          "commits": 1,
          "has_license": true,
          "has_readme": true
        }
*/
app.post('/api/repositories/new', (req, res) => {
  let dataArr;
  fileSystem.readFile('projectsData.json', (err, data) => {
    if(err) throw err;
    dataArr = JSON.parse(data);

    const {name, description, url, website_url, topics, branches, commits, has_license, has_readme} = req.body;
    if(!name || !description || !url || !website_url || !topics || !branches || !commits || !has_license || !has_readme){
      return res.status(400).send('All fields i.e name, description, url, website_url, topics, branches, commits, has_license, has_readme are required.')
    }
    dataArr.push({
      id: dataArr.length + 1,
      name,
      description,
      url,
      website_url,
      topics,
      branches,
      commits,
      has_license,
      has_readme
    });

    fileSystem.writeFile('projectsData.json', JSON.stringify(dataArr, null, 2), (err) => {
      if(err) throw err;
      return res.status(201).send('New repository has been added to the list.')
    })
  });
});

/* 
  * I defined the PUT method that updates a specific repository.
  * I utilized the fs readFile method to get the json data found in the file projectsData.json
  * I then converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * The repository with the id is looked for with the find array method applied on the dataArr containing all repositories, the repository is then stored on the repository variable.
  * We then access the name and repository keys and store the name and repository in the request body in this keys.
  * I then utilized the writeFile method to set changed values to the projectsData.json file using the dataArr variable. I first converted the dataArr variable to a JSON object with JSON.stringify. The null and number 2 value after passing the dataArr variable are used to make data written to projectsData.json readable.
  * I then return a success message.
  * Example test URL: http://localhost:8080/api/repository?id=2
      In the body of the request set this as the JSON content:
        {
          "name": "hangman",
          "description": "The repository for the Hangman game API."
        }
*/
app.put('/api/repository', (req, res) => {
  fileSystem.readFile('projectsData.json', (err, data) => {
    if(err) throw err;
    let dataArr = JSON.parse(data);
    if(req.query.id){
      const repository = dataArr.find(repository => repository.id === parseInt(req.query.id));
      repository.name = req.body.name;
      repository.description = req.body.description;
      fileSystem.writeFile('projectsData.json', JSON.stringify(dataArr, null, 2), (err) => {
        if(err) throw err;
        return res.send(`Repository ${repository.id} updated`)
      });
    }
  });
});

/* 
  * I defined the DELETE method that deletes a specific repository blog.
  * I utilized the fs readFile method to get the json data found in the file projectsData.json
  * I then converted the data from the JSON file to normal JS objects and stored it in the variable dataArr since the objects are in an array.
  * The repository with the id is looked for with the find array method applied on the dataArr containing all repositories, the repository is then stored on the repository variable.
  * If a repository with that id exists I use the splice array method to delete from the dataArr the object in the index similar to that of the repository variable.
  * I then utilized the writeFile method to set the remaining values to the projectsData.json file using the dataArr variable. I first converted the dataArr variable to a JSON object with JSON.stringify. The null and number 2 value after passing the data variable are used to make data written to projectsData.json readable.
  * I then return a success message.
  * If a repository with that id doesn't exist a fail message is returned.
  * Example test URL: http://localhost:8080/api/repository?id=2
*/
app.delete('/api/repository', (req, res) => {
  fileSystem.readFile('projectsData.json', (err, data) => {
    if(err) throw err;
    let dataArr = JSON.parse(data);
    const repository = dataArr.find(repository => repository.id === parseInt(req.query.id));
    if(repository){
      dataArr.splice(dataArr.indexOf(repository), 1);
      fileSystem.writeFile('projectsData.json', JSON.stringify(dataArr, null, 2), (err) => {
        if(err) throw err;
        return res.send(`Repository ${repository.id} deleted.`)
      });
    }else{
      return res.send(`No repository with that id ${req.query.id} exists.`);
    }
  });
});

app.get('*', (req, res) => {
  res.status(404).send('Sorry! Can’t find that resource. Please check your URL.')
});

app.listen(port, () => {
  console.log(`App server listening at https://localhost:${port}`)
});

/* 
  * I first imported the express module.
  * I then stored the called express function in a variable app.
  * I stored the port number from the environment variable or port 8080 in a variable called port.
  * I executed the .json() middleware function on the express app function to enable sending of data in JSON format.
  * I imported the fileSystem module to enable me write to files.
  * From the app object with the express function I used the listen method and set the port.
  * I then added a get request that returns a fail message for any request to an undefined route.
*/