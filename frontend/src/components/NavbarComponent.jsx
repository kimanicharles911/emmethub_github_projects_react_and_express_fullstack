import {NavIcon} from '../images';
import {Navbar, Container, Nav, Row} from 'react-bootstrap';
import './NavbarComponent.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {useState} from 'react';
import {CreateModalComponent} from '../components';

const NavbarComponent = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [projectNameVal, setProjectNameVal] = useState("");

  return (
    <>
      <Navbar className="nav-class" expand="sm">
        <Container fluid>
          <Navbar.Brand href="#" id="brand-id">EmmetHub Projects</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggler" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Row>
                <Nav className="me-auto">
                  <ul className="navbar-nav me-auto mb-2 mb-sm-0">           
                  </ul>
                  <ul className="d-flex navbar-nav me-2 mb-2 mb-sm-0">
                    <Nav.Link href="#" id="nav-link-class" onClick={handleShow}><FontAwesomeIcon icon={faPlus} className="font-awesome-icons" id="plus-icon"/>&nbsp;Create Project</Nav.Link>

                    <CreateModalComponent showProp={show} setShowProp={setShow} projectNameValProp={projectNameVal} setProjectNameValProp={setProjectNameVal}/>
                    
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

export default NavbarComponent
