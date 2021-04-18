import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {
  DashBoard,
  TypingTest,
  Login,
  Stats,
  Multiplayer,
  AdminLogin,
  AdminDashboard,
  AddSnippet,
  Snippets,
} from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/typingtest" component={TypingTest} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/multiplayer" component={Multiplayer} />
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/admindashboard" component={AdminDashboard} />
          <Route exact path="/addSnippet" component={AddSnippet} />
          <Route exact path="/snippets" component={Snippets} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
