import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello Team!
        </p>
        <a
          className="App-link"
          href="https://team4-fall22.atlassian.net/jira/software/projects/T4F2/boards/1/backlog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Group 4
        </a>
      </header>
    </div>
  );
}

export default App;
