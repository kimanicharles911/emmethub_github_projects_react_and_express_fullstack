import axios from 'axios';
import {axiosErrorMessage, axiosResponseMessage} from '../../modules';
/* 
  * I imported the axios promise based http client. 
  * I imported custom axios modules.
*/

const DeleteModalComponent = ({modalDataProp, renderAgentProp, setRenderAgentProp}) => {

  const deleteProjectBtnHandler = () => {
    axios.delete(`/api/repository?id=${modalDataProp.repoId}`)
      .then(res => {
        axiosResponseMessage.moduleFunc(res);
      }).catch(err => {
        axiosErrorMessage.moduleFunc(err);
      })

    setTimeout(() => {
      setRenderAgentProp(!renderAgentProp);
    }, 250)
  }

  /* 
    * I created the DeleteModalComponent and destructured the modalDataProp, renderAgentProp and setRenderAgentProp passed from the MainComponent.
    * The deleteProjectBtnHandler which deletes the project the user has chosen to delete from the API.
    * The axios function has a try catch block that returns necessary responses in either case of a successful or failed project deletion in the API using the axiosResponseMessage and axiosErrorMessage modules.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the projects data in the whole application.
  */

  return (
    <div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="text-center">Are you sure you want to permanently delete {modalDataProp.repoName} ?</p>                    
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteProjectBtnHandler}>Proceed to Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteModalComponent;
/* 
  => This modal has 2 major JSX items:
    * The deleting message which shows the user the project they want to delete.
    * The proceed to delete button which when clicked calls the deleteProjectBtnHandler function that deletes the project.
*/