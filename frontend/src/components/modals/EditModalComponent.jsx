import './EditModalComponent.css';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import axios from 'axios';
import {axiosErrorMessage, axiosResponseMessage, objectCreator} from '../../modules';

/* 
  * I first imported the styling
  * I imported the faTimesCircle from the font-awesome library
  * I imported the FontAwesomeIcon library from the font-awesome library
  * I then imported the useState hook from react.
  * I imported the axios promise based http client.
  * I imported custom axios and the objectCreator modules.
*/

const EditModalComponent = ({modalDataProp, setModalDataProp, renderAgentProp, setRenderAgentProp}) => {

  const [newTopic, setNewTopic] = useState("");
  const [newBranch, setNewBranch] = useState("");

  const repoNameChangeHandler = (event) => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoName: event.target.value
      }
    })
  };

  const repoDescriptionChangeHandler = (event) => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoDescription: event.target.value
      }
    })
  };

  const repoUrlChangeHandler = (event) => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoUrl: event.target.value
      }
    })
  };

  const repoWebsiteUrlChangeHandler = (event) => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoWebsiteUrl: event.target.value
      }
    })
  };

  const repoTopicsChangeHandler = (selectedRepoTopic) => {
    const arr = modalDataProp.repoTopics.filter(repoTopic => repoTopic !== selectedRepoTopic);
    setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
        return {
          ...prevState,
          repoTopics: [...modalDataProp.repoTopics, newTopic]
        }
      })
      setNewTopic("");
    }
  };

  const repoBranchesChangeHandler = (selectedRepoBranch) => {
    const arr = modalDataProp.repoBranches.filter(repoBranch => repoBranch !== selectedRepoBranch);
    setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
        return {
          ...prevState,
          repoBranches: [...modalDataProp.repoBranches, newBranch]
        }
      })
      setNewBranch("");
    }
  };

  const repoCommitsChangeHandler = (event) => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoCommits: event.target.value
      }
    })
  };

  const repoHasLicenseChangeHandler = () => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoHasLicense: !modalDataProp.repoHasLicense
      }
    })
  };

  const repoHasReadmeChangeHandler = () => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoHasReadme: !modalDataProp.repoHasReadme
      }
    })
  };

  const saveChangesBtnHandler = async() => {
    const newObject = objectCreator.moduleFunc(modalDataProp);
    await axios.put(`/api/repository?id=${modalDataProp.repoId}`, newObject)
      .then(res => {
        axiosResponseMessage.moduleFunc(res);
      }).catch(err => {
        axiosErrorMessage.moduleFunc(err);
      })
      
    setTimeout(() => {
      setRenderAgentProp(!renderAgentProp);
    }, 250);
  }

  /* 
    * I created the EditModalComponent and destructured the modalDataProp, setModalDataProp, renderAgentProp and setRenderAgentProp passed from the MainModalComponent.
    * I then created a state variable called newTopic and setNewTopic and set it's default value to an empty string. It will be used to store the newest topic added by the user.
    * I then created a state variable called newBranch and setNewBranch and set it's default value to an empty string. It will be used to store the newest branch added by the user.
    * I created event handler functions for handling different kind of events. Most of this functions use setState callback functions to update the modalDataProp state variable. This are:
        * The repoNameChangeHandler which updates the project name in the modalDataProp variable.
        * The repoDescriptionChangeHandler which updates the project description in the modalDataProp variable.
        * The repoUrlChangeHandler which updates the project repository link in the modalDataProp variable.
        * The repoWebsiteUrlChangeHandler which updates the project website URL in the modalDataProp variable.
        * The repoTopicsChangeHandler which removes the deleted topic from the existing array of topics in the project.
        * The addTopicChangeHandler which stores a new topic the user wants to add to the project in the newTopic state variable.
        * The addTopicBtnHandler which adds the newTopic entered by the user into the existing array of topics in the project and then sets the value of the newTopic state variable to an empty string.        
        * The repoBranchesChangeHandler which removes the deleted branch from the existing array of branches in the project.
        * The addBranchChangeHandler which stores a new branch the user wants to add to the project in the newBranch state variable.
        * The addBranchBtnHandler which adds the newBranch entered by the user into the existing array of branches in the project and then sets the value of the newBranch state variable to an empty string.        
        * The repoCommitsChangeHandler which updates the project commits in the modalDataProp variable.
        * The repoHasLicenseChangeHandler which updates the project license availability in the modalDataProp variable
        * The repoHasReadmeChangeHandler which updates the project read me availability in the modalDataProp variable
        * The saveChangesBtnHandler function which has an object whose value is received from the objectCreator module.
    * The axios function has a try catch block that returns necessary responses in either case of a successful or failed update to the API using the axiosResponseMessage and axiosErrorMessage modules.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the projects data in the whole application.
  */

  return (
    <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content shadow">
            <div className="modal-header pl-5 pr-5" id="edit-modal-header">
              <p className="h4 fw-bold mb-0 container-fluid">{modalDataProp.repoName}</p>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pl-5 pr-5 pt-0">
              <form>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-4" id="floatingProjectName" placeholder="Project Name" value={modalDataProp.repoName} onChange={repoNameChangeHandler}/>
                  <label htmlFor="floatingProjectName">Project Name</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control rounded-4" id="floatingTextArea" placeholder="Description" value={modalDataProp.repoDescription} onChange={repoDescriptionChangeHandler}></textarea>
                  <label htmlFor="floatingTextArea">Description</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-4" id="floatingRepoUrl" placeholder="Repository Link" value={modalDataProp.repoUrl} onChange={repoUrlChangeHandler}/>
                  <label htmlFor="floatingRepoUrl">Repository Link</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-4" id="floatingWebsiteUrl" placeholder="Website" value={modalDataProp.repoWebsiteUrl} onChange={repoWebsiteUrlChangeHandler}/>
                  <label htmlFor="floatingWebsiteUrl">Website</label>
                </div>
                <div className="form-floating mb-3">
                  <div className="card" id="card-id">
                    <div className="card-body">
                        {modalDataProp.repoTopics.length < 1 ? "No topics found": Object.keys(modalDataProp.repoTopics).map((topic, index) => 
                          <span key={index}>
                            <span className="badge rounded-pill bg-secondary">
                              {modalDataProp.repoTopics[topic]}
                              <FontAwesomeIcon className="cancel-icon" icon={faTimesCircle} onClick={() => repoTopicsChangeHandler(modalDataProp.repoTopics[topic])}/>
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
                        {modalDataProp.repoBranches.length < 1 ? "No branches found": Object.keys(modalDataProp.repoBranches).map((branch, index) => 
                          <span key={index}>
                            <span className="badge rounded-pill bg-secondary">
                              {modalDataProp.repoBranches[branch]}
                              <FontAwesomeIcon className="cancel-icon" icon={faTimesCircle} onClick={() => repoBranchesChangeHandler(modalDataProp.repoBranches[branch])}/>
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
                  <input type="number" className="form-control rounded-4" id="floatingCommits" placeholder="Commits"  value={modalDataProp.repoCommits} onChange={repoCommitsChangeHandler}/>
                  <label htmlFor="floatingCommits">Commits</label>
                </div>
                <div className="form-floating mb-3">
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="inlineRadioOptions" id="inlineRadio1" checked={modalDataProp.repoHasLicense === true} onChange={repoHasLicenseChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Licensed</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="inlineRadioOptions" id="inlineRadio2" checked={modalDataProp.repoHasLicense === false} onChange={repoHasLicenseChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Not Licensed</label>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="inlineRadio3" checked={modalDataProp.repoHasReadme === true} onChange={repoHasReadmeChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio3">Has ReadMe</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="inlineRadio4" checked={modalDataProp.repoHasReadme === false} onChange={repoHasReadmeChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio4">No ReadMe</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveChangesBtnHandler}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
  );
};
export default EditModalComponent;

/* 
  => This modal has 14 major JSX items which all use two way binding of the value and onChange attributes:
      * The project name input. It is set from the repoName modalDataProp object value and calls the repoNameChangeHandler function on change.
      * The project description input. It is set from the repoDescription modalDataProp object value and calls the repoDescriptionChangeHandler function on change.
      * The project repository link input. It is set from the repoUrl modalDataProp object value and calls the repoUrlChangeHandler function on change.
      * The project website input. It is set from the repoWebsiteUrl modalDataProp object value and calls the repoWebsiteUrlChangeHandler function on change.
      * The project topics badges. They are set from the repoTopics modalDataProp object array values and call the repoTopicsChangeHandler function on change.
      * The project topic input. It is set from the newTopic state variable and calls the addTopicChangeHandler function on change.
      * The button for adding topics which calls the addTopicBtnHandler function on click.
      * The project branches badges. They are set from the repoBranches modalDataProp object array values and call the repoBranchesChangeHandler function on change.
      * The project branch input. It is set from the newBranch state variable and calls the addBranchChangeHandler function on change.
      * The button for adding branches which calls the addBranchBtnHandler function on click.
      * The project commits input. It is set from the repoCommits modalDataProp object value and calls the repoCommitsChangeHandler function on change.
      * The project has license radio buttons. One radio button is turned on if it's boolean condition is true using the repoHasLicense modalDataProp object value. On change they call the repoHasLicenseChangeHandler function.
      * The project has read me radio buttons. One radio button is turned on if it's boolean condition is true using the repoHasReadme modalDataProp object value. On change they call the repoHasReadmeChangeHandler function.
      * The Save Changes button. It is used to call the saveChangesBtnHandler function that makes sure the edited project changes are saved.
*/

/* 
REFERENCES
==========>
* Obtained regex from: https://stackoverflow.com/a/336269/9497346
* Learnt to make PUT requests from: https://www.cluemediator.com/put-request-using-axios-with-react-hooks
* Learnt to make PUT requests from: https://youtu.be/9KaMsGSxGno 
*/