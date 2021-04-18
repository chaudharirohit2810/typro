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
  AppBar,
  Register,
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
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
          <ProtectedAdminRoute
            exact
            path="/admindashboard"
            component={AdminDashboard}
          />
          <ProtectedAdminRoute
            exact
            path="/addSnippet"
            component={AddSnippet}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
