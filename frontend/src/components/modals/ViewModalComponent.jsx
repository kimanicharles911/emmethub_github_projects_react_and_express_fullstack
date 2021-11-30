const ViewModalComponent = ({modalDataProp}) => {

  return (
    <div className="modal py-5" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content shadow">
          <div className="modal-header p-5" id="view-modal-header">
            <h4 className="fw-bold mb-0 container-fluid">{modalDataProp.repoName}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pt-0">
            <h5 className="mb-0">Description</h5>
            <p>{modalDataProp.repoDescription}</p>
            <h5 className="mb-0">Repository Link</h5>
            <a href={modalDataProp.repoUrl}><p>{modalDataProp.repoUrl}</p></a>
            <h5 className="mb-0">Website</h5>
            <a href={modalDataProp.repoWebsiteUrl === 'N/A' ? '#' : modalDataProp.repoWebsiteUrl}><p>{modalDataProp.repoWebsiteUrl}</p></a>
            <div className="mb-2">
              <h5 className="mb-0 set-inline">Topics:</h5>
              <p className="set-inline">{Object.keys(modalDataProp.repoTopics).map((topic) => ` ${modalDataProp.repoTopics[topic]} `)}</p>
            </div>
            <div className="mb-2">
              <h5 className="mb-0 set-inline">Branches:</h5>
              <p className="set-inline mb-3">{Object.keys(modalDataProp.repoBranches).map((branch) => ` ${modalDataProp.repoBranches[branch]} `)}</p>
            </div>
            <div className="mb-2">
              <h5 className="mb-0 set-inline">Commits:</h5>
              <p className="set-inline"> {modalDataProp.repoCommits}</p>
            </div>
            <div className="mb-2">
              <h5 className="mb-0 set-inline">Licensed:</h5>
              <p className="set-inline"> {modalDataProp.repoHasLicense === true ? "Yes" : "No"}</p>
            </div>
            <div className="mb-3">
              <h5 className="mb-0 set-inline">Has Readme:</h5>
              <p className="set-inline"> {modalDataProp.repoHasReadme === true ? "Yes" : "No"}</p>
            </div>
            <button type="button" className="btn btn-lg btn-primary w-100" data-bs-dismiss="modal">Great, thanks!</button>
          </div>
        </div>
      </div>
    </div>
  )
};
export default ViewModalComponent;