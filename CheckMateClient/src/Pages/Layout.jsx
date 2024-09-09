import { useContext, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import DailyView from "./DailyView";
import AddTaskModal from "../Components/AddTaskModal";
import Footer from "../Components/Layout/Footer";
import CurrentTaskDisplayer from "../Components/CurrentTaskDisplayer";
import PropTypes from "prop-types";
import NavBar from "../Components/Layout/NavBar";


const Layout = ({ children }) => {
  const { dailyViewShow, setDailyViewShow } = useContext(TaskContext);

  const [addTaskShow, setAddTaskShow] = useState(false);


  return (
    <div className="layout-container">
      <header>
        <NavBar setAddTaskShow={setAddTaskShow}/>
      </header>

      <main>
        <CurrentTaskDisplayer />
        {children}
        <DailyView show={dailyViewShow} onHide={() => setDailyViewShow(false)} />
        <AddTaskModal show={addTaskShow} onHide={() => setAddTaskShow(false)} />
      </main>

      <Footer />
    </div >
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;