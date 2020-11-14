import './App.css';
// Components
import SecuritiesList from './components/SecuritiesList'



function App() {

  return (
    <div className="App">
        <h1>Securities</h1>
          <SecuritiesList />
        <button onClick={() => console.log("add security button")}>Add</button>
    </div>
  );
}

export default App;
