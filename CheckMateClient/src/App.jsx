import './App.css';
import MonthlyView from './Pages/MonthlyView';
import { ContextProvider } from './StateContext';

function App() {

  return (
    <ContextProvider>
      <div className='bg-info bg-opacity-25'>
        <MonthlyView />
      </div>
    </ContextProvider>
  )
};

export default App;
