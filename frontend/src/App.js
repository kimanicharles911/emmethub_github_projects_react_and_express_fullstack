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
