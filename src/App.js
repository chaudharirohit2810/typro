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
  MultiplayerTyping,
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={DashBoard} />
          <Route exact path="/typingtest" component={TypingTest} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/stats" component={Stats} />
          <ProtectedRoute exact path="/multiplayer" component={Multiplayer} />
          <ProtectedRoute
            exact
            path="/multiplayertyping/:id"
            component={MultiplayerTyping}
          />
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
