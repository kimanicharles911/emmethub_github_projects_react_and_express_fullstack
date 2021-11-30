import {Modal, Button} from 'react-bootstrap';

const CreateModalComponent = ({showProp, setShowProp, projectNameValProp, setProjectNameValProp}) => {
  const handleClose = () => setShowProp(false);

  return (
    <Modal className="modal-class" show={showProp} onHide={handleClose} scrollable={true}>
      <Modal.Header className="pl-5 pr-5" closeButton>
        <Modal.Title className="h4 fw-bold mb-0">New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pl-5 pr-5 pt-0">
        <form>
          <div className="form-floating mb-3 mt-3">
            <input type="text" className="form-control rounded-4" id="floatingCreateProjectName" value={projectNameValProp} onChange={ (event) => setProjectNameValProp(event.target.value) } placeholder="Project Name" />
            <label htmlFor="floatingCreateProjectName">Project Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea className="form-control rounded-4" id="floatingCreateTextArea" placeholder="Description"></textarea>
            <label htmlFor="floatingCreateTextArea">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control rounded-4" id="floatingCreateRepoUrl" placeholder="Repository Link" />
            <label htmlFor="floatingCreateRepoUrl">Repository Link</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control rounded-4" id="floatingCreateWebsiteUrl" placeholder="Website" />
            <label htmlFor="floatingCreateWebsiteUrl">Website</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control rounded-4" id="floatingCreateTopics" placeholder="Topics" />
            <label htmlFor="floatingCreateTopics">Topics</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control rounded-4" id="floatingCreateBranches" placeholder="Branches" />
            <label htmlFor="floatingCreateBranches">Branches</label>
          </div>
          <div className="form-floating mb-3">
            <input type="number" className="form-control rounded-4" id="floatingCreateCommits" placeholder="Commits" />
            <label htmlFor="floatingCreateCommits">Commits</label>
          </div>
          <div className="form-floating mb-3">
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" name="inlineRadioOptions" id="createInlineRadio1" />
              <label className="form-check-label" htmlFor="createInlineRadio1">Licensed</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" name="inlineRadioOptions" id="createInlineRadio2" />
              <label className="form-check-label" htmlFor="createInlineRadio2">Not Licensed</label>
            </div>
          </div>
          <div className="form-floating mb-3">
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="createInlineRadio3" />
              <label className="form-check-label" htmlFor="createInlineRadio3">Has ReadMe</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" name="inlineRadioOptions2" id="createInlineRadio4" />
              <label className="form-check-label" htmlFor="createInlineRadio4">No ReadMe</label>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleClose}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateModalComponent;