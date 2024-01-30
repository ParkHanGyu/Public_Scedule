import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AUTH_PATH } from "./constant";
import Container from "./layouts/Container";
import Authentication from "./views/Authentication";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Container />}>
          <Route path={AUTH_PATH()} element={<Authentication />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
