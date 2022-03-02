import InputForm from './components/InputForm';
import PossibleWords from './components/PossibleWords';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Wordle Solver</h1>
      <InputForm/>
      <PossibleWords/>
    </div>
  );
}

export default App;
