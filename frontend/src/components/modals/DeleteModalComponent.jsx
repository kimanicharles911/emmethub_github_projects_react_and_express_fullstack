import axios from 'axios';

const DeleteModalComponent = ({modalDataProp, renderAgentProp, setRenderAgentProp}) => {

  const deleteProjectBtnHandler = () => {
    axios.delete(`/api/repository?id=${modalDataProp.repoId}`)
      .then(res => {
        console.log(`Status`, res.status);
        console.log(`Data`, res.data);
      }).catch(err => {
        console.error(`Something went wrong!`, err);
        console.error(`Error Message`, err.response);
      })

    setTimeout(() => {
      setRenderAgentProp(!renderAgentProp);
    }, 250)
  }

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