import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import './MainComponent.css';
import {useEffect, useState} from 'react';
import {ViewModalComponent, EditModalComponent, DeleteModalComponent} from '../components';

/* 
  * I imported the FontAwesomeIcon component, faTrash, faPen and faEye icons which are all products of the font-awesome library.
  * I imported the css style file i.e MainComponent.css
  * I then imported the useEffect & useState hook from react.
  * I imported the ViewModalComponent, EditModalComponent and DeleteModalComponent from the components folder.
*/

const MainComponent = ({renderAgentProp, setRenderAgentProp}) => {
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
  }, [renderAgentProp]);
  
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

  /* 
    * I created the MainComponent and destructured the renderAgentProp and setRenderAgentProp.
    * I created a state variable called repositories and setRepositories and set it's default value to an empty array. It is where all repositories from the API will be stored.
    * I created a state variable called modalData and setModalData and set it's default value to an object whose keys are empty strings. It is where all the repository data of the project the user is interacting with is stored.
    * I used a useEffect hook to fetch data from the backend API when the application starts and when there is a change in the boolean value of the renderAgentProp.
    * I created the repoNameReceiverFunc function which receives the project name of the project the user is interacting with and then all of the data of that project is stored in the modalData state variable.   
  */

  return(
    <main className="container fluid">
      <section className="row justify-content-md-start mt-3 mb-3 gy-3">
        {/* Repositories array Map function */}
        {repositories.map((repository, index) => (
          <div className="col-sm-4" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{repository.name}</h5>
                <p className="card-text">{repository.description}</p>
                <div className="buttons d-flex flex-row-reverse">
                  {/* <== Delete Button ==> */}
                  <a title="Delete" href="#delete" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => repoNameReceiverFunc(repository.name)}><FontAwesomeIcon icon={faTrash} className="font-awesome-icons" id="trash-icon"/><i className="fas fa-trash-alt"></i></a>
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
        <EditModalComponent modalDataProp={modalData} setModalDataProp={setModalData} repositoriesProp={repositories} setRepositoriesProp={setRepositories} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>
        <DeleteModalComponent modalDataProp={modalData} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>
      </section>
    </main>
  )
};
export default MainComponent;
/* 
  * I wrote the JSX for the main part of the application.
  * The main function in the application is a map function that creates bootstrap cards with the name and description of each repository it loops through. 
  * The other main JSX items are the Delete, Edit and View Buttons which are used to open their respective modals. They also send the repository name to the repoNameReceiverFunc function so as to enable identification of the project the user is interacting with.
  * I then wrapped the other three main components i.e ViewModalComponent, EditModalComponent and DeleteModalComponent.
  * In each of the above components I passed the props needed for the modal to operate as expected.
*/