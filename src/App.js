import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { DashBoard, TypingTest } from "./pages";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/typingtest" component={TypingTest} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
