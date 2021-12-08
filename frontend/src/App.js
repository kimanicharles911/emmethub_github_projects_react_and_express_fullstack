import './App.css';
import {NavbarComponent, MainComponent} from './components';
import {useState} from 'react';

const App = () => {

  const [renderAgent, setRenderAgent] = useState(false);

  return (
    <>
      <NavbarComponent renderAgentProp={renderAgent} setRenderAgentProp={setRenderAgent}/>
      <MainComponent renderAgentProp={renderAgent} setRenderAgentProp={setRenderAgent}/>
    </>
  );
}

export default App;

/* 
  * I first imported the navbar and main components from the components folder.
  * I then imported the useState hook from react.
  * I then changed the App component from using a normal function to an arrow function.
  * I then created a state variable called renderAgent and setRenderAgent and set it's default value to false. 
  * The purpose of the renderAgent state is to trigger the useEffect hook in the main component to include the changes made by a user by fetching the API afresh.
  * I then wrapped the navbar and main components in an empty fragment.
  * I then passed the renderAgent & setRenderAgent state variables to the NavbarComponent and MainComponent as props.
*/