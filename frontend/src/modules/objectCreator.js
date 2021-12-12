exports.moduleFunc = (receivedObject) => {
  const newObject = {
    "id": receivedObject.repoId,
    "name": receivedObject.repoName,
    "description": receivedObject.repoDescription,
    "url": receivedObject.repoUrl,
    "website_url": receivedObject.repoWebsiteUrl,
    "topics": receivedObject.repoTopics,
    "branches": receivedObject.repoBranches,
    "commits": receivedObject.repoCommits,
    "has_license": receivedObject.repoHasLicense,
    "has_readme": receivedObject.repoHasReadme
  };
  
  return newObject;
};
/* 
  * I created a module function that creates an object with similar keys to those of the API to store the respective values which are taken by axios that updates the API with the new project details.
  * It returns the object.
*/