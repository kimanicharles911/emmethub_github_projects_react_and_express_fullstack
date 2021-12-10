import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import axios from 'axios';
import './CreateModalComponent.css';
import axiosResponseMessage from '../../modules/axiosResponseMessage.js';
import axiosErrorMessage from '../../modules/axiosErrorMessage.js';

/* 
  * I first imported the faTimesCircle from the font-awesome library
  * I imported the FontAwesomeIcon library from the font-awesome library
  * I then imported the useState hook from react.
  * I imported the axios promise based http client.
  * I then imported the styling
*/

const CreateModalComponent = ({renderAgentProp, setRenderAgentProp}) => {

  const [field, setField] = useState({
    repoName: '',
    repoDescription: '',
    repoUrl: '',
    repoWebsiteUrl: '',
    repoTopics: [],
    repoBranches: [],
    repoCommits: 0,
    repoHasLicense: false,
    repoHasReadme: false,
  });
  const [newTopic, setNewTopic] = useState("");
  const [newBranch, setNewBranch] = useState("");

  const createRepoNameChangeHandler = (event) => {
    setField((prevState) => {
      return{
        ...prevState,
        repoName: event.target.value
      }
    })
  };

  const createRepoDescriptionChangeHandler = (event) => {
    setField((prevState) => {
      return{
        ...prevState,
        repoDescription: event.target.value
      }
    })
  };

  const createRepoUrlChangeHandler = (event) => {
    setField((prevState) => {
      return{
        ...prevState,
        repoUrl: event.target.value
      }
    })
  };

  const createRepoWebsiteUrlChangeHandler = (event) => {
    setField((prevState) => {
      return{
        ...prevState,
        repoWebsiteUrl: event.target.value
      }
    })
  };

  const repoTopicsChangeHandler = (selectedRepoTopic) => {
    const arr = field.repoTopics.filter(repoTopic => repoTopic !== selectedRepoTopic);
    setField((prevState) => {
      return {
        ...prevState,
        repoTopics: arr
      }
    })
  };

  const addTopicChangeHandler = (event) => {
    setNewTopic(event.target.value);
  };

  const addTopicBtnHandler = () => {
    if(newTopic.match(/[A-Za-z0-9_]/)) {
      setField((prevState) => {
        return {
          ...prevState,
          repoTopics: [...field.repoTopics, newTopic]
        }
      })
      setNewTopic("");
    }
  };

  const repoBranchesChangeHandler = (selectedRepoBranch) => {
    const arr = field.repoBranches.filter(repoBranch => repoBranch !== selectedRepoBranch);
    setField((prevState) => {
      return {
        ...prevState,
        repoBranches: arr
      }
    })
  };

  const addBranchChangeHandler = (event) => {
    setNewBranch(event.target.value);
  };

  const addBranchBtnHandler = () => {
    if(newBranch.match(/[A-Za-z0-9_]/)) {
      setField((prevState) => {
        return {
          ...prevState,
          repoBranches: [...field.repoBranches, newBranch]
        }
      })
      setNewBranch("");
    }
  };

  const createRepoCommitsChangeHandler = (event) => {
    setField((prevState) => {
      return{
        ...prevState,
        repoCommits: event.target.value
      }
    })
  };

  const createRepoHasLicenseChangeHandler = () => {
    setField((prevState) => {
      return{
        ...prevState,
        repoHasLicense: !field.repoHasLicense
      }
    })
  };

  const createRepoHasReadmeChangeHandler = () => {
    setField((prevState) => {
      return{
        ...prevState,
        repoHasReadme: !field.repoHasReadme
      }
    })
  };

  const createProjectBtnHandler = () => {
    const newObject = {
      "name": field.repoName,
      "description": field.repoDescription,
      "url": field.repoUrl,
      "website_url": field.repoWebsiteUrl,
      "topics": field.repoTopics,
      "branches": field.repoBranches,
      "commits": field.repoCommits,
      "has_license": field.repoHasLicense,
      "has_readme": field.repoHasReadme
    };
    
    axios.post('/api/repositories/new', newObject)
      .then(res => {
        axiosResponseMessage.axiosResponseMessage(res);
      }).catch(err => {
        axiosErrorMessage.axiosErrorMessage(err);
      })
    
    setField({
      repoName: '',
      repoDescription: '',
      repoUrl: '',
      repoWebsiteUrl: '',
      repoTopics: [],
      repoBranches: [],
      repoCommits: 0,
      repoHasLicense: false,
      repoHasReadme: false,
    })
      
    setTimeout(() => {
      setRenderAgentProp(!renderAgentProp);
    }, 250);
  };

  /* 
    * I created the CreateModalComponent and destructured the renderAgentProp and setRenderAgentProp passed from the NavbarComponent.
    * I created a state variable called field and setField and set it's default value to an object whose keys are empty strings, empty arrays and false booleans. It is where all the data from the create project form input fields will be stored.
    * I then created a state variable called newTopic and setNewTopic and set it's default value to an empty string. It will be used to store the newest topic added by the user.
    * I then created a state variable called newBranch and setNewBranch and set it's default value to an empty string. It will be used to store the newest branch added by the user.
    * I created event handler functions for handling different kind of events. Most of this functions use setState callback functions to set the field state variable. This are:
        * The createRepoNameChangeHandler which stores the new project name in the field variable.
        * The createRepoDescriptionChangeHandler which stores the new project description in the field variable.
        * The createRepoUrlChangeHandler which stores the new project repository link in the field variable.
        * The createRepoWebsiteUrlChangeHandler which stores the new project website URL in the field variable.
        * The repoTopicsChangeHandler which removes the deleted topic from the existing array of topics in the project.
        * The addTopicChangeHandler which stores a new topic the user wants to add to the project in the newTopic state variable.
        * The addTopicBtnHandler which adds the newTopic entered by the user into the existing array of topics in the project and then stores the value of the newTopic state variable to an empty string.        
        * The repoBranchesChangeHandler which removes the deleted branch from the existing array of branches in the project.
        * The addBranchChangeHandler which stores a new branch the user wants to add to the project in the newBranch state variable.
        * The addBranchBtnHandler which adds the newBranch entered by the user into the existing array of branches in the project and then stores the value of the newBranch state variable to an empty string.        
        * The createRepoCommitsChangeHandler which stores the new project commits in the field variable.
        * The createRepoHasLicenseChangeHandler which stores the new project license availability boolean in the field variable
        * The createRepoHasReadmeChangeHandler which stores the new project read me availability boolean in the field variable
        * The createProjectBtnHandler function which has an object with similar keys to those of the API to store the respective values which are taken by axios that creates that project in the API.
    * The axios function has a try catch block that returns necessary responses in either case of a successful or failed project creation in the API.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the projects data in the whole application.
  */

  return (
    <div className="modal" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true"> 
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content shadow">
          <div className="modal-header pl-5 pr-5" id="create-modal-header">
            <p className="h4 fw-bold mb-0 container-fluid">New Project</p>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pl-5 pr-5 pt-0">
            <form>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" id="floatingCreateProjectName" value={field.repoName} onChange={createRepoNameChangeHandler} placeholder="Project Name" />
                <label htmlFor="floatingCreateProjectName">Project Name</label>
              </div>
              <div className="form-floating mb-3">
                <textarea className="form-control rounded-4" id="floatingCreateTextArea" placeholder="Description" value={field.repoDescription} onChange={createRepoDescriptionChangeHandler}></textarea>
                <label htmlFor="floatingCreateTextArea">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" id="floatingCreateRepoUrl" placeholder="Repository Link" value={field.repoUrl} onChange={createRepoUrlChangeHandler}/>
                <label htmlFor="floatingCreateRepoUrl">Repository Link</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" id="floatingCreateWebsiteUrl" placeholder="Website" value={field.repoWebsiteUrl} onChange={createRepoWebsiteUrlChangeHandler}/>
                <label htmlFor="floatingCreateWebsiteUrl">Website</label>
              </div>
              <div className="form-floating mb-3">
                <div className="card" id="card-id">
                  <div className="card-body">
                        {field.repoTopics.length < 1 ? "No topics added": Object.keys(field.repoTopics).map((topic, index) => 
                          <span key={index}>
                            <span className="badge rounded-pill bg-secondary">
                              {field.repoTopics[topic]}
                              <FontAwesomeIcon className="cancel-icon" icon={faTimesCircle} onClick={() => repoTopicsChangeHandler(field.repoTopics[topic])}/>
                              </span>&nbsp;
                          </span>
                        )}
                      <div className="input-group mt-2">
                        <input type="text" className="form-control rounded-4" id="floatingTopics" placeholder="Add a topic" aria-label="Add a topic" aria-describedby="topic-addon" value={newTopic} onChange={addTopicChangeHandler}/>
                        <span className="input-group-text bg-primary text-white" id="topic-addon" onClick={addTopicBtnHandler}>Add</span>
                      </div>
                  </div>
                </div>
              </div>
              <div className="form-floating mb-3">
                <div className="card" id="card-id">
                  <div className="card-body">
                        {field.repoBranches.length < 1 ? "No branches added": Object.keys(field.repoBranches).map((branch, index) => 
                          <span key={index}>
                            <span className="badge rounded-pill bg-secondary">
                              {field.repoBranches[branch]}
                              <FontAwesomeIcon className="cancel-icon" icon={faTimesCircle} onClick={() => repoBranchesChangeHandler(field.repoBranches[branch])}/>
                              </span>&nbsp;
                          </span>
                        )}
                      <div className="input-group mt-2">
                        <input type="text" className="form-control rounded-4" id="floatingBranches" placeholder="Add a branch" aria-label="Add a branch" aria-describedby="branch-addon" value={newBranch} onChange={addBranchChangeHandler}/>
                        <span className="input-group-text bg-primary text-white" id="branch-addon" onClick={addBranchBtnHandler}>Add</span>
                      </div>
                  </div>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingCreateCommits" placeholder="Commits"  value={field.repoCommits} onChange={createRepoCommitsChangeHandler}/>
                <label htmlFor="floatingCreateCommits">Commits</label>
              </div>
              <div className="form-floating mb-3">
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="inlineRadioOptions" id="createInlineRadio1" checked={field.repoHasLicense === true} onChange={createRepoHasLicenseChangeHandler}/>
                  <label className="form-check-label" htmlFor="createInlineRadio1">Licensed</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="inlineRadioOptions" id="createInlineRadio2" checked={field.repoHasLicense === false} onChange={createRepoHasLicenseChangeHandler}/>
                  <label className="form-check-label" htmlFor="createInlineRadio2">Not Licensed</label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="createInlineRadio3" checked={field.repoHasReadme === true} onChange={createRepoHasReadmeChangeHandler}/>
                  <label className="form-check-label" htmlFor="createInlineRadio3">Has ReadMe</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="createInlineRadio4" checked={field.repoHasReadme === false} onChange={createRepoHasReadmeChangeHandler}/>
                  <label className="form-check-label" htmlFor="createInlineRadio4">No ReadMe</label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={createProjectBtnHandler}>Create Project</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateModalComponent;

/* 
  => This modal has 14 major JSX items which all use two way binding of the value and onChange attributes:
      * The project name input. It is set from the repoName field object value and calls the createRepoNameChangeHandler function on change.
      * The project description input. It is set from the repoDescription field object value and calls the createRepoDescriptionChangeHandler function on change.
      * The project repository link input. It is set from the repoUrl field object value and calls the createRepoUrlChangeHandler function on change.
      * The project website input. It is set from the repoWebsiteUrl field object value and calls the createRepoWebsiteUrlChangeHandler function on change.
      * The project topics badges. They are set from the repoTopics field object array values and call the repoTopicsChangeHandler function on change.
      * The project topic input. It is set from the newTopic state variable and calls the addTopicChangeHandler function on change.
      * The button for adding topics which calls the addTopicBtnHandler function on click.
      * The project branches badges. They are set from the repoBranches field object array values and call the repoBranchesChangeHandler function on change.
      * The project branch input. It is set from the newBranch state variable and calls the addBranchChangeHandler function on change.
      * The button for adding branches which calls the addBranchBtnHandler function on click.
      * The project commits input. It is set from the repoCommits field object value and calls the createRepoCommitsChangeHandler function on change.
      * The project has license radio buttons. One radio button is turned on if it's boolean condition is true using the repoHasLicense field object value. On change they call the createRepoHasLicenseChangeHandler function.
      * The project has read me radio buttons. One radio button is turned on if it's boolean condition is true using the repoHasReadme field object value. On change they call the createRepoHasReadmeChangeHandler function.
      * The Create Project button. It is used to call the createProjectBtnHandler function that makes sure the new project is created and saved.
*/

/* 
REFERENCES
==========>
* Obtained regex from: https://stackoverflow.com/a/336269/9497346
*/