import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import axios from 'axios';
import './CreateModalComponent.css';

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

  const repoTopicsChangeHandler = (param) => {
    const arr = field.repoTopics.filter(x => x !== param);
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

  const repoBranchesChangeHandler = (param) => {
    const arr = field.repoBranches.filter(x => x !== param);
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
        console.log(`Status:`, res.status);
        console.log(`Data`, res.data);
      }).catch(err => {
        console.error(`Something went wrong!`, err);
        console.error(`Error Message`, err.response);
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