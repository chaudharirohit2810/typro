import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { DashBoard, TypingTest, Login, Stats } from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/typingtest" component={TypingTest} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/stats" component={Stats} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
