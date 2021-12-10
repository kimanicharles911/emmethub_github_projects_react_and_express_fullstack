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