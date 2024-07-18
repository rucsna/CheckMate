import './App.css';
import MonthlyView from './Pages/MonthlyView';
import { ContextProvider } from './StateContext';

function App() {

  return (
    <ContextProvider>
      <div>
        <MonthlyView />
      </div>
    </ContextProvider>
  )
};

export default App;
