import './App.css';
import MonthlyView from './Pages/MonthlyView';
import { DateProvider } from './Contexts/DateContext';
import { TaskProvider } from './Contexts/TaskContext';
import { SettingsProvider } from './Contexts/SettingsContext';

function App() {

  return (
    <SettingsProvider>
      <DateProvider>
        <TaskProvider>
          <div className='bg-success bg-opacity-25'>
            <MonthlyView />
          </div>
        </TaskProvider>
      </DateProvider>
    </SettingsProvider>
  )
};

export default App;
