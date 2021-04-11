import Card from "./components/Card";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { DashBoard } from "./pages";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/dashboard" component={DashBoard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
