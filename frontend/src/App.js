import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import SingleNote from "./screens/SingleNote/SingleNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import PublicScreen from "./screens/PublicScreen/PublicScreen";
import AdminLanding from "./screens/AdminLanding/AdminLanding";
import StudentPage from "./screens/AdminLanding/StudentPage";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/mynotes"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/adm" component={AdminLanding} exact />
        <Route
          path="/adm/:sid"
          component={({ history, match }) => (
            <StudentPage search={search} history={history} match={match} />
          )}
        />
        <Route path="/pub" component={PublicScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
