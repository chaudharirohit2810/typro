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
  MultiplayerTyping,
  AppBar,
  Register,
  Guest,
} from "./pages";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/" component={DashBoard} />
          <Route exact path="/typingtest" component={TypingTest} />
          <Route exact path="/guest" component={Guest} />
          <ProtectedRoute exact path="/stats" component={Stats} />
          <ProtectedRoute exact path="/multiplayer" component={Multiplayer} />
          <ProtectedRoute
            exact
            path="/multiplayertyping/:id/:codesnippetid"
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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
      </div>
    </Router>
  );
}

export default App;
