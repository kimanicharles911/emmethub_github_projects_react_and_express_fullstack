import {Navbar, Container, Nav, Row} from 'react-bootstrap';
import './NavbarComponent.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {CreateModalComponent} from '../components';

/* 
  * I imported the Navbar, Container, Nav, Row components from react-bootstrap.
  * I imported the css style file i.e NavbarComponent.css.
  * I imported the FontAwesomeIcon component and faPlus icon which are all products of the font-awesome library.
  * I imported the CreateModalComponent component from the components folder.
*/

const NavbarComponent = ({renderAgentProp, setRenderAgentProp}) => {

  return (
    <>
      <Navbar className="nav-class" expand="sm">
        <Container fluid>
          {/* Application Name */}
          <Navbar.Brand href="#" id="brand-id">EmmetHub Projects</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggler" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Row>
                <Nav className="me-auto">
                  <ul className="navbar-nav me-auto mb-2 mb-sm-0">           
                  </ul>
                  <ul className="d-flex navbar-nav me-2 mb-2 mb-sm-0">
                    {/* Create Project Button */}
                    <Nav.Link href="#" id="nav-link-class" data-bs-toggle="modal" data-bs-target="#createModal"><FontAwesomeIcon icon={faPlus} className="font-awesome-icons" id="plus-icon"/>&nbsp;Create Project</Nav.Link>

                    {/* Create Project Modal */}
                    <CreateModalComponent renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>
                    
                    {/* Github Repository Link Button */}
                    <Nav.Link href="https://github.com/kimanicharles911/emmethub_github_projects_react_and_express_fullstack" target="_blank" id="nav-link-class"><FontAwesomeIcon icon={faGithub} className="font-awesome-icons" id="github-icon"/>&nbsp;GitHub</Nav.Link>
                  </ul>
                </Nav>
              </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default NavbarComponent;

/* 
  * I created a Navbar component.
  * I then passed then destructured the renderAgentProp and setRenderAgentProp received from the App component.
  * I then created the navbar JSX that heavily relies on bootstrap and react-bootstrap libraries.
  * The first major JSX item is the Create Project Button that is used to open the Create Project Modal.
  * The only wrapped component is the CreateModalComponent. I pass the renderAgentProp and setRenderAgentProp to it also.
  * The second major JSX item is the Github Repository Link Button that redirects the user to this Application's source code repository.
*/