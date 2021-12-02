import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import './MainComponent.css';
import {useEffect, useState} from 'react';
import {ViewModalComponent, EditModalComponent} from '../components'


const MainComponent = () => {
  const [repositories, setRepositories] = useState([]);
  const [modalData, setModalData] = useState({
    repoId: '',
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
  const [renderAgent, setRenderAgent] = useState(false)

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
  }, [renderAgent]);
  
  const repoNameReceiverFunc = (param) => {
    for(const repo of repositories){
      if(repo.name === param){
        setModalData({
          repoId: repo.id,
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
  };

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
                  {/* <== Edit Button ==> */}
                  <a title="Edit" href="#edit" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => repoNameReceiverFunc(repository.name)}><FontAwesomeIcon icon={faPen} className="font-awesome-icons" id="pen-icon"/></a>
                  {/* <== View Button ==> */}
                  <a title="View" href="#view" type="button" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => repoNameReceiverFunc(repository.name)}><FontAwesomeIcon icon={faEye} className="font-awesome-icons" id="eye-icon"/></a>
                </div>
              </div>
            </div>
          </div>
        ))
        }

        <ViewModalComponent modalDataProp={modalData}/>
        <EditModalComponent modalDataProp={modalData} setModalDataProp={setModalData} repositoriesProp={repositories} setRepositoriesProp={setRepositories} renderAgentProp={renderAgent} setRenderAgentProp={setRenderAgent}/>
      </section>
    </main>
  )
};
export default MainComponent;