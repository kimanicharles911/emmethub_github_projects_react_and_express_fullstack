import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import './MainComponent.css';
import {useEffect, useState} from 'react';


const MainComponent = () => {
  const [repositories, setRepositories] = useState([]);
  const [modalData, setModalData] = useState({
    repoName: '',
    repoDescription: '',
    repoUrl: '',
    repoWebsiteUrl: '',
    repoTopics: '',
    repoBranches: '',
    repoCommits: '',
    repoHasLicense: '',
    repoHasReadme: '',
  });

  useEffect(() => {
    (async () => {
      let dataArr;
      try{
        const response = await fetch('/api');
        dataArr = await response.json();
      }catch(errors){
        console.error(errors);
        dataArr = [];
      }
      setRepositories(dataArr);
    })();
  }, []);
  
  const repoNameReceiverFunc = (param) => {
    for(const repo of repositories){
      if(repo.name === param){
        setModalData({
          repoName: repo.name,
          repoDescription: repo.description,
          repoUrl: repo.url,
          repoWebsiteUrl: repo.website_url,
          repoTopics: repo.topics,
          repoBranches: repo.branches,
          repoCommits: repo.commits,
          repoHasLicense: repo.has_license,
          repoHasReadme: repo.has_readme,
        })
      }
    }
  }

  return(
    <main className="container fluid">
      <section className="row justify-content-md-start mt-3 mb-3 gy-3">
        {repositories.map((repository, index) => (
          <div className="col-sm-4" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{repository.name}</h5>
                <p className="card-text">{repository.description}</p>
                <div className="buttons d-flex flex-row-reverse">
                  {/* <== View Button ==> */}
                  <a title="View" href="#view" type="button" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => repoNameReceiverFunc(repository.name)}><FontAwesomeIcon icon={faEye} className="font-awesome-icons" id="eye-icon"/></a>
                </div>
              </div>
            </div>
          </div>
        ))
        }
        
        {/* <== View Modal ==> */}
        <div className="modal py-5" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content shadow">
                      <div className="modal-header p-5" id="view-modal-header">
                        <h4 className="fw-bold mb-0 container-fluid">{modalData.repoName}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body pt-0">
                        <h5 className="mb-0">Description</h5>
                        <p>{modalData.repoDescription}</p>
                        <h5 className="mb-0">Repository Link</h5>
                        <a href={modalData.repoUrl}><p>{modalData.repoUrl}</p></a>
                        <h5 className="mb-0">Website</h5>
                        <a href={modalData.repoWebsiteUrl === 'N/A' ? '#' : modalData.repoWebsiteUrl}><p>{modalData.repoWebsiteUrl}</p></a>
                        <div className="mb-2">
                          <h5 className="mb-0 set-inline">Topics:</h5>
                          <p className="set-inline">{modalData.repoTopics.length > 0 ? modalData.repoTopics.map((topic) => ` ${topic} `) : "No topics"}</p>
                        </div>
                        <div className="mb-2">
                          <h5 className="mb-0 set-inline">Branches:</h5>
                          <p className="set-inline mb-3">{modalData.repoBranches.length > 0 ? modalData.repoBranches.map((branch) => ` ${branch} `) : "No branches"}</p>
                        </div>
                        <div className="mb-2">
                          <h5 className="mb-0 set-inline">Commits:</h5>
                          <p className="set-inline"> {modalData.repoCommits}</p>
                        </div>
                        <div className="mb-2">
                          <h5 className="mb-0 set-inline">Licensed:</h5>
                          <p className="set-inline"> {modalData.repoHasLicense === true ? "Yes" : "No"}</p>
                        </div>
                        <div className="mb-3">
                          <h5 className="mb-0 set-inline">Has Readme:</h5>
                          <p className="set-inline"> {modalData.repoHasReadme === true ? "Yes" : "No"}</p>
                        </div>
                        <button type="button" className="btn btn-lg btn-primary w-100" data-bs-dismiss="modal">Great, thanks!</button>
                      </div>
                    </div>
                  </div>
                </div>
      </section>
    </main>
  )
};
export default MainComponent;