import './App.css';
import MonthlyView from './Pages/MonthlyView';
import Layout from './Pages/Layout';
import { DateProvider } from './Contexts/DateContext';
import { TaskProvider } from './Contexts/TaskContext';
import { SettingsProvider } from './Contexts/SettingsContext';

function App() {

  return (
    <SettingsProvider>
      <DateProvider>
        <TaskProvider>
          <Layout>
            <MonthlyView />
          </Layout>
        </TaskProvider>
      </DateProvider>
    </SettingsProvider>
  )
};

export default App;
