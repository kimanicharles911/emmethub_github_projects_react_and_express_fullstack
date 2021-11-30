import './EditModalComponent.css';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const EditModalComponent = ({modalDataProp, setModalDataProp}) => {

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
    console.log(`😜`, event.target.value);
  };

  const repoTopicsChangeHandler = (event) => {
    const eventArr = event.target.value.split(' ').filter(x => x !== ',').filter(x => x !== '');
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoTopics: eventArr
      }
    })
  };

  const repoBranchesChangeHandler = (event) => {
    const eventArr = event.target.value.split(' ').filter(x => x !== ',').filter(x => x !== '');
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoBranches: eventArr
      }
    })
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

  const repoHasReadmeChangeHandler = (event) => {
    setModalDataProp((prevState) => {
      return {
        ...prevState,
        repoHasReadme: !modalDataProp.repoHasReadme
      }
    })
  };

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
                  <input type="text" className="form-control rounded-4" id="floatingTopics" placeholder="Topics"  value={Object.keys(modalDataProp.repoTopics).map((topic) => ` ${modalDataProp.repoTopics[topic]} `)} onChange={repoTopicsChangeHandler}/>
                  <label htmlFor="floatingTopics">Topics <span className="text-success"> separate topics with comma</span></label>
                </div>
                <div className="form-floating mb-3">
                  <div className="card" id="card-id">
                    <div className="card-body">
                        {Object.keys(modalDataProp.repoTopics).map((topic) => 
                          <span>
                            <span className="badge rounded-pill bg-secondary">
                              {modalDataProp.repoTopics[topic]}
                              <FontAwesomeIcon icon={faTimesCircle}/>
                              </span>&nbsp;
                          </span>
                        )}
                        <input type="text" className="form-control rounded-4 mt-1" id="floatingTopics" placeholder="Add a topic"/>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-4" id="floatingBranches" placeholder="Branches"  value={Object.keys(modalDataProp.repoBranches).map((branch) => ` ${modalDataProp.repoBranches[branch]} `)} onChange={repoBranchesChangeHandler}/>
                  <label htmlFor="floatingBranches">Branches <span className="text-success"> separate branch names with comma</span></label>
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
                    <input type="radio" className="form-check-input" name="inlineRadioOptions" id="inlineRadio2" value="False" checked={modalDataProp.repoHasLicense === false} onChange={repoHasLicenseChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Not Licensed</label>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="inlineRadio3" value="True" checked={modalDataProp.repoHasReadme === true} onChange={repoHasReadmeChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio3">Has ReadMe</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="inlineRadio4" value="False" checked={modalDataProp.repoHasReadme === false} onChange={repoHasReadmeChangeHandler}/>
                    <label className="form-check-label" htmlFor="inlineRadio4">No ReadMe</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  );
};
export default EditModalComponent;